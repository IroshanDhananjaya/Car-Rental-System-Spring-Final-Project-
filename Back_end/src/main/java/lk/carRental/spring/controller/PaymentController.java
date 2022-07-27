package lk.carRental.spring.controller;

import lk.carRental.spring.dto.DriverScheduleDTO;
import lk.carRental.spring.dto.PaymentDTO;
import lk.carRental.spring.service.PaymentService;
import lk.carRental.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/

@RestController
@RequestMapping("api/v1/payment")
@CrossOrigin
public class PaymentController {

    @Autowired
    PaymentService paymentService;



    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil addPayment(@RequestBody PaymentDTO dto){
        paymentService.savePayment(dto);
        return new ResponseUtil(200,"Payment Successful",null);
    }
}
