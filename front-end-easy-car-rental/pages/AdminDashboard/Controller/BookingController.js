function forBookingManage() {
    document.getElementsByClassName("AdminHomePage")[0].style.display = "none"
    document.getElementsByClassName("driver-manage-content")[0].style.display = "none"
    document.getElementsByClassName("driver-schedule-content")[0].style.display = "none"
    document.getElementsByClassName(" customer-Manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-schedule-content")[0].style.display = "none"
    document.getElementsByClassName(" Manage-Booking-content")[0].style.display = "block"

    pendingBookings();
}

function pendingBookings(){
    $("#tblPendingBooking").empty();
    var bookigDetailsID;

    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/bookingDetails",
        method:"get",
        success(resp){
            for (var i of resp.data){

                var row=`<tr><td>${i.bookingDetailsId}</td><td>${i.bookingId}</td><td>${i.pickUpDate}</td><td>${i.returnDate}</td><td>${i.loseDamageImg}</td><td>${i.detailsStatus}</td></tr>`;
                        $("#tblPendingBooking").append(row);

                $("#tblPendingBooking>tr").click(function () {
                    $("#txtBManageBookingID").val($(this).children(":eq(1)").text());
                    $("#txtBManagePickDate").val($(this).children(":eq(2)").text());
                    $("#txtBManageReturnDate").val($(this).children(":eq(3)").text());

                    bookigDetailsID=$(this).children(":eq(0)").text()

                    $("#loseDamageSlip").css({
                        "background": `url(${"http://localhost:8080/Back_end_war_exploded/"+$(this).children(":eq(4)").text()})`,
                        "background-size": "cover",
                        "background-position":"center",
                        "height": "300px"
                    });

                    $.ajax({
                        url:"http://localhost:8080/Back_end_war_exploded/api/v1/driverSchedule",
                        method: "get",
                        success(resp) {
                          for (var i of resp.data){
                              if(i.bookingDetails.bookingDetailsId==bookigDetailsID){

                                  $("#txtBManageDriverNIC").val(i.driverId.driverNICNumber)
                              }
                          }

                        }
                    });

                    $.ajax({
                        url:"http://localhost:8080/Back_end_war_exploded/api/v1/vehicleSchedule",
                        method: "get",
                        success(resp) {
                            for (var i of resp.data){
                                if(i.bookingDetailsId.bookingDetailsId==bookigDetailsID){

                                    $("#txtBManageVNumber").val(i.vehicleNumber.vehicleNumber)
                                }
                            }

                        }
                    });



                });

            }
        }
    });
}

