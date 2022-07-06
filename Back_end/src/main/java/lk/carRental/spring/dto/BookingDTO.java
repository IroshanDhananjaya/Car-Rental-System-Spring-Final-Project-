package lk.carRental.spring.dto;

import lk.carRental.spring.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class BookingDTO {
    private String bookingId;
    private String pickUpDate;
    private String returnDate;
    private Customer customer;
}
