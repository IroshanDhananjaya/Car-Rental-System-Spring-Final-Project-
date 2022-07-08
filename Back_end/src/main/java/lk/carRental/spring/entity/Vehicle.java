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
public class Vehicle {

    @Id
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
