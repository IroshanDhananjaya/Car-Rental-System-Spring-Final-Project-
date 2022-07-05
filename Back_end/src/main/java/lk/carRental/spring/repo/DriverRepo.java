package lk.carRental.spring.repo;

import lk.carRental.spring.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface DriverRepo extends JpaRepository<Driver,String> {
}
