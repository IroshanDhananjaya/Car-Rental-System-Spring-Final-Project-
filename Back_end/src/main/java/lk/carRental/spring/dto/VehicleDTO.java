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
public class VehicleDTO {

    private String vehicleNumber;
    private String vehicleType;
    private String vehicleBrand;
    private String trasmissionType;
    private String vehicleFuelType;
    private int noOfPassenger;
    private String colour;
    private double dailyRent;
    private double monthlyRent;
    private double priceForKM;
    private double priceForExtraKM;
    private String vehicleFontImage;
    private String vehicleBackImage;
    private String vehicleStatus;
}
