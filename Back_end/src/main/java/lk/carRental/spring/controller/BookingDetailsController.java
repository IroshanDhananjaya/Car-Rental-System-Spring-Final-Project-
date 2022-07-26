package lk.carRental.spring.controller;

import lk.carRental.spring.dto.BookingDetailsDTO;
import lk.carRental.spring.service.BookindDetailsService;
import lk.carRental.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil approvedBooking(@RequestBody BookingDetailsDTO dto){
        bookindDetailsService.updateBookingDetails(dto);
        return new ResponseUtil(200,"Booking Approved Successful",null);
    }

    @PutMapping(path = "Reject",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil RejectBooking(@RequestBody BookingDetailsDTO dto){
        bookindDetailsService.updateBookingDetails(dto);
        return new ResponseUtil(200,"Booking Reject Successful",null);
    }

}
