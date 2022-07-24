package lk.carRental.spring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class DriverSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int diverscheduleId;
    private String driverStartDate;
    private String driverEndDate;
    private String driverScheduleStatus;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "bookingDetailsId",referencedColumnName = "bookingDetailsId")
    private BookingDetails bookingDetails;

    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "driverNICNumber", referencedColumnName = "driverNICNumber", nullable = false)
    private Driver driverId;

    public DriverSchedule(String driverStartDate, String driverEndDate, String driverScheduleStatus, BookingDetails bookingDetails, Driver driverId) {
        this.driverStartDate = driverStartDate;
        this.driverEndDate = driverEndDate;
        this.driverScheduleStatus = driverScheduleStatus;
        this.bookingDetails = bookingDetails;
        this.driverId = driverId;
    }
}
