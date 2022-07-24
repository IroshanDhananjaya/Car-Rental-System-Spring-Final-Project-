package lk.carRental.spring.service.impl;

import lk.carRental.spring.dto.BookingDetailsDTO;
import lk.carRental.spring.entity.Booking;
import lk.carRental.spring.entity.BookingDetails;
import lk.carRental.spring.repo.BookingDetailsRepo;
import lk.carRental.spring.service.BookindDetailsService;
import lk.carRental.spring.service.BookingService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@Service
public class BookingDetailsServiceImpl implements BookindDetailsService {

    @Autowired
    BookingDetailsRepo bookingDetailsRepo;

    @Autowired
    ModelMapper mapper;

    public void saveBookingDetails(BookingDetailsDTO entity) {

    }

    public void deleteBookingDetails(String id) {

    }

    public void updateBookingDetails(BookingDetailsDTO entity) {


    }

    public BookingDetailsDTO searchBookingDetails(String id) {
        return null;
    }

    public List<BookingDetailsDTO> getAllBookingDetails() {

        List<BookingDetails> all = bookingDetailsRepo.findAll();
        return mapper.map(all, new TypeToken<List<BookingDetailsDTO>>() {
        }.getType());
    }


}
