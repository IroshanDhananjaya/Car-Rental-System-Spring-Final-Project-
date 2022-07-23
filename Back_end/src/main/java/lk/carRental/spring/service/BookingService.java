package lk.carRental.spring.service;

import lk.carRental.spring.dto.BookingDTO;
import lk.carRental.spring.dto.BookingDetailsDTO;

import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface BookingService {
    public void saveBooking(BookingDTO entity);

    public void deleteBooking(String id);

    public void updateBooking(BookingDTO entity);

    public BookingDTO searchBooking(String id);

    public List<BookingDTO> getAllBooking();

    public String getLastRid();
}
