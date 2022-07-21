
function forvehicle() {
    document.getElementsByClassName("AdminHomePage")[0].style.display = "none"
    document.getElementsByClassName("driver-manage-content")[0].style.display = "none"
    document.getElementsByClassName("driver-schedule-content")[0].style.display = "none"
    document.getElementsByClassName(" customer-Manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-manage-content")[0].style.display = "block"
    document.getElementsByClassName("vehicle-schedule-content")[0].style.display ="none"
    document.getElementsByClassName(" Manage-Booking-content")[0].style.display = "none"
    loadAllVehicle();
}



function saveVehicle() {

    var Vdata = new FormData();

    let vFrontImg = $("#txtVehicleFrontImage")[0].files[0];
    let vBackImg = $("#txtVehicleBackImg")[0].files[0];
    let vFrontImgName = $("#txtVehicleFrontImage")[0].files[0].name;
    let vBackImgName = $("#txtVehicleBackImg")[0].files[0].name

    var vehicle = {
        "vehicleNumber": $("#txtVehicleNumber").val(),
        "vehicleType": $("#cmbVehicleType").val(),
        "vehicleBrand": $("#cmbVehicleBrand").val(),
        "trasmissionType": $("#cmbTransmissionType").val(),
        "vehicleFuelType": $("#cmbFuelType").val(),
        "noOfPassenger": parseInt($("#txtNoOfPassenger").val()),
        "colour": $("#cmbVehicleColor").val(),
        "dailyRent": $("#txtDailyRent").val(),
        "monthlyRent": $("#txtMonthlyRent").val(),
        "priceForKM": $("#txtPriceForKM").val(),
        "priceForExtraKM": $("#txtPriceForExtraKM").val(),
        "vehicleFontImage": vFrontImgName,
        "vehicleBackImage": vBackImgName,
        "vehicleStatus": "Free",

    }

    Vdata.append("vImgFile", vFrontImg);
    Vdata.append("vImgFile", vBackImg);
    Vdata.append("vehicle", new Blob([JSON.stringify(vehicle)], {type: "application/json"}))

    $.ajax({
        url: "http://localhost:8080/Back_end_war/api/v1/vehicle",
        method: "post",
        async: true,
        contentType: false,
        processData: false,
        data: Vdata,
        success(resp) {
            alert(resp.message);
            loadAllVehicle();
        }
    });
}

    function loadAllVehicle() {
        $("#vehicleTable").empty();
        $.ajax({
            url: "http://localhost:8080/Back_end_war/api/v1/vehicle",
            method: "GET",
            success(resp) {
                for (var i of resp.data) {
                    var row = `<tr><td>${i.vehicleNumber}</td><td>${i.vehicleType}</td><td>${i.vehicleBrand}</td><td>${i.trasmissionType}</td><td>${i.vehicleFuelType}</td><td>${i.noOfPassenger}</td><td>${i.colour}</td><td>${i.dailyRent}</td><td>${i.monthlyRent}</td><td>${i.priceForKM}</td><td>${i.priceForExtraKM}</td><td>${i.vehicleStatus}</td></tr>`;
                    $("#vehicleTable").append(row);
                }
            }
        });
    }




$("#btn-vehicle-save").click(function (){
    saveVehicle();
});
