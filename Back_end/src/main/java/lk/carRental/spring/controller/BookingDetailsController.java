package lk.carRental.spring.controller;

import lk.carRental.spring.dto.BookingDetailsDTO;
import lk.carRental.spring.service.BookindDetailsService;
import lk.carRental.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@RestController
@RequestMapping("api/v1/bookingDetails")
@CrossOrigin
public class BookingDetailsController {

    @Autowired
    BookindDetailsService bookindDetailsService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllBookingDetails(){
        List<BookingDetailsDTO> allBookingDetails = bookindDetailsService.getAllBookingDetails();
        return new ResponseUtil(200,"OK",allBookingDetails);
    }
}
