package lk.carRental.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class DriverDTO {

    private String driverNICNumber;
    private String driverName;
    private String driverAddress;
    private String driverContact;
    private String driverEmail;
    private String driverPassword;
    private String driverLicenseImg;
    private String diverLicenseNumber;
}
