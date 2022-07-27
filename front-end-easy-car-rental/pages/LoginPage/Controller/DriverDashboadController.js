
$("#btn-all-driverdashboard-schedule").click(function (){
    $("#driverDashboardTBL").empty();
    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/driverSchedule",
        method:"get",
        success(resp){

            for (var i of resp.data){
                if(i.driverId.driverNICNumber==$("#txtDriverDashboardDNIC").val()){
                    var row=`<tr><td>${i.bookingDetails.bookingDetailsId}</td><td>${i.driverId.driverNICNumber}</td><td>${i.driverStartDate}</td>/<td>${i.driverEndDate}</td>t<td>${i.driverScheduleStatus}</td>r>`;

                    $("#driverDashboardTBL").append(row);
                }
            }

        }
    });
});


$("#btn-search-driverdashboard-schedule").click(function (){
    $("#driverDashboardTBL").empty();
    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/driverSchedule",
        method:"get",
        success(resp){

            for (var i of resp.data){
                if(i.driverId.driverNICNumber==$("#txtDriverDashboardDNIC").val()){
                    if(i.driverStartDate==$("#txtDriverDashboardStartDate").val()&i.driverEndDate==$("#txtDriverDashboardEndDate").val()){
                        var row=`<tr><td>${i.bookingDetails.bookingDetailsId}</td><td>${i.driverId.driverNICNumber}</td><td>${i.driverStartDate}</td>/<td>${i.driverEndDate}</td>t<td>${i.driverScheduleStatus}</td>r>`;

                        $("#driverDashboardTBL").append(row);
                    }

                }
            }

        }
    });
});