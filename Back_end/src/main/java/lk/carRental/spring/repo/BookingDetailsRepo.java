package lk.carRental.spring.repo;

import lk.carRental.spring.entity.BookingDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface BookingDetailsRepo extends JpaRepository<BookingDetails,String > {


    @Query(value = "select * from bookingdetails where bookingId=? ", nativeQuery = true)
    List<BookingDetails> findAllByIds(String bookingID);
}
