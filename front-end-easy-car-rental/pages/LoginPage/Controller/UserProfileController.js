
function forUserProfile() {
    document.getElementsByClassName("CustomerHomePage")[0].style.display = "none"
    document.getElementsByClassName(" customer-Manage-content")[0].style.display = "none"
    document.getElementsByClassName("vehicle-manage-content")[0].style.display = "none"
    document.getElementsByClassName(" Manage-Booking-content")[0].style.display = "none"
    document.getElementsByClassName(" userProfile-manage-content ")[0].style.display = "block"

}

var nicImg;
var licenseImg;

function loging(){
    var email=$("#txtEmail").val();
    var password=$("#txtPassword").val();

    user={
        "userName":email,
        "userPassword":password
    }

    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/loging",
        method:"put",
        contentType: "application/json",
        data: JSON.stringify(user),
        success(resp){
            var i = resp.data
                if(i.custEmail==email & i.custPassword==password){
                    document.getElementsByClassName("dashboard-container")[0].style.display = "block"
                    document.getElementsByClassName("loging-Form-container")[0].style.display = "none"
                    document.getElementsByClassName("driver-dashboard-container")[0].style.display = "none"
                    $("#txtCustNICNumber1").val(i.custNICNumber);
                    $("#txtCustName1").val(i.custName);
                    $("#txtCustAddress1").val(i.custAddress);
                    $("#txtContactNumber1").val(i.custContact);
                    $("#txtCustEmail1").val(i.custEmail);
                    $("#txtCustPassword1").val(i.custPassword);

                    nicImg=i.custNICImg
                    licenseImg=i.custdrivingImg

                    $("#custNICImg").css({
                        "background": `url(${"http://localhost:8080/Back_end_war_exploded/"+i.custNICImg})`,
                        "background-size": "cover",
                        "background-position":"center",
                        "height": "300px"
                    });
                    $("#custLicense").css({
                        "background": `url(${"http://localhost:8080/Back_end_war_exploded/"+i.custdrivingImg})`,
                        "background-size": "cover",
                        "background-position":"center",
                        "height": "300px"
                    });

                    return;

                }

        }
    });



}


$("#btn-login").click(function (){



    loging();

});


$("#btn-edit-customer").click(function (){


    var customer={
        "custNICNumber":$("#txtCustNICNumber1").val(),
        "custName":$("#txtCustName1").val(),
        "custAddress":$("#txtCustAddress1").val(),
        "custNICImg":nicImg,
        "custdrivingImg":licenseImg,
        "custContact":$("#txtContactNumber1").val(),
        "custEmail":$("#txtCustEmail1").val(),
        "custPassword":$("#txtCustPassword1").val(),
        "custStatus":"Approved",
        "type":"Customer",
    }



    $.ajax({
        url:"http://localhost:8080/Back_end_war_exploded/api/v1/customer",
        method:"put",
        contentType:"application/json",

        data:JSON.stringify(customer),
        success(resp){

         alert(resp.message)

        }
    });
});


