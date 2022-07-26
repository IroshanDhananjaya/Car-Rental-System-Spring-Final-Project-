function forvehicleMage() {
    document.getElementsByClassName("CustomerHomePage")[0].style.display = "none"
    document.getElementsByClassName(" customer-Manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-manage-content")[0].style.display = "block"
    document.getElementsByClassName(" Manage-Booking-content")[0].style.display = "none"
    document.getElementsByClassName(" userProfile-manage-content ")[0].style.display = "none"
    
    loadAllVehicleWithImg();
    $("#btn-select-vehicle-b0ok").attr('disabled', true);
}

loadAllVehicleWithImg();
var vehicleId;

function loadAllVehicleWithImg(){
    $("#tblAllVehicleWithImg").empty();
    $.ajax({
        url: "http://localhost:8080/Back_end_war_exploded/api/v1/vehicle",
        method: "GET",
        success(resp) {
            for (var i of resp.data) {
                var row = `<tr><td><img src="${"http://localhost:8080/Back_end_war_exploded/"+i.vehicleFontImage}"/></td><td>${i.vehicleNumber}</td><td>${i.vehicleType}</td><td>${i.vehicleBrand}</td><td>${i.trasmissionType}</td><td>${i.colour}</td></tr>`;
                $("#tblAllVehicleWithImg").append(row);

                $("#tblAllVehicleWithImg>tr").click(function (){

                    vehicleId=$(this).children(":eq(1)").text()

                    $("#btn-select-vehicle-b0ok").attr('disabled', false);
                    $.ajax({
                        url: "http://localhost:8080/Back_end_war_exploded/api/v1/vehicle?id="+vehicleId,
                        method: "GET",
                        success(resp) {
                            console.log(resp.data.vehicleNumber)
                            $("#lblVehicleNumber").text(resp.data.vehicleNumber)
                            $("#lblVehicleFuelType").text(resp.data.vehicleFuelType)
                            $("#lblVehiclNoOfPassenger").text(resp.data.noOfPassenger)
                            $("#lblVehicleDailyRent").text(resp.data.dailyRent)
                            $("#lblVehicleMonthlyRent").text(resp.data.monthlyRent)
                            $("#lblVehiclePriceForKM").text(resp.data.priceForKM)
                            $("#lblVehiclePriceForExtraKM").text(resp.data.priceForExtraKM)
                            $("#txtBookingVNumber").val(  $("#lblVehicleNumber").text());

                            var type = resp.data.vehicleType;

                            if (type == "General") {
                                $("#txtBookingLoseDamage").val("10000")
                            } else if (type == "Premium") {
                                $("#txtBookingLoseDamage").val("15000")
                            } else {
                                $("#txtBookingLoseDamage").val("20000")
                            }
                        }
                    });

                });


            }
        }
    });
}

$("#btn-select-vehicle-b0ok").click(function (){


    document.getElementsByClassName("CustomerHomePage")[0].style.display = "block"
    document.getElementsByClassName("customer-Manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-manage-content")[0].style.display = "none"
    document.getElementsByClassName(" Manage-Booking-content")[0].style.display = "none"

    document.getElementsByClassName(" userProfile-manage-content ")[0].style.display = "none"
});