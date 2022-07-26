
function forvehicleScheduleMage() {
    document.getElementsByClassName("AdminHomePage")[0].style.display = "none"
    document.getElementsByClassName("driver-manage-content")[0].style.display = "none"
    document.getElementsByClassName("driver-schedule-content")[0].style.display = "none"
    document.getElementsByClassName(" customer-Manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-schedule-content")[0].style.display = "block"
    document.getElementsByClassName(" Manage-Booking-content")[0].style.display = "none"

    loadAllVehicleSchedule();
}

function loadAllVehicleSchedule(){


    $("#tblVehicleSchedule").empty();
    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/vehicleSchedule",
        method:"get",
        success(resp){
            console.log(resp)
            for (var i of resp.data){
                var row=`<tr><td>${i.bookingDetailsId.bookingDetailsId}</td><td>${i.vehicleNumber.vehicleNumber}</td><<td>${i.vehicleStartDate}</td>/<td>${i.vehicleEndDate}</td>t<td>${i.vehicleScheduleStatus}</td>r>`;

                $("#tblVehicleSchedule").append(row);
            }
        }
    });

}


function SearchVehicleSchedule(){


    $("#tblVehicleSchedule").empty();
    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/vehicleSchedule",
        method:"get",
        success(resp){
            console.log(resp)
            for (var i of resp.data){
                if(i.vehicleNumber.vehicleNumber==$("#txtVehiclescheduleSearch").val()){
                    var row=`<tr><td>${i.bookingDetailsId.bookingDetailsId}</td><td>${i.vehicleNumber.vehicleNumber}</td><<td>${i.vehicleStartDate}</td>/<td>${i.vehicleEndDate}</td>t<td>${i.vehicleScheduleStatus}</td>r>`;

                    $("#tblVehicleSchedule").append(row);
                }

            }
        }
    });

}

$("#btn-vehicleSchedule-search").click(function (){
    SearchVehicleSchedule();
});

$("#btn-all-Vehiclescedule").click(function (){
    $("#tblVehicleSchedule").empty();
    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/vehicleSchedule",
        method:"get",
        success(resp){
            console.log(resp)
            for (var i of resp.data){
                var row=`<tr><td>${i.bookingDetailsId.bookingDetailsId}</td><td>${i.vehicleNumber.vehicleNumber}</td><<td>${i.vehicleStartDate}</td>/<td>${i.vehicleEndDate}</td>t<td>${i.vehicleScheduleStatus}</td>r>`;

                $("#tblVehicleSchedule").append(row);
            }
        }
    });
});

$("#btn-onBookingVehicleSchedule").click(function (){

    $("#tblVehicleSchedule").empty();
    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/vehicleSchedule",
        method:"get",
        success(resp){
            console.log(resp)
            for (var i of resp.data){
                if(i.vehicleScheduleStatus=="On Booking"){
                    var row=`<tr><td>${i.bookingDetailsId.bookingDetailsId}</td><td>${i.vehicleNumber.vehicleNumber}</td><<td>${i.vehicleStartDate}</td>/<td>${i.vehicleEndDate}</td>t<td>${i.vehicleScheduleStatus}</td>r>`;

                    $("#tblVehicleSchedule").append(row);
                }

            }
        }
    });
});

$("#btn-canceldVehicleSchedule").click(function (){
    $("#tblVehicleSchedule").empty();
    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/vehicleSchedule",
        method:"get",
        success(resp){
            console.log(resp)
            for (var i of resp.data){
                if(i.vehicleScheduleStatus=="Cancel"){
                    var row=`<tr><td>${i.bookingDetailsId.bookingDetailsId}</td><td>${i.vehicleNumber.vehicleNumber}</td><<td>${i.vehicleStartDate}</td>/<td>${i.vehicleEndDate}</td>t<td>${i.vehicleScheduleStatus}</td>r>`;

                    $("#tblVehicleSchedule").append(row);
                }

            }
        }
    });

});
