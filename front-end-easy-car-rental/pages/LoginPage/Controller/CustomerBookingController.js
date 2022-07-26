function forBookingManage() {
    document.getElementsByClassName("CustomerHomePage")[0].style.display = "none"
    document.getElementsByClassName(" customer-Manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-manage-content")[0].style.display = "none"
    document.getElementsByClassName(" Manage-Booking-content")[0].style.display = "block"

    document.getElementsByClassName(" userProfile-manage-content ")[0].style.display = "none"

    loadAllCustomerBooking();
}

var bIds=new Array();

var bookigDetailsID;
var bookingid;
var loseDamegeImg;
var vehicleScheduleID;
var driverscheduleID;
var driverID;/**/
var custId;

function loadAllCustomerBooking(){
    $("#tblCustomerBooking").empty();




            $.ajax({
                url:"http://localhost:8080/Back_end_war_exploded/api/v1/bookingDetails",
                method:"get",
                success(detailsResp) {
                    for(var j of detailsResp.data){
                        if ($("#txtCustNICNumber1").val() == j.custNIC) {
                            var row = `<tr><td>${j.bookingDetailsId}</td><td>${j.bookingId}</td><td>${j.pickUpDate}</td><td>${j.returnDate}</td><td>${j.detailsStatus}</td></tr>`
                            $("#tblCustomerBooking").append(row);
                        }
                    }


                }


            });


}


$("#btn-approve-booking").click(function (){
    details={
        "bookingDetailsId":bookigDetailsID,
        "pickUpDate":$("#txtBManagePickDate").val(),
        "returnDate":$("#txtBManageReturnDate").val(),
        "loseDamageStatus":$("#txtBManageLoseDamage").val(),
        "loseDamageImg":loseDamegeImg,
        "detailsStatus":"Approved",
        "bookingId":bookingid,
        "vehicleNumber":$("#txtBManageVNumber").val(),
        "driverNICNumber":$("#txtBManageDriverNIC").val()
    }



    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/bookingDetails",
        method:"put",
        contentType:"Application/json",
        data:JSON.stringify(details),
        success(resp){
            alert(resp.message);
            pendingBookings();
        }
    });
});


$("#btn-Reject-booking").click(function (){
    details={
        "bookingDetailsId":bookigDetailsID,
        "pickUpDate":$("#txtBManagePickDate").val(),
        "returnDate":$("#txtBManageReturnDate").val(),
        "loseDamageStatus":$("#txtBManageLoseDamage").val(),
        "loseDamageImg":loseDamegeImg,
        "detailsStatus":"Rejected",
        "bookingId":bookingid,
        "vehicleNumber":$("#txtBManageVNumber").val(),
        "driverNICNumber":$("#txtBManageDriverNIC").val()
    }
    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/bookingDetails/Reject",
        method:"put",
        contentType: "application/json",
        data: JSON.stringify(details),
        success(resp){
            if($("#txtBManageDriverNIC").val()!="Not Assign"){
                freeDriverSchedule();
            }
            freeVehuicleSchedule();
            alert(resp.message)
            pendingBookings();
        }
    });
});

function freeDriverSchedule(){
    driverSchedule={
        "diverscheduleId":driverscheduleID,
        "driverStartDate":$("#txtBManageReturnDate").val(),
        "driverEndDate":$("#txtBManageReturnDate").val(),
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

function freeVehuicleSchedule(){
    vehicleSchedule={
        "vehicleScheduleId":vehicleScheduleID,
        "vehicleStartDate":$("#txtBManageReturnDate").val(),
        "vehicleEndDate":$("#txtBManageReturnDate").val(),
        "vehicleScheduleStatus":"Cancel",
        "bookingDetailsId":{
            "bookingDetailsId":bookigDetailsID,
        },
        "vehicleNumber":{
            "vehicleNumber":$("#txtBManageVNumber").val(),
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


