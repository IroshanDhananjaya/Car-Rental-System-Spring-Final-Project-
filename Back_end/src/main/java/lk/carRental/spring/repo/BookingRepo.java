package lk.carRental.spring.repo;

import lk.carRental.spring.dto.BookingDetailsDTO;
import lk.carRental.spring.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface BookingRepo extends JpaRepository<Booking,String> {


    @Query(value = "SELECT bookingId FROM booking ORDER BY bookingId DESC LIMIT 1", nativeQuery = true)
    String getLastID();


}
