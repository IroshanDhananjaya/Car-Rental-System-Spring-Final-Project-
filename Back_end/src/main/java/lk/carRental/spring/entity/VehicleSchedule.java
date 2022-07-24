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
public class VehicleSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vehicleScheduleId;
    private String vehicleStartDate;
    private String vehicleEndDate;
    private String vehicleScheduleStatus;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "bookingDetailsId",referencedColumnName = "bookingDetailsId")
    private BookingDetails bookingDetails;

    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "vehicleNumber", referencedColumnName = "vehicleNumber")
    private Vehicle vehicleNumber;

    public VehicleSchedule(String vehicleStartDate, String vehicleEndDate, String vehicleScheduleStatus, BookingDetails bookingDetails, Vehicle vehicleNumber) {
        this.vehicleStartDate = vehicleStartDate;
        this.vehicleEndDate = vehicleEndDate;
        this.vehicleScheduleStatus = vehicleScheduleStatus;
        this.bookingDetails = bookingDetails;
        this.vehicleNumber = vehicleNumber;
    }
}
