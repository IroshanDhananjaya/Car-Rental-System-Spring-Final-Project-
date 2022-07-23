package lk.carRental.spring.controller;

import lk.carRental.spring.dto.CustomerDTO;
import lk.carRental.spring.dto.DriverDTO;
import lk.carRental.spring.service.DriverService;
import lk.carRental.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@RestController
@RequestMapping("api/v1/driver")
@CrossOrigin
public class DriverController {

    @Autowired
    DriverService driverService;


    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseUtil saveDriver(@RequestPart("Driverfiles") MultipartFile[] files, @RequestPart("driver")DriverDTO dto){
        for(MultipartFile file:files){
            String projectPath=new File("E:/IJSE/GDSE57/Spring_Final_Project").getParentFile().getParentFile().getAbsolutePath();
            File uploadDir=new File(projectPath+"/uploads");
            uploadDir.mkdir();


            try {
                file.transferTo(new File(uploadDir.getAbsolutePath()+"/"+file.getOriginalFilename()));
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        driverService.saveDriver(dto);
        return new ResponseUtil(200,"Driver Saved",null);
    }


 /*   @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil addDriver(@RequestBody DriverDTO dto){
      *//*  DriverDTO driverDTO=dto;
        driverDTO.setDriver*//*
        driverService.saveDriver(dto);
        return new ResponseUtil(200,"Driver Saved",null);

    }*/


    @DeleteMapping(params = {"id"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteDriver(@RequestParam String id){

        driverService.deleteDriver(id);
        return new ResponseUtil(200,"Deleted",null);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateDriver(@RequestBody DriverDTO dto){
        driverService.updateDriver(dto);
        return new ResponseUtil(200,"Driver Updated",null);

    }
    @GetMapping(path = "randomDriver",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getDriverRandom(){
        DriverDTO dto = driverService.getRandomDriver();
        return new ResponseUtil(200,"OK",dto);
    }

    @GetMapping(params = {"id"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getDriver(@RequestParam String id){
        DriverDTO dto = driverService.searchDriver(id);
        return new ResponseUtil(200,"OK",dto);
    }

    @GetMapping
    public ResponseUtil getAllDrivers(){
        List<DriverDTO> allDrivers = driverService.getAllDriver();
        return new ResponseUtil(200,"OK",allDrivers);
    }

}
