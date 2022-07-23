package lk.carRental.spring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

public class BookingDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingDetailsId;
    private double loseDamageStatus;
    private String loseDamageImg;
    private String detailsStatus;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "bookingId",referencedColumnName = "bookingId")
    private Booking bookingId;



    public BookingDetails(double loseDamageStatus, String loseDamageImg, String detailsStatus, Booking bookingId) {
        this.loseDamageStatus = loseDamageStatus;
        this.loseDamageImg = loseDamageImg;
        this.detailsStatus = detailsStatus;
        this.bookingId = bookingId;

    }
}
