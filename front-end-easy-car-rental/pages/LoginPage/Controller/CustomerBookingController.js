function forCustBookingManage() {

    document.getElementsByClassName("Customer-Manage-Booking-content")[0].style.display = "block"
    document.getElementsByClassName("CustomerHomePage")[0].style.display = "none"
    document.getElementsByClassName(" customer-Manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-manage-content")[0].style.display = "none"
    document.getElementsByClassName(" userProfile-manage-content ")[0].style.display = "none"


    loadAllCustomerBooking();
}

var bIds=new Array();

var bookigDetailsID;
var bookingid;
var loseDamegeImg;
var vehicleScheduleID;
var driverscheduleID;
var driverID;


function loadAllCustomerBooking(){
    $("#tblCustomerBooking").empty();

    $.ajax({
                url:"http://localhost:8080/Back_end_war_exploded/api/v1/bookingDetails",
                method:"get",
                success(detailsResp) {
                    for(var j of detailsResp.data){

                        if ($("#txtCustNICNumber1").val() == j.custNIC) {
                            console.log(j.custNIC)
                            var row = `<tr><td>${j.bookingDetailsId}</td><td>${j.bookingId}</td><td>${j.pickUpDate}</td><td>${j.returnDate}</td><td>${j.detailsStatus}</td></tr>`
                            $("#tblCustomerBooking").append(row);


                            $("#tblCustomerBooking>tr").click(function () {
                                $("#txtBManageBookingID1").val($(this).children(":eq(1)").text());
                                $("#txtBManagePickDate1").val($(this).children(":eq(2)").text());
                                $("#txtBManageReturnDate1").val($(this).children(":eq(3)").text());


                                bookigDetailsID = $(this).children(":eq(0)").text();
                                bookingid = $(this).children(":eq(1)").text()
                                loseDamegeImg =j.loseDamageImg
                                $("#lblBookingStatus").text($(this).children(":eq(4)").text())

                                if ($(this).children(":eq(4)").text() == "Not Approved") {
                                    $("#lblBookingStatus").css({"color": "Orange"})
                                    $("#btn-Cancel-booking").attr('disabled', false);
                                } else if ($(this).children(":eq(4)").text() == "Approved") {
                                    $("#lblBookingStatus").css({"color": "Blue"})
                                    $("#btn-Cancel-booking").attr('disabled', false);
                                } else if ($(this).children(":eq(4)").text() == "Completed") {
                                    $("#lblBookingStatus").css({"color": "Green"})
                                    $("#btn-Cancel-booking").attr('disabled', true);
                                } else if ($(this).children(":eq(4)").text() == "Cancel") {
                                    $("#lblBookingStatus").css({"color": "Red"})
                                    $("#btn-Cancel-booking").attr('disabled', true);
                                }

                                $.ajax({
                                    url: "http://localhost:8080/Back_end_war_exploded/api/v1/driverSchedule",
                                    method: "get",
                                    success(resp) {
                                        for (var i of resp.data) {
                                            if (i.bookingDetails.bookingDetailsId == bookigDetailsID) {

                                                $("#txtBManageDriverNIC1").val(i.driverId.driverNICNumber);
                                                $("#lblDriverDetailsName").text(i.driverId.driverName);
                                                $("#lblDriverDetailsAddress").text(i.driverId.driverAddress);
                                                $("#lblDriverDetailsContact").text(i.driverId.driverContact);

                                                driverID = i.driverId.driverNICNumber;
                                                driverscheduleID = i.diverscheduleId;
                                                return
                                            }
                                            $("#txtBManageDriverNIC1").val("Not Assign");
                                            $("#lblDriverDetailsName").text("Driver Name");
                                            $("#lblDriverDetailsAddress").text("Driver Address");
                                            $("#lblDriverDetailsContact").text("Driver Contact");

                                        }

                                    }
                                });


                                $.ajax({
                                    url: "http://localhost:8080/Back_end_war_exploded/api/v1/vehicleSchedule",
                                    method: "get",
                                    success(resp) {
                                        for (var i of resp.data) {
                                            if (i.bookingDetailsId.bookingDetailsId == bookigDetailsID) {

                                                $("#txtBManageVNumber1").val(i.vehicleNumber.vehicleNumber)

                                                vehicleScheduleID = i.vehicleScheduleId;

                                                var type = i.vehicleNumber.vehicleType;

                                                if (type == "General") {
                                                    $("#txtBManageLoseDamage1").val("10000")
                                                } else if (type == "Premium") {
                                                    $("#txtBManageLoseDamage1").val("15000")
                                                } else {
                                                    $("#txtBManageLoseDamage1").val("20000")
                                                }
                                            }
                                        }

                                    }
                                });

                            });

                        }
                    }


                }


            });


}



$("#btn-Cancel-booking").click(function (){
    details={
        "bookingDetailsId":bookigDetailsID,
        "pickUpDate":$("#txtBManagePickDate1").val(),
        "returnDate":$("#txtBManageReturnDate1").val(),
        "loseDamageStatus":$("#txtBManageLoseDamage1").val(),
        "loseDamageImg":loseDamegeImg,
        "detailsStatus":"Cancel",
        "custNIC":$("#txtCustNICNumber1").val(),
        "bookingId":bookingid,
        "vehicleNumber":$("#txtBManageVNumber1").val(),
        "driverNICNumber":$("#txtBManageDriverNIC1").val()
    }

    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/bookingDetails/Reject",
        method:"put",
        contentType: "application/json",
        data: JSON.stringify(details),
        success(resp){
            if($("#txtBManageDriverNIC1").val()!="Not Assign"){
                freeDriverSchedule1();
            }
            freeVehuicleSchedule1();
            swal("Booking Canceled", "Done", "success");
           loadAllCustomerBooking();
        }
    });
})


function freeDriverSchedule1(){
    driverSchedule={
        "diverscheduleId":driverscheduleID,
        "driverStartDate":$("#txtBManageReturnDate1").val(),
        "driverEndDate":$("#txtBManageReturnDate1").val(),
        "driverScheduleStatus":"Cancel",
        "bookingDetails":{
            "bookingDetailsId":bookigDetailsID,
        },
        "driverId":{
            "driverNICNumber":driverID,
        }
    }

    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/driverSchedule/freeDriverSchedule",
        method:"put",
        contentType: "application/json",
        data: JSON.stringify(driverSchedule),
        success(resp){

        }
    });
}

function freeVehuicleSchedule1(){
    vehicleSchedule={
        "vehicleScheduleId":vehicleScheduleID,
        "vehicleStartDate":$("#txtBManageReturnDate1").val(),
        "vehicleEndDate":$("#txtBManageReturnDate1").val(),
        "vehicleScheduleStatus":"Cancel",
        "bookingDetailsId":{
            "bookingDetailsId":bookigDetailsID,
        },
        "vehicleNumber":{
            "vehicleNumber":$("#txtBManageVNumber1").val(),
        }
    }

    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/vehicleSchedule/freeVehicleSchedule",
        method:"put",
        contentType: "application/json",
        data: JSON.stringify(vehicleSchedule),
        success(resp){

        }
    });
}


$("#btn-viewDetailsDriver").click(function (){
    $("#driverDetails-container").css({
        "right": "45px",
        "z-index": "4"
    });
});

$("#btn-Cancel-driverDetails").click(function (){
    $("#driverDetails-container").css({
        "right": "-405px",
    });


});

