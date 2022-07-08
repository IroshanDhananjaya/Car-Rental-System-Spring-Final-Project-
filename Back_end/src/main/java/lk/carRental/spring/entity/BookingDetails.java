package lk.carRental.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
public class BookingDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingDetailsId;
    private double loseDamageStatus;
    private String loseDamageImg;
    private String detailsStatus;

    @ManyToOne
    @JoinColumn(name = "bookingId",referencedColumnName = "bookingId")
    private Booking bookingId;

    @ManyToOne
    @JoinColumn(name = "vehicleNumber",referencedColumnName = "vehicleNumber")
    private Vehicle vehicleNumber;

    @ManyToOne
    @JoinColumn(name = "driverNICNumber",referencedColumnName = "driverNICNumber")
    private Driver driverNICNumber;


    public BookingDetails(double loseDamageStatus, String loseDamageImg, String detailsStatus, Booking bookingId, Vehicle vehicleNumber, Driver driverNICNumber) {
        this.loseDamageStatus = loseDamageStatus;
        this.loseDamageImg = loseDamageImg;
        this.detailsStatus = detailsStatus;
        this.bookingId = bookingId;
        this.vehicleNumber = vehicleNumber;
        this.driverNICNumber = driverNICNumber;
    }
}
