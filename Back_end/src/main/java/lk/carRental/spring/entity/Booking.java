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
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
@Entity
public class Booking {
    @Id
    private String bookingId;
    private String pickUpDate;
    private String returnDate;

    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "custNICNumber", referencedColumnName = "custNICNumber", nullable = false)
    private Customer customer;
}
