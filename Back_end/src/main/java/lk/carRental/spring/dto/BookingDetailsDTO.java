package lk.carRental.spring.dto;

import lk.carRental.spring.entity.Booking;
import lk.carRental.spring.entity.Driver;
import lk.carRental.spring.entity.Vehicle;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Id;
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
public class BookingDetailsDTO {
    private int bookingDetailsId;
    private double loseDamageStatus;
    private String loseDamageImg;
    private String detailsStatus;
    private Booking bookingId;
    private Vehicle vehicleNumber;
    private Driver driverNICNumber;
}
