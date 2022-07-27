
function forvehicle() {
    document.getElementsByClassName("AdminHomePage")[0].style.display = "none"
    document.getElementsByClassName("driver-manage-content")[0].style.display = "none"
    document.getElementsByClassName("driver-schedule-content")[0].style.display = "none"
    document.getElementsByClassName("admin-customer-Manage-content")[0].style.display = "none"
    document.getElementsByClassName("Admin-vehicle-manage-content")[0].style.display = "block"
    document.getElementsByClassName("vehicle-schedule-content")[0].style.display ="none"
    document.getElementsByClassName("Admin-Manage-Booking-content")[0].style.display = "none"
    loadAllVehicle();
    loadAllMaintanceVehicle();
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
        url: "http://localhost:8080/Back_end_war_exploded/api/v1/vehicle",
        method: "post",
        async: true,
        contentType: false,
        processData: false,
        data: Vdata,
        success(resp) {
            swal(resp.message, "Done", "success");
            loadAllVehicle();
        },error (ob, textStatus, error) {

            swal(ob.responseJSON.message, "Error", "Error");

        }
    });
}

    function loadAllVehicle() {
        $("#vehicleTable").empty();
        $.ajax({
            url: "http://localhost:8080/Back_end_war_exploded/api/v1/vehicle",
            method: "GET",
            success(resp) {
                for (var i of resp.data) {
                    var row = `<tr><td>${i.vehicleNumber}</td><td>${i.vehicleType}</td><td>${i.vehicleBrand}</td><td>${i.trasmissionType}</td><td>${i.vehicleFuelType}</td><td>${i.noOfPassenger}</td><td>${i.colour}</td><td>${i.dailyRent}</td><td>${i.monthlyRent}</td><td>${i.priceForKM}</td><td>${i.priceForExtraKM}</td><td>${i.vehicleStatus}</td></tr>`;
                    $("#vehicleTable").append(row);


                    $("#vehicleTable>tr").click(function (){

                        $("#txtVehicleNumber").val($(this).children(":eq(0)").text());
                        $("#txtNoOfPassenger").val($(this).children(":eq(5)").text());
                        $("#txtDailyRent").val($(this).children(":eq(7)").text());
                        $("#txtMonthlyRent").val($(this).children(":eq(8)").text());
                        $("#txtPriceForKM").val($(this).children(":eq(9)").text());
                        $("#txtPriceForExtraKM").val($(this).children(":eq(10)").text());

                    });
                }
            }
        });
    }




$("#btn-vehicle-save").click(function (){
    saveVehicle();
});

/*

$("#btn-vehicle-update").click(function (){
    if($("#txtVehicleFrontImage").val()=="" & $("#txtVehicleBackImg").val()==""){
        swal("Please Upload Image", "Error", "error");
    }else{
        var Vdata = new FormData();

        let vFrontImg = $("#txtVehicleFrontImage")[0].files[0];
        let vBackImg = $("#txtVehicleBackImg")[0].files[0];
        let vFrontImgName = $("#txtVehicleFrontImage")[0].files[0].name;
        let vBackImgName = $("#txtVehicleBackImg")[0].files[0].name

        var vehicleNumber= $("#txtVehicleNumber").val();

        var frontImg;
        var backImg




        $.ajax({
            url: "http://localhost:8080/Back_end_war_exploded/api/v1/vehicle",
            method: "post",
            async: true,
            contentType: false,
            processData: false,
            data: Vdata,
            success(resp) {

                if(vFrontImgName==""){
                    frontImg=resp.data.vehicleFontImage;
                }else {
                    frontImg=vFrontImgName
                }

                if(vBackImgName==""){
                    backImg=resp.data.vehicleBackImage;
                }else {
                    backImg=vBackImgName;
                }


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
                    "vehicleFontImage": frontImg,
                    "vehicleBackImage": backImg,
                    "vehicleStatus": "Free",

                }

                Vdata.append("vImgFile", vFrontImg);
                Vdata.append("vImgFile", vBackImg);
                Vdata.append("vehicle", new Blob([JSON.stringify(vehicle)], {type: "application/json"}))

                $.ajax({
                    url: "http://localhost:8080/Back_end_war/api/v1/vehicle",
                    method: "put",
                    async: true,
                    contentType: false,
                    processData: false,
                    data: Vdata,
                    success(resp) {
                        alert(resp.message);
                        swal(resp.message, "Done", "success");
                        loadAllVehicle();
                    },error (ob, textStatus, error) {
                        swal(ob.responseJSON.message, "Error", "Error");
                    }
                });
            }
        })
    }

});
*/

$("#btn-vehicle-Maintenance").click(function (){
    var vehicleId=$("#txtMaintenanceVehicle").val();

    $.ajax({
        url: "http://localhost:8080/Back_end_war_exploded/api/v1/vehicle?id=" + vehicleId,
        method: "GET",
        success(resp) {
            var vehicle = {
                "vehicleNumber": resp.data.vehicleNumber,
                "vehicleType": resp.data.vehicleType,
                "vehicleBrand":resp.data.vehicleBrand,
                "trasmissionType":resp.data.trasmissionType,
                "vehicleFuelType": resp.data.vehicleFuelType,
                "noOfPassenger":resp.data.noOfPassenger,
                "colour":resp.data.colour,
                "dailyRent":resp.data.dailyRent,
                "monthlyRent":resp.data.monthlyRent,
                "priceForKM": resp.data.priceForKM,
                "priceForExtraKM": resp.data.priceForExtraKM,
                "vehicleFontImage":resp.data.vehicleFontImage,
                "vehicleBackImage":resp.data.vehicleBackImage,
                "vehicleStatus": "Maintenance",

            }

            $.ajax({
                url: "http://localhost:8080/Back_end_war_exploded/api/v1/vehicle",
                method: "put",
                contentType: "application/json",
                data: JSON.stringify(vehicle),
                success(resp){
                    swal("Vehicle is added for maintenance !", "Done", "success");
                    loadAllVehicle();
                    loadAllMaintanceVehicle();
                }
            });
        }
    });



});

$("#btn-Release-Maintenance").click(function (){
    var vehicleId=$("#txtMaintenanceVehicle").val();

    $.ajax({
        url: "http://localhost:8080/Back_end_war_exploded/api/v1/vehicle?id=" + vehicleId,
        method: "GET",
        success(resp) {
            var vehicle = {
                "vehicleNumber": resp.data.vehicleNumber,
                "vehicleType": resp.data.vehicleType,
                "vehicleBrand":resp.data.vehicleBrand,
                "trasmissionType":resp.data.trasmissionType,
                "vehicleFuelType": resp.data.vehicleFuelType,
                "noOfPassenger":resp.data.noOfPassenger,
                "colour":resp.data.colour,
                "dailyRent":resp.data.dailyRent,
                "monthlyRent":resp.data.monthlyRent,
                "priceForKM": resp.data.priceForKM,
                "priceForExtraKM": resp.data.priceForExtraKM,
                "vehicleFontImage":resp.data.vehicleFontImage,
                "vehicleBackImage":resp.data.vehicleBackImage,
                "vehicleStatus": "Free",

            }

            $.ajax({
                url: "http://localhost:8080/Back_end_war_exploded/api/v1/vehicle",
                method: "put",
                contentType: "application/json",
                data: JSON.stringify(vehicle),
                success(resp){
                    swal("Vehicle is Released !", "Done", "success");
                    loadAllVehicle();
                    loadAllMaintanceVehicle();
                }
            });
        }
    });



});

function loadAllMaintanceVehicle() {
    $("#MaintenancevehicleTable").empty();
    $.ajax({
        url: "http://localhost:8080/Back_end_war_exploded/api/v1/vehicle",
        method: "GET",
        success(resp) {
            for (var i of resp.data) {
                if(i.vehicleStatus=="Maintenance"){
                    var row = `<tr><td>${i.vehicleNumber}</td><td>${i.vehicleStatus}</td></tr>`;
                    $("#MaintenancevehicleTable").append(row);
                }



            }
        }
    });
}

