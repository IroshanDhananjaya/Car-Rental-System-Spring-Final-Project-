package lk.carRental.spring.controller;

import lk.carRental.spring.dto.DriverDTO;
import lk.carRental.spring.dto.VehicleDTO;
import lk.carRental.spring.service.VehicleService;
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
@RequestMapping("api/v1/vehicle")
public class VehicleController {

    @Autowired
    VehicleService vehicleService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil addVehicle(@RequestBody VehicleDTO dto){
        System.out.println(dto.getVehicleStatus());
        vehicleService.saveVehicle(dto);
        return new ResponseUtil(200,"Vehicle Saved",null);

    }


    @DeleteMapping(params = {"id"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteVehicle(@RequestParam String id){

        vehicleService.deleteVehicle(id);
        return new ResponseUtil(200,"Deleted",null);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateVehicle(@RequestBody VehicleDTO dto){
        vehicleService.updateVehicle(dto);
        return new ResponseUtil(200,"Vehicle Updated",null);

    }


    @GetMapping(params = {"id"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getVehicle(@RequestParam String id){
        VehicleDTO dto = vehicleService.searchVehicle(id);
        return new ResponseUtil(200,"OK",dto);
    }

    @GetMapping
    public ResponseUtil getAllVehicles(){
        List<VehicleDTO> allDrivers = vehicleService.getAllVehicle();
        return new ResponseUtil(200,"OK",allDrivers);
    }

}
