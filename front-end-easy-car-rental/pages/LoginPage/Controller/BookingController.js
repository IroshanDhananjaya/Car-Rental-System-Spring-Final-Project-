function forBookingManage() {
    document.getElementsByClassName("AdminHomePage")[0].style.display = "none"
    document.getElementsByClassName("driver-manage-content")[0].style.display = "none"
    document.getElementsByClassName("driver-schedule-content")[0].style.display = "none"
    document.getElementsByClassName("admin-customer-Manage-content")[0].style.display = "none"
    document.getElementsByClassName("Admin-vehicle-manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-schedule-content")[0].style.display = "none"
    document.getElementsByClassName("Admin-Manage-Booking-content")[0].style.display = "block"

    pendingBookings();
    loadAllChangeDrivers();
}



var bookigDetailsID;
var bookingid;
var loseDamegeImg;
var vehicleScheduleID;
var driverscheduleID;
var driverID;

function pendingBookings(){
    $("#tblPendingBooking").empty();


    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/bookingDetails",
        method:"get",
        success(resp){
            for (var i of resp.data) {
                if (i.detailsStatus == "Not Approved"){

                    var row = `<tr><td>${i.bookingDetailsId}</td><td>${i.bookingId}</td><td>${i.pickUpDate}</td><td>${i.returnDate}</td><td>${i.loseDamageImg}</td><td>${i.detailsStatus}</td></tr>`;
                $("#tblPendingBooking").append(row);

                $("#tblPendingBooking>tr").click(function () {
                    $("#txtBManageBookingID").val($(this).children(":eq(1)").text());
                    $("#txtBManagePickDate").val($(this).children(":eq(2)").text());
                    $("#txtBManageReturnDate").val($(this).children(":eq(3)").text());



                    bookigDetailsID = $(this).children(":eq(0)").text();
                    bookingid = $(this).children(":eq(1)").text()
                    loseDamegeImg = $(this).children(":eq(4)").text()

                    console.log(bookigDetailsID)

                    $("#loseDamageSlip").css({
                        "background": `url(${"http://localhost:8080/Back_end_war_exploded/" + $(this).children(":eq(4)").text()})`,
                        "background-size": "cover",
                        "background-position": "center",
                        "height": "300px"
                    });

                    $.ajax({
                        url: "http://localhost:8080/Back_end_war_exploded/api/v1/driverSchedule",
                        method: "get",
                        success(resp) {
                            for (var i of resp.data) {
                                if (i.bookingDetails.bookingDetailsId == bookigDetailsID) {

                                    $("#txtBManageDriverNIC").val(i.driverId.driverNICNumber);
                                    driverID=i.driverId.driverNICNumber;
                                    driverscheduleID=i.diverscheduleId;
                                    return
                                }
                                    $("#txtBManageDriverNIC").val("Not Assign");

                            }

                        }
                    });

                    $.ajax({
                        url: "http://localhost:8080/Back_end_war_exploded/api/v1/vehicleSchedule",
                        method: "get",
                        success(resp) {
                            for (var i of resp.data) {
                                if (i.bookingDetailsId.bookingDetailsId == bookigDetailsID) {

                                    $("#txtBManageVNumber").val(i.vehicleNumber.vehicleNumber)

                                    vehicleScheduleID=i.vehicleScheduleId;

                                    var type = i.vehicleNumber.vehicleType;

                                    if (type == "General") {
                                        $("#txtBManageLoseDamage").val("10000")
                                    } else if (type == "Premium") {
                                        $("#txtBManageLoseDamage").val("15000")
                                    } else {
                                        $("#txtBManageLoseDamage").val("20000")
                                    }
                                }
                            }

                        }
                    });

                    $.ajax({
                        url: "http://localhost:8080/Back_end_war_exploded/api/v1/booking?bookingId=" + bookingid,
                        method: "get",
                        success(resp) {

                            $("#txtBManageCustomerID").val(resp.data.customer.custNICNumber);
                            $("#txtBManageCustomerName").val(resp.data.customer.custName);


                        }
                    });

                });
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
        "custNIC":$("#txtBManageCustomerID").val(),
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
            swal("Booking Approved !", "Done", "success");
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
        "custNIC":$("#txtBManageCustomerID").val(),
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
            swal("Booking Rejected !", "Done", "success");
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

function loadAllChangeDrivers(){
    $("#tblChangeDriver").empty();
    $.ajax({
        url: "http://localhost:8080/Back_end_war_exploded/api/v1/driver",
        method: "GET",
        success(resp) {
            for (var i of resp.data) {
                var row = `<tr><td>${i.driverNICNumber}</td><td>${i.driverName}</td></tr>`;
                $("#tblChangeDriver").append(row);


                $("#tblChangeDriver>tr").click(function () {

                    $("#txtBManageDriverNIC").val($(this).children(":eq(0)").text());
                });

            }
        }
    });
}

$("#btn-change-driver").click(function (){
    ChangeDriver();
    driverSchedule={
        "diverscheduleId":1,
        "driverStartDate":$("#txtBManageReturnDate").val(),
        "driverEndDate":$("#txtBManageReturnDate").val(),
        "driverScheduleStatus":"On Work",
        "bookingDetails":{
            "bookingDetailsId":bookigDetailsID,
        },
        "driverId":{
            "driverNICNumber":$("#txtBManageDriverNIC").val(),
        }
    }

    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/driverSchedule",
        method:"Post",
        contentType: "application/json",
        data: JSON.stringify(driverSchedule),
        success(resp){
            swal("Changed Driver !", "Done", "success");

        }
    });
});


function ChangeDriver(){
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
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/driverSchedule",
        method:"delete",
        contentType: "application/json",
        data: JSON.stringify(driverSchedule),
        success(resp){

        }
    });
}