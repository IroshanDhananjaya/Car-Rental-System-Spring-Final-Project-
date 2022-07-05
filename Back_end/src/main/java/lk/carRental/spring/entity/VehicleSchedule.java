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
public class VehicleSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vehicleScheduleId;
    private String vehicleStartDate;
    private String vehicleEndDate;
    private String vehicleScheduleStatus;

    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "vehicleNumber", referencedColumnName = "vehicleNumber", nullable = false)
    private Vehicle vehicleNumber;
}
