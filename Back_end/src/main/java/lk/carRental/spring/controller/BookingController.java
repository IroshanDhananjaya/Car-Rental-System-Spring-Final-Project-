package lk.carRental.spring.controller;

import lk.carRental.spring.dto.BookingDTO;
import lk.carRental.spring.dto.CustomerDTO;
import lk.carRental.spring.service.BookingService;
import lk.carRental.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
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


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseUtil registerCustomer(@RequestPart("loseDamageSlip") MultipartFile[] file, @RequestPart("booking") BookingDTO bookingDTO) {


        for (MultipartFile myFile : file) {

            try {
                String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
                File uploadsDir = new File(projectPath + "/uploads");
                uploadsDir.mkdir();
                myFile.transferTo(new File(uploadsDir.getAbsolutePath() + "/" + myFile.getOriginalFilename()));
                System.out.println(projectPath);
            } catch (IOException | URISyntaxException e) {
                e.printStackTrace();
                return new ResponseUtil(500, "Registration Failed.Try Again Latter", null);
            }
        }






        bookingService.saveBooking(bookingDTO);
        return new ResponseUtil(200,"Booking Saved",null);
    }




/*    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil addBooking(@RequestBody BookingDTO bookingDTO){
       bookingService.saveBooking(bookingDTO);
        return new ResponseUtil(200,"Booking saved",null);
    }*/

    @GetMapping(params = {"bookingId"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getBooking(@RequestParam String bookingId){
        BookingDTO bookingDTO = bookingService.searchBooking(bookingId);
        return new ResponseUtil(200,"OK",bookingDTO);
    }

    @GetMapping
    public ResponseUtil getAllBookins(){
        List<BookingDTO> allBooking = bookingService.getAllBooking();
        return new ResponseUtil(200,"OK",allBooking);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateBooking(@RequestBody BookingDTO bookingDTO){
        bookingService.updateBooking(bookingDTO);
        return new ResponseUtil(200,"Booking is Updated",null);

    }
    @GetMapping(path = "/lastID/rentID")
    public ResponseUtil getLastRid() {
        String lastRid = bookingService.getLastRid();
        return new ResponseUtil(200,"Booking is Updated",lastRid);
    }

}
