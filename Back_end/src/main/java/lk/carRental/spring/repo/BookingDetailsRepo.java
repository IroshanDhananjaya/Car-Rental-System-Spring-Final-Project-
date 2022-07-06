package lk.carRental.spring.repo;

import lk.carRental.spring.entity.BookingDetails;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface BookingDetailsRepo extends JpaRepository<BookingDetails,String > {
}
