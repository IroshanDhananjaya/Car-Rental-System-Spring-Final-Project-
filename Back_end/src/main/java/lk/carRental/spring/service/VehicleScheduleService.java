package lk.carRental.spring.service;

import lk.carRental.spring.dto.PaymentDTO;
import lk.carRental.spring.dto.VehicleScheduleDTO;


import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface VehicleScheduleService {

    public void saveVehicleSchedule(VehicleScheduleDTO entity);

    public void deleteVehicleSchedule(String id);

    public void updateVehicleSchedule(VehicleScheduleDTO entity);

    public VehicleScheduleDTO searchVehicleSchedule(String id);

    public List<VehicleScheduleDTO> getAllVehicleSchedule();
}
