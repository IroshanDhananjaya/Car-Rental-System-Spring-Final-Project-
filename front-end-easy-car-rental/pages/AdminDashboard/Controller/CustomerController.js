function forCustomerMange() {

    document.getElementsByClassName("AdminHomePage")[0].style.display = "none"
    document.getElementsByClassName("driver-manage-content")[0].style.display = "none"
    document.getElementsByClassName("driver-schedule-content")[0].style.display = "none"
    document.getElementsByClassName(" customer-Manage-content")[0].style.display = "block"
    document.getElementsByClassName("vehicle-manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-schedule-content")[0].style.display = "none"
    document.getElementsByClassName(" Manage-Booking-content")[0].style.display = "none"

    loadAllPendingCustomer();
}



function loadAllPendingCustomer(){
    $("#tblPendingCustomer").empty();

    $.ajax({
        url:"http://localhost:8080/Back_end_war/api/v1/customer",
        method:"GET",
        success(resp){
            for(var i of resp.data){
                if(i.custStatus=="Not Approved"){
                    var row=`<tr><td>${i.custNICNumber}</td><td>${i.custName}</td><td>${i.custAddress}</td><td>${i.custContact}</td><td>${i.custEmail}</td><td>${i.custStatus}</td></tr>`;

                    $("#tblPendingCustomer").append(row)
                }

                $("#tblPendingCustomer>tr").click(function () {


                    $("#txtCNICNumber").val($(this).children(":eq(0)").text());
                    $("#txtCname").val($(this).children(":eq(1)").text());
                    $("#txtCAddress").val($(this).children(":eq(2)").text());
                    $("#txtCContactNumber").val($(this).children(":eq(3)").text());
                    $("#txtCEmail").val($(this).children(":eq(4)").text());



                });
            }
        }
    });

}
/*

function loadImag(){
    $.ajax({
        url:"http://localhost:8080/Back_end_war/api/v1/customer",
        method:"GET",
        success(resp) {
            if($("#txtCNICNumber").val()==resp.data.custNICNumber){
                let url=i.custNICImg;
                $("#display").css({
                    "background": `url("file:///E:/IJSE/GDSE57/Spring_Final_Project/GDSE57-ITS-1114-IroshanDhananjaya/Back_end/target/Back_end-1.0-SNAPSHOT/uploads/alto%20front.jpg"})`,
                    "background-size": "cover",
                    "height": "300px"
                });
            }
        }
    })
}
*/

$("#btn-approve-customer").click(function (){
    var custNIC=$("#txtCNICNumber").val();

    $.ajax({
        url:"http://localhost:8080/Back_end_war/api/v1/customer?id="+custNIC,
        method:"GET",
        success(resp) {
            var customer={
                "custNICNumber":resp.data.custNICNumber,
                "custName":resp.data.custName,
                "custAddress":resp.data.custAddress,
                "custNICImg":resp.data.custNICImg,
                "custdrivingImg":resp.data.custdrivingImg,
                "custContact":resp.data.custContact,
                "custEmail":resp.data.custEmail,
                "custPassword":resp.data.custPassword,
                "custStatus":"Approved",
                "type":resp.data.type,
            }

            $.ajax({
                url:"http://localhost:8080/Back_end_war/api/v1/customer",
                method:"put",
                contentType:"application/json",
                data:JSON.stringify(customer),
                success(resp){
                    alert("Customer Approved");
                    loadAllPendingCustomer();
                }
            });
        }
    })
});

$("#btn-reject-customer").click(function (){
    var custNIC=$("#txtCNICNumber").val();

    $.ajax({
        url: "http://localhost:8080/Back_end_war/api/v1/customer?id=" + custNIC,
        method: "delete",
        success(resp) {
            alert("Customer Rejected....")
            loadAllPendingCustomer();
        }
    });

});
