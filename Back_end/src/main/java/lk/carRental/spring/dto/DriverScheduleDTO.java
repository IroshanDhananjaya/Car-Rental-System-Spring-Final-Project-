package lk.carRental.spring.dto;

import lk.carRental.spring.entity.Booking;
import lk.carRental.spring.entity.BookingDetails;
import lk.carRental.spring.entity.Driver;
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
public class DriverScheduleDTO {

    private int diverscheduleId;
    private String driverStartDate;
    private String driverEndDate;
    private String driverScheduleStatus;
    private BookingDetails bookingDetails;
    private Driver driverId;
}
