package lk.carRental.spring.service;

import lk.carRental.spring.dto.DriverScheduleDTO;
import lk.carRental.spring.dto.PaymentDTO;

import java.util.List;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
public interface PaymentService {

    public void savePayment(PaymentDTO entity);

    public void deletePayment(String id);

    public void updatePayment(PaymentDTO entity);

    public PaymentDTO searchPayment(String id);

    public List<PaymentDTO> getAllPayment();
}
