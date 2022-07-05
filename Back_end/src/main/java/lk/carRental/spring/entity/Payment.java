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
public class Payment {
    @Id
    private String paymentId;
    private String finalReturnDate;
    private double finalPrice;

    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "bookingId", referencedColumnName = "bookingId", nullable = false)
    private Booking bookingId;

    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "custNICNumber", referencedColumnName = "custNICNumber", nullable = false)
    private Customer custNICNumber;
}
