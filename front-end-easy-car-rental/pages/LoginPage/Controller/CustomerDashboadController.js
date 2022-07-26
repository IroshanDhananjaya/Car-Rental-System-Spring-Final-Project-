loadAllVehicleInCustomerDashboard();
genarateNewBookingId();

var cartDb=new Array();

function loadAllVehicleInCustomerDashboard(){
     $("#tblCustVehicleTable").empty();
     $.ajax({
         url: "http://localhost:8080/Back_end_war_exploded/api/v1/vehicle",
         method: "GET",
         success(resp) {
             for (var i of resp.data) {

                     var row = `<tr><td>${i.vehicleNumber}</td><td>${i.vehicleType}</td><td>${i.vehicleBrand}</td><td>${i.trasmissionType}</td><td>${i.vehicleFuelType}</td><td>${i.noOfPassenger}</td><td>${i.colour}</td><td>${i.dailyRent}</td><td>${i.monthlyRent}</td><td>${i.priceForKM}</td><td>${i.priceForExtraKM}</td><td>${i.vehicleStatus}</td></tr>`;
                 $("#tblCustVehicleTable").append(row);

                 $("#tblCustVehicleTable>tr").click(function () {


                     genarateNewBookingId();


                     $("#txtBookingVNumber").val($(this).children(":eq(0)").text());

                     var type = $(this).children(":eq(1)").text();

                     if (type == "General") {
                         $("#txtBookingLoseDamage").val("10000")
                     } else if (type == "Premium") {
                         $("#txtBookingLoseDamage").val("15000")
                     } else {
                         $("#txtBookingLoseDamage").val("20000")
                     }

                 });
             }

         }
     });
 }

 function addToCart(){
    var bookingID=$("#txtCustBookingID").val();
    var pickUpDate=$("#txtBookingPickDate").val();
    var returnDate=$("#txtBookingReturnDate").val();
    var driverWant=$("#cmbDriverAssign").val();
    var vehicleNumber=$("#txtBookingVNumber").val();
    var loseDamage=$("#txtBookingLoseDamage").val();

    var Driver;

    if(driverWant=="Yes"){

        Driver= "Assign";
    }else {
        Driver="Not Assign";
    }

    var cart={
        bId:bookingID,
        pickDate:pickUpDate,
        retDate:returnDate,
        damage:loseDamage,
        vNumber:vehicleNumber,
        assignDriver:Driver
    }

    cartDb.push(cart)

 }

 function loadCart(){
    $("#bookingCartTable").empty();
    for (var i of cartDb){
        let row=`<tr><td>${i.bId}</td><td>${i.pickDate}</td><td>${i.retDate}</td><td>${i.damage}</td><td>${i.vNumber}</td><td>${i.assignDriver}</td></tr>`
        $("#bookingCartTable").append(row);
    }

 }

 $("#btn-booking-addToCart").click(function (){
     addToCart()
     loadCart();
 });

$("#btn-booking-place").click(function (){
    addbooking();
});



function addbooking(){
     var bookingID=$("#txtCustBookingID").val();
     var pickUpDate=$("#txtBookingPickDate").val();
     var returnDate=$("#txtBookingReturnDate").val();
     var driverWant=$("#cmbDriverAssign").val();
     var vehicleNumber=$("#txtBookingVNumber").val();
     var loseDamage=$("#txtBookingLoseDamage").val();


    var BookinData=new FormData();
     var custID=$("#txtBookingCustId").val()
     let losDamageSlip=$("#txtBookingLoseDamageImg")[0].files[0];
     let losDamageSlipName=$("#txtBookingLoseDamageImg")[0].files[0].name;
     var customer;
     var driver;

     var BookingDetailsDB=new Array();

     $.ajax({
         url:"http://localhost:8080/Back_end_war_exploded/api/v1/customer?id="+custID,
         method: "get",
         success(resp) {
             customer= resp.data;
             console.log("Customer"+customer)
         }
     });

     $.ajax({
         url:"http://localhost:8080/Back_end_war_exploded/api/v1/driver/randomDriver",
         method: "get",
         success(resp) {
             driver= resp.data;
             console.log(driver);
         }
     });

     for (var i of cartDb){

         details={
             "bookingDetailsId":"1",
             "pickUpDate":i.pickDate,
             "returnDate":i.retDate,
             "loseDamageStatus":i.damage,
             "loseDamageImg":losDamageSlipName,
             "detailsStatus":"Not Approved",
             "custNIC":custID,
             "bookingId":i.bId,
             "vehicleNumber":i.vNumber,
             "driverNICNumber":i.assignDriver,
         }
         BookingDetailsDB.push(details);
     }


    var Booking={
        "bookingId":bookingID,
        "customer": {
            "custNICNumber":custID,
        },
        "bookingDetails":BookingDetailsDB,

    }

     console.log(customer);
     BookinData.append("loseDamageSlip",losDamageSlip);
     BookinData.append("booking",new Blob([JSON.stringify(Booking)],{type:"application/json"}))

     $.ajax({
         url:"http://localhost:8080/Back_end_war_exploded/api/v1/booking",
         method:"post",
         async:true,
         contentType:false,
         processData:false,
         data:BookinData,
         success(resp){
             alert(resp.message);
             genarateNewBookingId();
         }
     });

 }

 function genarateNewBookingId(){
     $.ajax({
         url:"http://localhost:8080/Back_end_war_exploded/api/v1/booking/lastID/rentID",
         method:"GET",
         contentType: "application/json",
         async: true,
         success(resp){
             try {
                 let lastOID = resp.data;
                 let newOID = parseInt(lastOID.substring(1, 4)) + 1;
                 if (newOID < 10) {
                     $('#txtCustBookingID').val("B00" + newOID);
                 } else if (newOID < 100) {
                     $('#txtCustBookingID').val("B0" + newOID);
                 } else {
                     $('#txtCustBookingID').val("B" + newOID);
                 }
             } catch (e) {
                 $('#txtCustBookingID').val("B001");
             }
         }
     });
 }

 function getCustomer(){
    var custID=$("#txtBookingCustId").val()
     var cust;

    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/customer?id="+custID,
        method: "get",
        success(resp) {
         cust= resp.data ;
        (cust)
        }
    });
 }

 $("#btn-Chose-Vehicle").click(function (){
     $("#btn-select-vehicle-b0ok").attr('disabled', true);
     document.getElementsByClassName("CustomerHomePage")[0].style.display = "none"
     document.getElementsByClassName(" customer-Manage-content")[0].style.display = "none"
     document.getElementsByClassName("vehicle-manage-content")[0].style.display = "block"
     document.getElementsByClassName(" Manage-Booking-content")[0].style.display = "none"
     document.getElementsByClassName(" userProfile-manage-content ")[0].style.display = "none"
 });