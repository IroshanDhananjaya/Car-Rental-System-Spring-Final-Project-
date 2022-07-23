package lk.carRental.spring.service;

import lk.carRental.spring.dto.CustomerDTO;
import lk.carRental.spring.dto.DriverDTO;

import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface DriverService {
    public void saveDriver(DriverDTO entity);

    public void deleteDriver(String id);

    public void updateDriver(DriverDTO entity);

    public DriverDTO searchDriver(String id);

    public DriverDTO getRandomDriver();

    public List<DriverDTO> getAllDriver();
}
