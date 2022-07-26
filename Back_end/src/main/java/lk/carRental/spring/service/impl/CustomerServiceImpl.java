package lk.carRental.spring.service.impl;

import lk.carRental.spring.dto.CustomerDTO;
import lk.carRental.spring.dto.UserDTO;
import lk.carRental.spring.entity.Customer;
import lk.carRental.spring.repo.CustomerRepo;
import lk.carRental.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    ModelMapper mapper;

    public void saveCustomer(CustomerDTO dto) {
        if(!customerRepo.existsById(dto.getCustNICNumber())){
            Customer customer = mapper.map(dto, Customer.class);
            customerRepo.save(customer);
        }else {
            throw new RuntimeException("This NIC Number Already Exist..!");
        }

    }

    public void deleteCustomer(String id) {

        if(customerRepo.existsById(id)){
            customerRepo.deleteById(id);
        }else {
            throw new RuntimeException("Invalid NIC Number Try Again..!");
        }
    }

    public void updateCustomer(CustomerDTO entity) {
        if(customerRepo.existsById(entity.getCustNICNumber())){
            Customer customer = mapper.map(entity, Customer.class);
            customerRepo.save(customer);
        }else {
            throw new RuntimeException("Invalid NIC Number Try Again..!");
        }
    }

    public CustomerDTO searchCustomer(String id) {
        Customer customer = customerRepo.findById(id).get();
        CustomerDTO customerDTO = mapper.map(customer, CustomerDTO.class);
        return customerDTO;
    }

    public CustomerDTO getCustomerForLoging(UserDTO userDTO) {
        List<Customer> all=customerRepo.findAll();
        for (Customer c:all) {
            if(c.getCustEmail().equals(userDTO.getUserName())&c.getCustPassword().equals(userDTO.getUserPassword())){
                return new CustomerDTO(c.getCustNICNumber(),c.getCustName(),c.getCustAddress(),c.getCustNICImg(),c.getCustdrivingImg(),c.getCustContact(),c.getCustEmail(),c.getCustPassword(),c.getCustStatus(),c.getType());
            }
        }
        return null;
    }

    public List<CustomerDTO> getAllCustomer() {
        List<Customer> all=customerRepo.findAll();
        return mapper.map(all,new TypeToken<List<CustomerDTO>>(){}.getType());

    }

}
