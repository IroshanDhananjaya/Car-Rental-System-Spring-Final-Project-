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
public class CustomerDTO {

    private String custNICNumber;
    private String custName;
    private String custAddress;
    private String custNICImg;
    private String custdrivingImg;
    private String custContact;
    private String custEmail;
    private String custPassword;
    private String custStatus;
    private String type;
}
