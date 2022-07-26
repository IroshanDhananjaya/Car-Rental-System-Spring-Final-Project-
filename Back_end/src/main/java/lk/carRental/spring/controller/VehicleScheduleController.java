package lk.carRental.spring.controller;

import lk.carRental.spring.dto.DriverScheduleDTO;
import lk.carRental.spring.dto.VehicleScheduleDTO;
import lk.carRental.spring.service.DriverScheduleService;
import lk.carRental.spring.service.VehicleScheduleService;
import lk.carRental.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@RestController
@RequestMapping("api/v1/vehicleSchedule")
@CrossOrigin
public class VehicleScheduleController {
    @Autowired
    VehicleScheduleService vehicleScheduleService;

    @DeleteMapping(params = {"id"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteVehicleschedule(@RequestParam String id){

        vehicleScheduleService.deleteVehicleSchedule(id);
        return new ResponseUtil(200,"Deleted",null);
    }




    @GetMapping(params = {"id"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getVehicleSchedule(@RequestParam String id){
        VehicleScheduleDTO dto = vehicleScheduleService.searchVehicleSchedule(id);
        return new ResponseUtil(200,"OK",dto);
    }

    @GetMapping
    public ResponseUtil getAllDriverSchedule(){
        List<VehicleScheduleDTO> allVehicleSchedule = vehicleScheduleService.getAllVehicleSchedule();
        return new ResponseUtil(200,"OK",allVehicleSchedule);
    }

    @PutMapping(path = "freeVehicleSchedule",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil freeDriverSchedule(@RequestBody VehicleScheduleDTO dto){
        vehicleScheduleService.updateVehicleSchedule(dto);
        return new ResponseUtil(200,"OK",null);
    }


}
