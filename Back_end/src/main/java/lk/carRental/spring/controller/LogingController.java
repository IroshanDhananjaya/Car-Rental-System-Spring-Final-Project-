package lk.carRental.spring.controller;

import lk.carRental.spring.dto.BookingDetailsDTO;
import lk.carRental.spring.dto.CustomerDTO;
import lk.carRental.spring.dto.UserDTO;
import lk.carRental.spring.service.CustomerService;
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


    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil cheakLoging(@RequestBody UserDTO userDTO){
        CustomerDTO customerDTO = customerService.getCustomerForLoging(userDTO);
        return new ResponseUtil(200,"OK",customerDTO);
    }
}

