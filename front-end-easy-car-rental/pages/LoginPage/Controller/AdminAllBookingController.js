function forAdminAllBooking() {
    document.getElementsByClassName("AdminHomePage")[0].style.display = "none"
    document.getElementsByClassName("driver-manage-content")[0].style.display = "none"
    document.getElementsByClassName("driver-schedule-content")[0].style.display = "none"
    document.getElementsByClassName("admin-customer-Manage-content")[0].style.display = "none"
    document.getElementsByClassName("Admin-vehicle-manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-schedule-content")[0].style.display = "none"
    document.getElementsByClassName("Admin-Manage-Booking-content")[0].style.display = "none"
    document.getElementsByClassName("Admin-all-Booking-content")[0].style.display = "block"


    loadAllBookingForAdmin();
}

var bookingId;
var bookingDetailsId;

function loadAllBookingForAdmin(){
    $("#lblAllBooking").empty();
    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/bookingDetails",
        method:"get",
        success(resp){
            for (var i of resp.data){
                var row = `<tr><td>${i.bookingDetailsId}</td><td>${i.bookingId}</td><td>${i.pickUpDate}</td><td>${i.returnDate}</td><td>${i.detailsStatus}</td></tr>`;
                    $("#lblAllBooking").append(row);

                    $("#lblAllBooking>tr").click(function (){
                        $("#lblAllBDetailsBookingId").text($(this).children(":eq(1)").text())
                        $("#lblAllBDetailsPickUpDate").text($(this).children(":eq(2)").text())
                        $("#lblAllBDetailsReturnDate").text($(this).children(":eq(3)").text())
                        $("#lblAllBDetailsBookingStatus").text($(this).children(":eq(4)").text())

                        bookingId=$(this).children(":eq(1)").text();
                        bookingDetailsId=$(this).children(":eq(0)").text();

                        $.ajax({
                            url: "http://localhost:8080/Back_end_war_exploded/api/v1/booking?bookingId=" + bookingId,
                            method: "get",
                            success(resp) {
                                customerID=resp.data.customer.custNICNumber;
                                $("#lblAllBDetailsCustomerNIC").text(resp.data.customer.custNICNumber);
                                $("#lblAllBDetailsCustomerName").text(resp.data.customer.custName);
                                $("#lblAllBDetailsCustomerAddress").text(resp.data.customer.custAddress);
                                $("#lblAllBDetailsCustomerContact").text(resp.data.customer.custContact);
                            }
                        });


                        $.ajax({
                            url: "http://localhost:8080/Back_end_war_exploded/api/v1/driverSchedule",
                            method: "get",
                            success(resp) {
                                for (var i of resp.data) {
                                    if (i.bookingDetails.bookingDetailsId == bookingDetailsId) {
                                        driverID=i.driverId.driverNICNumber;
                                        driverscheduleID=i.diverscheduleId;
                                        $("#lblAllBDetailsDriverNIC").text(driverID)

                                    }else {
                                        $("#lblAllBDetailsDriverNIC").text("Not Assign")
                                    }


                                }

                            }
                        });

                        $.ajax({
                            url: "http://localhost:8080/Back_end_war_exploded/api/v1/vehicleSchedule",
                            method: "get",
                            success(resp) {
                                for (var i of resp.data) {
                                    if (i.bookingDetailsId.bookingDetailsId == bookingDetailsId) {

                                        $("#lblAllBDetailsVnumber").text(i.vehicleNumber.vehicleNumber)








                                    }
                                }

                            }
                        });


                    });

            }
        }
    });
}