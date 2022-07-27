
function forManageDriver() {
    document.getElementsByClassName("AdminHomePage")[0].style.display = "none"
    document.getElementsByClassName("driver-manage-content")[0].style.display = "block"
    document.getElementsByClassName("driver-schedule-content")[0].style.display = "none"
    document.getElementsByClassName("admin-customer-Manage-content")[0].style.display = "none"
    document.getElementsByClassName("Admin-vehicle-manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-schedule-content")[0].style.display = "none"
    document.getElementsByClassName("Admin-Manage-Booking-content")[0].style.display = "none"

    loadAllDriver()
}



function loadAllDriver() {
    $("#driverTable").empty();
    $.ajax({
        url: "http://localhost:8080/Back_end_war_exploded/api/v1/driver",
        method: "GET",
        success(resp) {
            for (var i of resp.data) {
                var row = `<tr><td>${i.driverNICNumber}</td><td>${i.driverName}</td><td>${i.driverAddress}</td><td>${i.driverContact}</td><td>${i.driverEmail}</td><td>${i.driverLicenseImg}</td><td>${i.diverStatus}</td></tr>`;
                $("#driverTable").append(row);

                $("#driverTable>tr").click(function () {

                    $("#txtDriverNICNumber").val($(this).children(":eq(0)").text());
                    $("#txtDriverName").val($(this).children(":eq(1)").text());
                    $("#txtDriverAddress").val($(this).children(":eq(2)").text());
                    $("#txtDriverContact").val($(this).children(":eq(3)").text());
                    $("#txtDriverEmail").val($(this).children(":eq(4)").text());


                    $.ajax({
                        url:"http://localhost:8080/Back_end_war_exploded/api/v1/driver?id="+$("#txtDriverNICNumber").val(),
                        method:"get",
                        success(resp){

                            $("#driverImg").css({
                                "background": `url(${"http://localhost:8080/Back_end_war_exploded/"+resp.data.driverLicenseImg})`,
                                "background-size": "cover",
                                "background-position":"center",
                                "height": "300px"
                            });

                        }
                    });

                });

            }
        }
    });
}


function saveDriver(){
    var data=new FormData;
    let driverLicenseImg=$("#txtDriverlicenseImg")[0].files[0];
    let licenseImgName=$("#txtDriverlicenseImg")[0].files[0].name;

    var driver={
        "driverNICNumber":$("#txtDriverNICNumber").val(),
        "driverName":$("#txtDriverName").val(),
        "driverAddress":$("#txtDriverAddress").val(),
        "driverContact":$("#txtDriverContact").val(),
        "driverEmail":$("#txtDriverEmail").val(),
        "driverPassword":$("#txtDriverNICNumber").val(),
        "driverLicenseImg":licenseImgName,
        "diverStatus":"Free",
        "type":"Driver",
    }

    data.append("Driverfiles",driverLicenseImg);
    data.append("driver",new Blob([JSON.stringify(driver)],{type:"application/json"}))


    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/driver",
        method:"post",
        async:true,
        contentType:false,
        processData:false,
        data:data,
        success(resp){
            alert(resp.message);
            loadAllDriver();
            clearAll();
        },error (ob, textStatus, error) {
            alert(ob.responseJSON.message);
        }
    });

}

$("#btn-save-Driver").click(function (){
    saveDriver();
});



$("#btn-delete-Driver").click(function (){
    $.ajax({
        url:"http://localhost:8080/Back_end_war/api/v1/driver?id="+$("#txtDriverNICNumber").val(),
        method:"delete",
        success(resp){
            alert(resp.message);
            loadAllDriver();
            clearAll();
        }
    });
});

//validation start

const driNICRegEx = /^[0-9/A-z]{10,15}$/;
const driNameRegEx = /^[A-z ]{2,20}$/;
const driAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const driSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const driContactRegEx = /^[0-9]{3}[-]?[0-9]{7}$/;
const driEmailRegEx = /^[a-z0-9]{3,}[@]?[a-z]{1,}[.]?[a-z]{2,}$/;
const driPasswordRegEx = /^[A-z0-9]{6,}$/;


$('#txtDriverNICNumber,#txtDriverName,#txtDriverAddress,#txtDriverContact,#txtDriverlicenseImg,#txtDriverEmail').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtDriverNICNumber,#txtDriverName,#txtDriverAddress,#txtDriverContact,#txtDriverlicenseImg,#txtDriverEmail').on('blur', function () {
    formValid();
});


$("#txtDriverNICNumber").on('keyup', function (eventOb) {
    setButton();


});
$("#txtDriverNICNumber").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtDriverName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtDriverAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtDriverContact").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtDriverlicenseImg").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});
$("#txtDriverEmail").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

// focusing events end
$("#btn-save-Driver").attr('disabled', true);

function clearAll() {
    $('#txtDriverNICNumber,#txtDriverName,#txtDriverAddress,#txtDriverContact,#txtDriverlicenseImg,#txtDriverEmail').val("");
    $('#txtDriverNICNumber,#txtDriverName,#txtDriverAddress,#txtDriverContact,#txtDriverlicenseImg,#txtDriverEmail').css('border', '2px solid #ced4da');
    $('#txtDriverNICNumber').focus();
    $("#btn-save-Driver").attr('disabled', true);

    $("#lblDriverNIC,#lblDriverName,#lblDriverAdress,#lblDriverContact,#lblDriverEmail").text("");

}

function formValid() {
    var driverNIC = $("#txtDriverNICNumber").val();
    $("#txtDriverNICNumber").css('border', '2px solid green');
    $("#lblDriverNIC").text("")
    if (driNICRegEx.test(driverNIC)) {
        var driverName = $("#txtDriverName").val();
        if (driNameRegEx.test(driverName)) {
            $("#txtDriverName").css('border', '2px solid green');
            $("#lblDriverName").text("");
            var driverAddress = $("#txtDriverAddress").val();
            if (driAddressRegEx.test(driverAddress)) {
                $("#txtDriverAddress").css('border', '2px solid green');
                $("#lblDriverAdress").text("");
                var driverContact = $("#txtDriverContact").val();
                if (driContactRegEx.test(driverContact)) {
                    $("#txtDriverContact").css('border', '2px solid green');
                    $("#lblDriverContact").text("");
                    var driverEmail = $("#txtDriverEmail").val();
                    if (driEmailRegEx.test(driverEmail)) {
                        $("#txtDriverEmail").css('border', '2px solid green');
                        $("#lblDriverEmail").text("");
                        return true;
                    } else {
                        $("#txtDriverEmail").css('border', '2px solid red');
                        $("#lblDriverEmail").text("Invalid Please Enter Again(Ex :iroshandhananjay@gmail.com");
                        return false;
                    }
                } else {
                    $("#txtDriverContact").css('border', '2px solid red');
                    $("#lblDriverContact").text("Invalid Please Enter Again(Ex :0771234567 / 077-1234567)");
                    return false;
                }
            } else {
                $("#txtDriverAddress").css('border', '2px solid red');
                $("#lblDriverAdress").text("Invalid Please Enter Again(Ex :13/A Dandeniya,Opanayaka");
                return false;
            }
        } else {
            $("#txtDriverName").css('border', '2px solid red');
            $("#lblDriverName").text("Invalid Please Enter Again(Ex :Iroshan Dhananjaya)");
            return false;
        }
    } else {
        $("#txtDriverNICNumber").css('border', '2px solid red');
        $("#lblDriverNIC").text("Invalid Please Enter Again(Ex : 200108202209 / 20010820220V)");
        return false;
    }
}

function checkIfCustValid() {
    var driverNIC = $("#txtDriverNICNumber").val();
    if (driNICRegEx.test(driverNIC)) {
        $("#txtDriverName").focus()
        var driverName = $("#txtDriverName").val();
        if (driNameRegEx.test(driverName)) {
            $("#txtDriverAddress").focus();
            var driverAddress = $("#txtDriverAddress").val();
            if (driAddressRegEx.test(driverAddress)) {
                $("#txtDriverContact").focus();
                var driverContact = $("#txtDriverContact").val();
                if (driContactRegEx.test(driverContact)) {
                    $("#txtDriverEmail").focus();
                    var driverEmail = $("#txtDriverEmail").val();
                    var resp = driEmailRegEx.test(driverEmail);
                    if (resp) {

                        if ($("#txtDriverlicenseImg").val() == "") {
                            alert("Please Upload Driver License Image.....")
                        } else {
                           saveDriver();
                           clearAll();
                        }
                    } else {
                        $("#txtDriverEmail").focus();
                    }
                } else {
                    $("#txtDriverContact").focus();
                }
            } else {
                $("#txtDriverAddress").focus();
            }

        } else {
            $("#txtDriverName").focus()
        }
    } else {
        $("#txtDriverNICNumber").focus();
    }

}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btn-save-Driver").attr('disabled', false);
    } else {
        $("#btn-save-Driver").attr('disabled', true);
    }
}

$('#btn-save-Driver').click(function () {
    checkIfCustValid();
});