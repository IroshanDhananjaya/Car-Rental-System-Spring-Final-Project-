package lk.carRental.spring.controller;

import lk.carRental.spring.dto.BookingDTO;
import lk.carRental.spring.service.BookingService;
import lk.carRental.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@RestController
@RequestMapping("api/v1/booking")
@CrossOrigin
public class BookingController {

    @Autowired
    BookingService bookingService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil addBooking(@RequestBody BookingDTO bookingDTO){
       bookingService.saveBooking(bookingDTO);
        return new ResponseUtil(200,"Booking saved",null);
    }

    @GetMapping(params = {"bookingId"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getBooking(@RequestParam String bookingId){
        BookingDTO bookingDTO = bookingService.searchBooking(bookingId);
        return new ResponseUtil(200,"OK",bookingDTO);
    }

    @GetMapping(params = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllBookins(){
        List<BookingDTO> allBooking = bookingService.getAllBooking();
        return new ResponseUtil(200,"OK",allBooking);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateBooking(@RequestBody BookingDTO bookingDTO){
        bookingService.updateBooking(bookingDTO);
        return new ResponseUtil(200,"Booking is Updated",null);

    }
}
