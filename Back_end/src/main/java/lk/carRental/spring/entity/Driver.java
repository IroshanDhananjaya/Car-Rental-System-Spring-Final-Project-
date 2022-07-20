package lk.carRental.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
public class Driver {

    @Id
    private String driverNICNumber;
    private String driverName;
    private String driverAddress;
    private String driverContact;
    private String driverEmail;
    private String driverPassword;
    private String driverLicenseImg;
    /*private String diverLicenseNumber;*/
    private String diverStatus;
}
