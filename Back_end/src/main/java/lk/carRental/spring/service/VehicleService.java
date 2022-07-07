package lk.carRental.spring.service;

import lk.carRental.spring.dto.PaymentDTO;
import lk.carRental.spring.dto.VehicleDTO;


import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface VehicleService {

    public void saveVehicle(VehicleDTO entity);

    public void deleteVehicle(String id);

    public void updateVehicle(VehicleDTO entity);

    public VehicleDTO searchVehicle(String id);

    public List<VehicleDTO> getAllVehicle();
}
