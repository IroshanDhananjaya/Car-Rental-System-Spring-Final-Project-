package lk.carRental.spring.service.impl;

import lk.carRental.spring.dto.SystemUserDTO;
import lk.carRental.spring.entity.SystemUser;
import lk.carRental.spring.repo.SystemUserRepo;
import lk.carRental.spring.service.SystemUserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public class SystemUserServiceImpl implements SystemUserService {

   @Autowired
    SystemUserRepo systemUserRepo;

   @Autowired
    ModelMapper mapper;

    @Override
    public void saveSystemUser() {
        SystemUser systemUser=new SystemUser("001","Iroshan Dhananjaya","iroshandhananjaya@gmail.com","12345");
        SystemUser systemUser1=new SystemUser("002","Dhananjaya Egodawaththa","dhananjayaegodawaththa@gmail.com","12345");
        systemUserRepo.save(systemUser);
        systemUserRepo.save(systemUser1);
    }

    @Override
    public SystemUserDTO searchSystemUser(String id) {
        SystemUser user = systemUserRepo.findById(id).get();
        SystemUserDTO userDTO = mapper.map(user, SystemUserDTO.class);
        return userDTO;
    }
}
