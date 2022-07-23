package lk.carRental.spring.controller;

import lk.carRental.spring.dto.CustomerDTO;
import lk.carRental.spring.dto.DriverDTO;
import lk.carRental.spring.dto.VehicleDTO;
import lk.carRental.spring.service.VehicleService;
import lk.carRental.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@RestController
@RequestMapping("api/v1/vehicle")
@CrossOrigin
public class VehicleController {

    @Autowired
    VehicleService vehicleService;


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseUtil registerCustomer(@RequestPart("vImgFile") MultipartFile[] file, @RequestPart("vehicle") VehicleDTO vehicleDTO) {


        for (MultipartFile myFile : file) {

            try {
                String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
                File uploadsDir = new File(projectPath + "/uploads");
                uploadsDir.mkdir();
                myFile.transferTo(new File(uploadsDir.getAbsolutePath() + "/" + myFile.getOriginalFilename()));
                System.out.println(projectPath);
            } catch (IOException | URISyntaxException e) {
                e.printStackTrace();
                return new ResponseUtil(500, "Registration Failed.Try Again Latter", null);
            }
        }



        vehicleDTO.setVehicleFontImage("uploads/" + vehicleDTO.getVehicleFontImage());
        vehicleDTO.setVehicleBackImage("uploads/" + vehicleDTO.getVehicleBackImage());

        vehicleService.saveVehicle(vehicleDTO);
        return new ResponseUtil(200,"Vehicle Saved",null);
    }



  /*  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil addVehicle(@RequestBody VehicleDTO dto){
        System.out.println(dto.getVehicleStatus());
        vehicleService.saveVehicle(dto);
        return new ResponseUtil(200,"Vehicle Saved",null);

    }
*/
/*  @PutMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},produces = {MediaType.APPLICATION_JSON_VALUE})
  public ResponseUtil updateVehicle(@RequestPart("vImgFile") MultipartFile[] files, @RequestPart("vehicle") VehicleDTO dto){
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
      vehicleService.updateVehicle(dto);
      return new ResponseUtil(200,"Vehicle Saved",null);
  }*/

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
