loadAllVehicleInCustomerDashboard();



function loadAllVehicleInCustomerDashboard(){
     $("#tblCustVehicleTable").empty();
     $.ajax({
         url: "http://localhost:8080/Back_end_war/api/v1/vehicle",
         method: "GET",
         success(resp) {
             for (var i of resp.data) {
                 var row = `<tr><td>${i.vehicleNumber}</td><td>${i.vehicleType}</td><td>${i.vehicleBrand}</td><td>${i.trasmissionType}</td><td>${i.vehicleFuelType}</td><td>${i.noOfPassenger}</td><td>${i.colour}</td><td>${i.dailyRent}</td><td>${i.monthlyRent}</td><td>${i.priceForKM}</td><td>${i.priceForExtraKM}</td><td>${i.vehicleStatus}</td></tr>`;
                 $("#tblCustVehicleTable").append(row);

                 $("#tblCustVehicleTable>tr").click(function () {

                     getCustomer();

                     $("#txtBookingVNumber").val($(this).children(":eq(0)").text());

                        var type=$(this).children(":eq(1)").text();

                        if(type=="General"){
                            $("#txtBookingLoseDamage").val("10000")
                        }else if(type=="Premium"){
                            $("#txtBookingLoseDamage").val("15000")
                        }else {
                            $("#txtBookingLoseDamage").val("20000")
                        }

                 });
             }
         }
     });
 }

 function addbooking(){

 }

 function getCustomer(){
    var custID=$("#txtBookingCustId").val()

    $.ajax({
        url:"http://localhost:8080/Back_end_war/api/v1/customer?id="+custID,
        method: "get",
        success(resp) {
           console.log(resp.data);
        }
    });
 }