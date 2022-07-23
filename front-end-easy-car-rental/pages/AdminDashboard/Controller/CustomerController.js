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
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/customer",
        method:"GET",
        success(resp){
            for(var i of resp.data){

                    var row=`<tr><td>${i.custNICNumber}</td><td>${i.custName}</td><td>${i.custAddress}</td><td>${i.custContact}</td><td>${i.custEmail}</td><td>${i.custStatus}</td></tr>`;

                    $("#tblPendingCustomer").append(row)


                $("#tblPendingCustomer>tr").click(function () {
                    $("#txtCNICNumber").val($(this).children(":eq(0)").text());
                    $("#txtCname").val($(this).children(":eq(1)").text());
                    $("#txtCAddress").val($(this).children(":eq(2)").text());
                    $("#txtCContactNumber").val($(this).children(":eq(3)").text());
                    $("#txtCEmail").val($(this).children(":eq(4)").text());

                    $.ajax({
                        url:"http://localhost:8080/Back_end_war_exploded/api/v1/customer?id="+$("#txtCNICNumber").val(),
                        method:"get",
                        success(resp){
                            console.log(resp.data.custdrivingImg);
                            $("#display").css({
                                "background": `url(${"http://localhost:8080/Back_end_war_exploded/"+resp.data.custNICImg})`,
                                "background-size": "cover",
                                "background-position":"center",
                                "height": "300px"
                            });
                            $("#display2").css({
                                "background": `url(${"http://localhost:8080/Back_end_war_exploded/"+resp.data.custdrivingImg})`,
                                "background-size": "cover",
                                "background-position":"center",
                                "height": "300px"
                            });
                        }
                    });


                });
            }
        }
    });

}
