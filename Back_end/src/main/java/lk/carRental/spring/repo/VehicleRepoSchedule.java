package lk.carRental.spring.repo;

import lk.carRental.spring.entity.VehicleSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface VehicleRepoSchedule extends JpaRepository<VehicleSchedule,String> {
}
