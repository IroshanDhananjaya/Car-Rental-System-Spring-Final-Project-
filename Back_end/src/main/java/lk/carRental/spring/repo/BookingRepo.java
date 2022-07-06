package lk.carRental.spring.repo;

import lk.carRental.spring.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface BookingRepo extends JpaRepository<Booking,String> {
}
