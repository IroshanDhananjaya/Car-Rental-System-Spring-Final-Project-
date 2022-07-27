package lk.carRental.spring.service.impl;

import lk.carRental.spring.dto.CustomerDTO;
import lk.carRental.spring.dto.PaymentDTO;
import lk.carRental.spring.entity.Customer;
import lk.carRental.spring.entity.Payment;
import lk.carRental.spring.repo.PaymentRepo;
import lk.carRental.spring.service.PaymentService;
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
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    PaymentRepo paymentRepo;

    @Autowired
    ModelMapper mapper;

    public void savePayment(PaymentDTO entity) {
        Payment payment = mapper.map(entity, Payment.class);
        paymentRepo.save(payment);
    }

    public void deletePayment(String id) {
        if(paymentRepo.existsById(id)){
            paymentRepo.deleteById(id);
        }
    }

    public void updatePayment(PaymentDTO entity) {
       /* if(paymentRepo.existsById(entity.getPaymentId())){
            Payment payment = mapper.map(entity, Payment.class);
            paymentRepo.save(payment);
        }*/
    }

    public PaymentDTO searchPayment(String id) {
        Payment payment = paymentRepo.findById(id).get();
        PaymentDTO paymentDTO = mapper.map(payment, PaymentDTO.class);
        return paymentDTO;
    }

    public List<PaymentDTO> getAllPayment() {
        List<Payment> all=paymentRepo.findAll();
        return mapper.map(all,new TypeToken<List<PaymentDTO>>(){}.getType());
    }
}
