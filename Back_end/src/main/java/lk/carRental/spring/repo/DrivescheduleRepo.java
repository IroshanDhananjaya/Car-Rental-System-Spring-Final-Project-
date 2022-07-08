package lk.carRental.spring.repo;

import lk.carRental.spring.entity.DriverSchedule;
import lk.carRental.spring.entity.VehicleSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface DrivescheduleRepo extends JpaRepository<DriverSchedule,String> {

    @Query(value = "select * from driverschedule where driverNICNumber=? ", nativeQuery = true)
    List<DriverSchedule> findAllDriversByIds(String driverNICNumber);
}
