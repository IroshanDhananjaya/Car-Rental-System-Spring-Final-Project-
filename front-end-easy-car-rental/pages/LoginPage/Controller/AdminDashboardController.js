
function forAdminDashboard() {
    document.getElementsByClassName("AdminHomePage")[0].style.display = "block"
    document.getElementsByClassName("driver-manage-content")[0].style.display = "none"
    document.getElementsByClassName("driver-schedule-content")[0].style.display = "none"
    document.getElementsByClassName("admin-customer-Manage-content")[0].style.display = "none"
    document.getElementsByClassName("Admin-vehicle-manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-schedule-content")[0].style.display = "none"
    document.getElementsByClassName("Admin-Manage-Booking-content")[0].style.display = "none"

    loadAllPendingPaymentBooking();
}

loadAllPendingPaymentBooking();

var bookingId;
var bookingDetailsId;
var customerID;
var perday;
var perMonth;
var priceForKm;
var priceForextraKm;

function loadAllPendingPaymentBooking(){
    $("#tblPendingPayementbooking").empty();
    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/bookingDetails",
        method:"get",
        success(resp){
            for (var i of resp.data){
                if(i.detailsStatus=="Approved"){


                    var row = `<tr><td>${i.bookingDetailsId}</td><td>${i.bookingId}</td><td>${i.pickUpDate}</td><td>${i.returnDate}</td><td>${i.detailsStatus}</td></tr>`;
                    $("#tblPendingPayementbooking").append(row);

                    $("#tblPendingPayementbooking>tr").click(function (){
                        $("#txtPaymentBookingId").val($(this).children(":eq(1)").text())
                        $("#txtPaymentRentDate").val($(this).children(":eq(2)").text())
                        $("#txtPaymentReturnDate").val($(this).children(":eq(3)").text())

                        bookingId=$(this).children(":eq(1)").text();
                        bookingDetailsId=$(this).children(":eq(0)").text();

                        $.ajax({
                            url: "http://localhost:8080/Back_end_war_exploded/api/v1/booking?bookingId=" + bookingId,
                            method: "get",
                            success(resp) {
                                customerID=resp.data.customer.custNICNumber;
                                $("#txtPaymentCustNIC").val(resp.data.customer.custNICNumber);
                                $("#txtPaymentCustName").val(resp.data.customer.custName);
                            }
                        });


                        $.ajax({
                            url: "http://localhost:8080/Back_end_war_exploded/api/v1/vehicleSchedule",
                            method: "get",
                            success(resp) {
                                for (var i of resp.data) {
                                    if (i.bookingDetailsId.bookingDetailsId == bookingDetailsId) {

                                        $("#txtPaymentVNumber").val(i.vehicleNumber.vehicleNumber)

                                        vehicleScheduleID=i.vehicleScheduleId;

                                        var type = i.vehicleNumber.vehicleType;

                                         perday =i.vehicleNumber.dailyRent;
                                         perMonth =i.vehicleNumber.monthlyRent;
                                         priceForKm = i.vehicleNumber.priceForKM;
                                        priceForextraKm = i.vehicleNumber.priceForExtraKM;


                                        /* if (type == "General") {
                                             $("#txtBManageLoseDamage").val("10000")
                                         } else if (type == "Premium") {
                                             $("#txtBManageLoseDamage").val("15000")
                                         } else {
                                             $("#txtBManageLoseDamage").val("20000")
                                         }*/
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
$("#SearchPendingBooking").click(function (){
    loadAllPendingPaymentBooking();
});

function calcFinalPrice(){

    var totalDate=$("#txtPaymentTotalDate").val()
    var totalKm=$("#txtPaymentKM").val()
    var totalExtraKM=$("#txtPaymentExtraKM").val()

    var totalDailyPrice;
    var totalKmPrice;

    if(totalDate==30){
        totalDailyPrice=perMonth;
    }else {
        totalDailyPrice=totalDate*perday;
    }

    totalKmPrice=(totalKm*priceForKm)+(totalExtraKM*priceForextraKm);
    console.log(totalKm*priceForKm)
    console.log(totalExtraKM*priceForextraKm)
    console.log((totalKm*priceForKm)+(totalExtraKM*priceForextraKm))
    var finalPrice=totalKmPrice+totalDailyPrice;
    console.log(totalKmPrice+totalDailyPrice)

    $("#txtPaymentFinalPrice").val(finalPrice);


}
$("#txtPaymentKM").click(function (){
    calcFinalPrice();
});

$("#txtPaymentExtraKM").click(function (){
    calcFinalPrice();
});

$("#txtPaymentTotalDate").click(function (){
    calcFinalPrice();
});


$("#btn-complete-Booking").click(function () {

    payement={
        "paymentId":"1",
        "finalPrice": $("#txtPaymentFinalPrice").val(),
        "bookingId":{
            "bookingId":bookingId,
        },
        "custNICNumber":{
            "custNICNumber":customerID
        },
    }


    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/payment",
        method:"post",
        contentType:"application/json",
        data:JSON.stringify(payement),
        success(resp){
            alert(resp.message);
        }
    });


});