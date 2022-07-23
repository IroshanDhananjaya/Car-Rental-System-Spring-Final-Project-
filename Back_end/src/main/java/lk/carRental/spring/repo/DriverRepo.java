package lk.carRental.spring.repo;

import lk.carRental.spring.entity.BookingDetails;
import lk.carRental.spring.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface DriverRepo extends JpaRepository<Driver,String> {

    @Query(value = " select * from driver order by rand() limit 1; ", nativeQuery = true)
    Driver findDriverRandomly();
}
