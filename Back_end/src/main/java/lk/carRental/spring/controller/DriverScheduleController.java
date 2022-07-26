package lk.carRental.spring.controller;

import lk.carRental.spring.dto.BookingDetailsDTO;
import lk.carRental.spring.dto.DriverDTO;
import lk.carRental.spring.dto.DriverScheduleDTO;
import lk.carRental.spring.service.DriverScheduleService;
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
@RequestMapping("api/v1/driverSchedule")
@CrossOrigin
public class DriverScheduleController {

    @Autowired
    DriverScheduleService driverScheduleService;

   /* @DeleteMapping(params = {"id"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteDriverschedule(@RequestParam String id){
        driverScheduleService.deleteDriverSchedule(id);
        return new ResponseUtil(200,"Deleted",null);
    }*/



    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil addDriverSchedule(@RequestBody DriverScheduleDTO dto){
        driverScheduleService.updateDriverSchedule(dto);
        return new ResponseUtil(200,"OK",null);
    }

    @GetMapping(params = {"id"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getDriverSchedule(@RequestParam String id){
        DriverScheduleDTO dto = driverScheduleService.searchDriverSchedule(id);
        return new ResponseUtil(200,"OK",dto);
    }

    @GetMapping
    public ResponseUtil getAllDriverSchedule(){
        List<DriverScheduleDTO> allDriverSchedule = driverScheduleService.getAllDriverSchedule();
        return new ResponseUtil(200,"OK",allDriverSchedule);
    }

    @PutMapping(path = "freeDriverSchedule",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil freeDriverSchedule(@RequestBody DriverScheduleDTO dto){
        driverScheduleService.updateDriverSchedule(dto);
        return new ResponseUtil(200,"OK",null);
    }

    @DeleteMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil RemovDriverSchedule(@RequestBody DriverScheduleDTO dto){
        driverScheduleService.deleteDriverSchedule(dto);
        return new ResponseUtil(200,"OK",null);
    }
}
