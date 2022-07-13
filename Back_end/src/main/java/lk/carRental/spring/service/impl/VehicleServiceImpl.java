package lk.carRental.spring.service.impl;

import lk.carRental.spring.dto.DriverDTO;
import lk.carRental.spring.dto.VehicleDTO;
import lk.carRental.spring.entity.Driver;
import lk.carRental.spring.entity.Vehicle;
import lk.carRental.spring.repo.VehicleRepo;
import lk.carRental.spring.service.VehicleService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    VehicleRepo vehicleRepo;

    @Autowired
    ModelMapper mapper;

    public void saveVehicle(VehicleDTO entity) {
        if(!vehicleRepo.existsById(entity.getVehicleNumber())) {
            Vehicle vehicle = mapper.map(entity, Vehicle.class);
            vehicleRepo.save(vehicle);
        }else {
            throw new RuntimeException("This Vehicle Number Already Exist..!");
        }
    }

    public void deleteVehicle(String id) {
        if(vehicleRepo.existsById(id)){
            vehicleRepo.deleteById(id);
        }
        else {
            throw new RuntimeException("Invalid Vehicle Number Try Again..!");
        }

    }

    public void updateVehicle(VehicleDTO entity) {
        if(vehicleRepo.existsById(entity.getVehicleNumber())){
            Vehicle vehicle = mapper.map(entity, Vehicle.class);
            vehicleRepo.save(vehicle);
        }else {
            throw new RuntimeException("Invalid Vehicle Number Try Again..!");
        }

    }

    public VehicleDTO searchVehicle(String id) {
        Vehicle vehicle = vehicleRepo.findById(id).get();
        VehicleDTO vehicleDTO = mapper.map(vehicle, VehicleDTO.class);
        return vehicleDTO;
    }

    public List<VehicleDTO> getAllVehicle() {
        List<Vehicle> all=vehicleRepo.findAll();
        return mapper.map(all,new TypeToken<List<VehicleDTO>>(){}.getType());
    }
}
