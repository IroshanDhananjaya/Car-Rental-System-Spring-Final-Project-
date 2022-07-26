/*    function customerRegistration(){
        var data=new FormData();

        let custLicenseImg=$("#txtCustLicenseImg")[0].files[0];
        let cusNICImg=$("#txtCustNICImage")[0].files[0];
        let licenseImgName=$("#txtCustLicenseImg")[0].files[0].name;
        let nicImgName=$("#txtCustNICImage")[0].files[0].name

        var customer={
            "custNICNumber":$("#txtCustNICNumber").val(),
            "custName":$("#txtCustName").val(),
            "custAddress":$("#txtCustAddress").val(),
            "custNICImg":nicImgName,
            "custdrivingImg":licenseImgName,
            "custContact":$("#txtContactNumber").val(),
            "custEmail":$("#txtCustEmail").val(),
            "custPassword":$("#txtCustPassword").val(),
            "custStatus":"Not Approved",
            "type":"Customer",
        }

        data.append("files",custLicenseImg);
        data.append("files",cusNICImg);
        data.append("customer",new Blob([JSON.stringify(customer)],{type:"application/json"}))

        $.ajax({
            url:"http://localhost:8080/Back_end_war_exploded/api/v1/customer/register",
            method:"post",
            async:true,
            contentType:false,
            processData:false,
            data:data,
            success(resp){
                alert(resp.message);
            }
        });

    }*/

$("#btn-register").click(function (){
    var data=new FormData();

    let custLicenseImg=$("#txtCustLicenseImg")[0].files[0];
    let cusNICImg=$("#txtCustNICImage")[0].files[0];
    let licenseImgName=$("#txtCustLicenseImg")[0].files[0].name;
    let nicImgName=$("#txtCustNICImage")[0].files[0].name

    var customer={
        "custNICNumber":$("#txtCustNICNumber").val(),
        "custName":$("#txtCustName").val(),
        "custAddress":$("#txtCustAddress").val(),
        "custNICImg":nicImgName,
        "custdrivingImg":licenseImgName,
        "custContact":$("#txtContactNumber").val(),
        "custEmail":$("#txtCustEmail").val(),
        "custPassword":$("#txtCustPassword").val(),
        "custStatus":"Not Approved",
        "type":"Customer",
    }

    data.append("files",custLicenseImg);
    data.append("files",cusNICImg);
    data.append("customer",new Blob([JSON.stringify(customer)],{type:"application/json"}))

    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/customer/register",
        method:"post",
        async:true,
        contentType:false,
        processData:false,
        data:data,
        success(resp){

            window.location="LoginPage.html"

        }
    });

});

/*  $("#btn-register").click(function (){
      console.log("click Una ")
      window.location="LoginPage.html"
  });*/



const cusNICRegEx = /^[0-9/A-z]{10,15}$/;
const cusNameRegEx = /^[A-z ]{2,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const cusContactRegEx = /^[0-9]{3}[-]?[0-9]{7}$/;
const custEmailRegEx=/^[a-z0-9]{3,}[@]?[a-z]{1,}[.]?[a-z]{2,}$/;
const custPasswordRegEx=/^[A-z0-9]{6,}$/;


$('#txtCustNICNumber,#txtCustName,#txtCustAddress,#txtContactNumber,#txtCustNICImage,#txtCustLicenseImg,#txtCustEmail,#txtCustPassword').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtCustNICNumber,#txtCustName,#txtCustAddress,#txtContactNumber,#txtCustNICImage,#txtCustLicenseImg,#txtCustEmail,#txtCustPassword').on('blur', function () {
    formValid();
});


$("#txtCustNICNumber").on('keyup', function (eventOb) {
    setButton();




});
$("#txtCustNICNumber").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtCustName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtCustAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtContactNumber").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#txtCustNICImage").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});
$("#txtCustLicenseImg").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});
$("#txtCustEmail").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});
$("#txtCustPassword").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});
// focusing events end
$("#btn-register").attr('disabled', true);

function clearAll() {
    $('#txtCustNICNumber,#txtCustName,#txtCustAddress,#txtContactNumber,#txtCustNICImage,#txtCustLicenseImg,#txtCustEmail,#txtCustPassword').val("");
    $('#txtCustNICNumber,#txtCustName,#txtCustAddress,#txtContactNumber,#txtCustNICImage,#txtCustLicenseImg,#txtCustEmail,#txtCustPassword').css('border', '2px solid #ced4da');
    $('#txtCustNICNumber').focus();
    $("#btn-register").attr('disabled', true);

    $("#lblcusNIC,#lblcusName,#lblcusAddress,#lblcusContact,#lblcusEmail,#lblcusPassword").text("");

}

function formValid() {
    var custNIC=$("#txtCustNICNumber").val();
    $("#txtCustNICNumber").css('border', '2px solid green');
    $("#lblcusNIC").text("")
    if(cusNICRegEx.test(custNIC)){
        var custName=$("#txtCustName").val();
        if(cusNameRegEx.test(custName)){
            $("#txtCustName").css('border', '2px solid green');
            $("#lblcusName").text("");
            var custAddress=$("#txtCustAddress").val();
            if(cusAddressRegEx.test(custAddress)){
                $("#txtCustAddress").css('border', '2px solid green');
                $("#lblcusAddress").text("");
                var custContact=$("#txtContactNumber").val();
                if(cusContactRegEx.test(custContact)){
                    $("#txtContactNumber").css('border', '2px solid green');
                    $("#lblcusContact").text("");
                    var custEmail=$("#txtCustEmail").val();
                    if(custEmailRegEx.test(custEmail)){
                        $("#txtCustEmail").css('border', '2px solid green');
                        $("#lblcusEmail").text("");
                        var custPassword=$("#txtCustPassword").val();
                        if(custPasswordRegEx.test(custPassword)){
                            $("#txtCustPassword").css('border', '2px solid green');
                            $("#lblcusPassword").text("");
                            return true;
                        }else {
                            $("#txtCustPassword").css('border', '2px solid red');
                            $("#lblcusPassword").text("Minimum should be more than 6 characters(Ex :abc1234");
                            return false;
                        }
                    }else {
                        $("#txtCustEmail").css('border', '2px solid red');
                        $("#lblcusEmail").text("Invalid Please Enter Again(Ex :iroshandhananjay@gmail.com");
                        return false;
                    }
                }else {
                    $("#txtContactNumber").css('border', '2px solid red');
                    $("#lblcusContact").text("Invalid Please Enter Again(Ex :0771234567 / 077-1234567)");
                    return false;
                }
            }else {
                $("#txtCustAddress").css('border', '2px solid red');
                $("#lblcusAddress").text("Invalid Please Enter Again(Ex :13/A Dandeniya,Opanayaka");
                return false;
            }
        }else{
            $("#txtCustName").css('border', '2px solid red');
            $("#lblcusName").text("Invalid Please Enter Again(Ex :Iroshan Dhananjaya)");
            return false;
        }
    }else {
        $("#txtCustNICNumber").css('border', '2px solid red');
        $("#lblcusNIC").text("Invalid Please Enter Again(Ex : 200108202209 / 20010820220V)");
        return false;
    }
}

function checkIfCustValid() {
    var CusId=$("#txtCustNICNumber").val();
    if(cusNICRegEx.test(CusId)){
        $("#txtCustName").focus()
        var cusName=$("#txtCustName").val();
        if(cusNameRegEx.test(cusName)){
            $("#txtCustAddress").focus();
            var cusAddress= $("#txtCustAddress").val();
            if(cusAddressRegEx.test(cusAddress)){
                $("#txtContactNumber").focus();
                var custContact=$("#txtContactNumber").val();
                if(cusContactRegEx.test(custContact)){
                    $("#txtCustEmail").focus();
                    var cusEmail=$("#txtCustEmail").val();
                    if(custEmailRegEx.test(cusEmail)){
                        $("#txtCustPassword").focus();
                        var cusPW=$("#txtCustPassword").val();
                        var resp=custPasswordRegEx.test(cusPW)
                        if(resp){
                            var identityImg=$("#txtCustNICImage").val()
                            var licenseImg=$("#txtCustLicenseImg").val()

                            if(identityImg==""|licenseImg==""){
                                alert("Something Wrong Please Select Images")
                            }else {

                                clearAll();
                            }

                        }else {
                            $("#txtCustPassword").focus();
                        }
                    }else {
                        $("#txtCustEmail").focus();
                    }
                }else {
                    $("#txtContactNumber").focus();
                }
            }else {
                $("#txtCustAddress").focus();
            }

        }else {
            $("#txtCustName").focus()
        }
    }else {
        $("#txtCustNICNumber").focus();
    }

}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btn-register").attr('disabled', false);
    } else {
        $("#btn-register").attr('disabled', true);
    }
}

$('#btn-register').click(function () {
    checkIfCustValid();
});