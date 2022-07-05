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
public class Customer {

    @Id
    private String custNICNumber;
    private String custName;
    private String custAddress;
    private String custNICImg;
    private String custdrivingImg;
    private String custdrivingNumber;
    private String custContact;
    private String custEmail;
    private String custPassword;
    private String custStatus;
}
