package lk.carRental.spring.service.impl;

import lk.carRental.spring.dto.BookingDTO;
import lk.carRental.spring.dto.VehicleScheduleDTO;
import lk.carRental.spring.entity.Booking;
import lk.carRental.spring.entity.DriverSchedule;
import lk.carRental.spring.entity.VehicleSchedule;
import lk.carRental.spring.repo.VehicleScheduleRepo;
import lk.carRental.spring.service.VehicleScheduleService;
import lombok.AllArgsConstructor;
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
public class VehicleScheduleServiceImpl implements VehicleScheduleService {

    @Autowired
    VehicleScheduleRepo vehicleScheduleRepo;

    @Autowired
    ModelMapper mapper;

    public void saveVehicleSchedule(VehicleScheduleDTO entity) {
        VehicleSchedule vehicleSchedule = mapper.map(entity, VehicleSchedule.class);
        vehicleScheduleRepo.save(vehicleSchedule);
    }

    public void deleteVehicleSchedule(String id) {
        if(vehicleScheduleRepo.existsById(id)){
            vehicleScheduleRepo.deleteById(id);
        }
    }

    public void updateVehicleSchedule(VehicleScheduleDTO entity) {

    }

    public VehicleScheduleDTO searchVehicleSchedule(String id) {

        VehicleSchedule vehicleSchedule = vehicleScheduleRepo.findById(id).get();
        VehicleScheduleDTO scheduleDTO = mapper.map(vehicleSchedule, VehicleScheduleDTO.class);
        return scheduleDTO;
    }

    public List<VehicleScheduleDTO> getAllVehicleSchedule() {
        List<VehicleSchedule> all=vehicleScheduleRepo.findAll();
        return mapper.map(all,new TypeToken<List<VehicleScheduleDTO>>(){}.getType());
    }
}
