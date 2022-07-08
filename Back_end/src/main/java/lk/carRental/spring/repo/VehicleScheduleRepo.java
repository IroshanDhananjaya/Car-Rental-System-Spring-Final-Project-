package lk.carRental.spring.repo;

import lk.carRental.spring.entity.BookingDetails;
import lk.carRental.spring.entity.VehicleSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface VehicleScheduleRepo extends JpaRepository<VehicleSchedule,String> {

    @Query(value = "select * from vehicleschedule where vehicleNumber=? ", nativeQuery = true)
    List<VehicleSchedule> findAllVehicleByIds(String vehicleNumber);
}
