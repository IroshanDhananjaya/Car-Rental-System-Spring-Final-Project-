package lk.carRental.spring.service;

import lk.carRental.spring.dto.DriverDTO;
import lk.carRental.spring.dto.SystemUserDTO;
import lk.carRental.spring.dto.UserDTO;

import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface SystemUserService {

    public void saveSystemUser();


    public SystemUserDTO searchSystemUser(String id);

    SystemUserDTO getAdminForLoging(UserDTO userDTO);


}
