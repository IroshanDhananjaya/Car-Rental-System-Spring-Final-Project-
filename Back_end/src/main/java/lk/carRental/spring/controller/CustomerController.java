package lk.carRental.spring.controller;

import lk.carRental.spring.dto.CustomerDTO;
import lk.carRental.spring.service.CustomerService;
import lk.carRental.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@RestController
@RequestMapping("api/v1/customer")
@CrossOrigin
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseUtil saveCustomer(@RequestPart("files") MultipartFile[] files,@RequestPart("customer")CustomerDTO dto){
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
        customerService.saveCustomer(dto);
        return new ResponseUtil(200,"Customer Saved",null);
    }

//    @PostMapping
//   public ResponseUtil saveCustomer(@ModelAttribute CustomerDTO dto){
//        customerService.saveCustomer(dto);
//        return new ResponseUtil(200,"Customer Saved",null);
//    }


    @DeleteMapping(params = {"id"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteCustomer(@RequestParam String id){

       customerService.deleteCustomer(id);
       return new ResponseUtil(200,"Deleted",null);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateCustomer(@RequestBody CustomerDTO dto){
        customerService.updateCustomer(dto);
        return new ResponseUtil(200,"Customer Updated",null);

    }


    @GetMapping(params = {"id"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCustomer(@RequestParam String id){
        CustomerDTO customerDTO = customerService.searchCustomer(id);
        return new ResponseUtil(200,"OK",customerDTO);
    }

    @GetMapping
    public ResponseUtil getAllCustomers(){
        List<CustomerDTO> allCustomer = customerService.getAllCustomer();
        return new ResponseUtil(200,"OK",allCustomer);
    }
}
