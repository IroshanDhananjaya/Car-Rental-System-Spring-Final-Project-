package lk.carRental.spring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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



    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "custNICNumber", referencedColumnName = "custNICNumber", nullable = false)
    private Customer customer;

    @OneToMany(mappedBy = "bookingId")
    @JsonIgnore
    private List<BookingDetails> bookingDetails = new ArrayList<>();

    public Booking(String bookingId, Customer customer) {
        this.bookingId = bookingId;
        this.customer = customer;
    }
}
