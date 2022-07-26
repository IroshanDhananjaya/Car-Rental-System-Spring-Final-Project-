package lk.carRental.spring.service;

import lk.carRental.spring.dto.BookingDTO;
import lk.carRental.spring.dto.CustomerDTO;
import lk.carRental.spring.dto.UserDTO;

import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface CustomerService {
    public void saveCustomer(CustomerDTO entity);

    public void deleteCustomer(String id);

    public void updateCustomer(CustomerDTO entity);

    public CustomerDTO getCustomerForLoging(UserDTO userDTO);

    public CustomerDTO searchCustomer(String id);

    public List<CustomerDTO> getAllCustomer();
}
