package lk.carRental.spring.service;

import lk.carRental.spring.dto.BookingDetailsDTO;

import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface BookindDetailsService {

    public void saveBookingDetails(BookingDetailsDTO entity);

    public void deleteBookingDetails(String id);

    public void updateBookingDetails(BookingDetailsDTO entity);

    public BookingDetailsDTO searchBookingDetails(String id);

    public List<BookingDetailsDTO> getAllBookingDetails();


}
