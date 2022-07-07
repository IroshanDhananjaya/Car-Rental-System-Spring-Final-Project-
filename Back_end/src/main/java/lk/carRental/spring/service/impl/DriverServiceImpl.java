package lk.carRental.spring.service.impl;

import lk.carRental.spring.dto.CustomerDTO;
import lk.carRental.spring.dto.DriverDTO;
import lk.carRental.spring.entity.Customer;
import lk.carRental.spring.entity.Driver;
import lk.carRental.spring.repo.DriverRepo;
import lk.carRental.spring.service.DriverService;
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
public class DriverServiceImpl implements DriverService {

    @Autowired
    DriverRepo driverRepo;

    @Autowired
    ModelMapper mapper;

    public void saveDriver(DriverDTO entity) {
        Driver driver = mapper.map(entity, Driver.class);
        driverRepo.save(driver);
    }

    public void deleteDriver(String id) {
        if(driverRepo.existsById(id)){
            driverRepo.deleteById(id);
        }
    }

    public void updateDriver(DriverDTO entity) {
        if(driverRepo.existsById(entity.getDriverNICNumber())){
            Driver driver = mapper.map(entity, Driver.class);
            driverRepo.save(driver);
        }
    }

    public DriverDTO searchDriver(String id) {
        Driver driver = driverRepo.findById(id).get();
        DriverDTO driverDTO = mapper.map(driver, DriverDTO.class);
        return driverDTO;
    }

    public List<DriverDTO> getAllDriver() {
        List<Driver> all=driverRepo.findAll();
        return mapper.map(all,new TypeToken<List<DriverDTO>>(){}.getType());
    }
}
