package lk.carRental.spring.controller;

import lk.carRental.spring.dto.*;
import lk.carRental.spring.service.CustomerService;
import lk.carRental.spring.service.DriverService;
import lk.carRental.spring.service.SystemUserService;
import lk.carRental.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@RestController
@RequestMapping("api/v1/loging")
@CrossOrigin
public class LogingController {

    @Autowired
    CustomerService customerService;

    @Autowired
    DriverService driverService;

    @Autowired
    SystemUserService userService;


    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil cheakLoging(@RequestBody UserDTO userDTO){
        userService.saveSystemUser();

        CustomerDTO customerDTO = customerService.getCustomerForLoging(userDTO);
        if(customerDTO==null){
            DriverDTO driverForLoging = driverService.getDriverForLoging(userDTO);
            if(driverForLoging==null){
                SystemUserDTO adminForLoging = userService.getAdminForLoging(userDTO);
                if (!(adminForLoging==null)){
                    return new ResponseUtil(200,"Admin",adminForLoging);
                }else {
                    return new ResponseUtil(200,"Incorrect user name and password",null);
                }
            }else {
                return new ResponseUtil(200,"Driver",driverForLoging);

            }
        }else {
            return new ResponseUtil(200,"Customer",customerDTO);
        }

    }
}

