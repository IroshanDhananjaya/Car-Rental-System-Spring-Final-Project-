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
public class DriverSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int diverscheduleId;
    private String driverStartDate;
    private String driverEndDate;
    private String driverScheduleStatus;

    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "driverNICNumber", referencedColumnName = "driverNICNumber", nullable = false)
    private Driver driverId;

    public DriverSchedule(String driverStartDate, String driverEndDate, String driverScheduleStatus, Driver driverId) {
        this.driverStartDate = driverStartDate;
        this.driverEndDate = driverEndDate;
        this.driverScheduleStatus = driverScheduleStatus;
        this.driverId = driverId;
    }
}
