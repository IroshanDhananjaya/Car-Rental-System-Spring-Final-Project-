package lk.carRental.spring.service.impl;

import lk.carRental.spring.dto.CustomerDTO;
import lk.carRental.spring.dto.DriverScheduleDTO;
import lk.carRental.spring.entity.Customer;
import lk.carRental.spring.entity.DriverSchedule;
import lk.carRental.spring.repo.DrivescheduleRepo;
import lk.carRental.spring.service.DriverScheduleService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@Service
public class DriverScheduleServiceImpl implements DriverScheduleService {

    @Autowired
    DrivescheduleRepo drivescheduleRepo;

    @Autowired
    ModelMapper mapper;

    public void saveDriverSchedule(DriverScheduleDTO entity) {
        DriverSchedule driverSchedule = mapper.map(entity, DriverSchedule.class);
        drivescheduleRepo.save(driverSchedule);
    }

    public void deleteDriverSchedule(String id) {
        if(drivescheduleRepo.existsById(id)){
            drivescheduleRepo.deleteById(id);
        }
    }

    public void updateDriverSchedule(DriverScheduleDTO entity) {


    }

    public DriverScheduleDTO searchDriverSchedule(String id) {
        DriverSchedule driverSchedule = drivescheduleRepo.findById(id).get();
        DriverScheduleDTO scheduleDTO = mapper.map(driverSchedule, DriverScheduleDTO.class);
        return scheduleDTO;
    }

    public List<DriverScheduleDTO> getAllDriverSchedule() {
        List<DriverSchedule> all=drivescheduleRepo.findAll();
        return mapper.map(all,new TypeToken<List<DriverScheduleDTO>>(){}.getType());
    }
}
