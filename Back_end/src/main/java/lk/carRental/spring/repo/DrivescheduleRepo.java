package lk.carRental.spring.repo;

import lk.carRental.spring.entity.DriverSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface DrivescheduleRepo extends JpaRepository<DriverSchedule,String> {
}
