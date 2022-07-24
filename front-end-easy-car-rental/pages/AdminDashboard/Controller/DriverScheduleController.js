function fordriverSchedule() {
    document.getElementsByClassName("AdminHomePage")[0].style.display = "none"
    document.getElementsByClassName("driver-manage-content")[0].style.display = "none"
    document.getElementsByClassName("driver-schedule-content")[0].style.display = "block"
    document.getElementsByClassName("customer-Manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-schedule-content")[0].style.display = "none"
    document.getElementsByClassName(" Manage-Booking-content")[0].style.display = "none"

    loadAllDriverSchedule()
}



function loadAllDriverSchedule(){


    $("#tblDriverSchedule").empty();
    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/driverSchedule",
        method:"get",
        success(resp){
            console.log(resp)
            for (var i of resp.data){
                var row=`<tr><td>${i.driverId.driverNICNumber}</td><td>${i.bookingId.bookingId}</td><<td>${i.driverStartDate}</td>/<td>${i.driverEndDate}</td>t<td>${i.driverScheduleStatus}</td>r>`;

                $("#tblDriverSchedule").append(row);
            }
        }
    });

}

function SearchDriverSchedule(){


    $("#tblDriverSchedule").empty();
    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/driverSchedule",
        method:"get",
        success(resp){
            console.log(resp)
            for (var i of resp.data){
                if (i.driverId.driverNICNumber==$("#txtDriverSheduleSearch").val()){
                    var row=`<tr><td>${i.driverId.driverNICNumber}</td><td>${i.bookingId.bookingId}</td><<td>${i.driverStartDate}</td>/<td>${i.driverEndDate}</td>t<td>${i.driverScheduleStatus}</td>r>`;

                    $("#tblDriverSchedule").append(row);
                }

            }
        }
    });

}

$("#btn-Driver-schedule-search").click(function (){
    SearchDriverSchedule();
});