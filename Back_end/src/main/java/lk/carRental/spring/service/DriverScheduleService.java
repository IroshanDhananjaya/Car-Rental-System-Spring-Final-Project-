package lk.carRental.spring.service;

import lk.carRental.spring.dto.CustomerDTO;
import lk.carRental.spring.dto.DriverScheduleDTO;

import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface DriverScheduleService {

    public void saveDriverSchedule(DriverScheduleDTO entity);

    public void deleteDriverSchedule(String id);

    public void updateDriverSchedule(DriverScheduleDTO entity);

    public DriverScheduleDTO searchDriverSchedule(String id);

    public List<DriverScheduleDTO> getAllDriverSchedule();
}
