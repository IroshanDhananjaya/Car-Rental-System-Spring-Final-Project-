package lk.carRental.spring.service.impl;

import lk.carRental.spring.dto.BookingDTO;
import lk.carRental.spring.dto.BookingDetailsDTO;
import lk.carRental.spring.dto.CustomerDTO;
import lk.carRental.spring.dto.DriverDTO;
import lk.carRental.spring.entity.*;
import lk.carRental.spring.repo.*;
import lk.carRental.spring.service.BookingService;
import lk.carRental.spring.service.DriverService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    @Autowired
    BookingRepo bookingRepo;

    @Autowired
    BookingDetailsRepo bookingDetailsRepo;

    @Autowired
    DriverRepo driverRepo;

    @Autowired
    VehicleRepo vehicleRepo;

    @Autowired
    VehicleScheduleRepo vehicleScheduleRepo;

    @Autowired
    DrivescheduleRepo drivescheduleRepo;

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    DriverService driverService;

    @Autowired
    ModelMapper mapper;


    public void saveBooking(BookingDTO entity) {
        if(!bookingRepo.existsById(entity.getBookingId())){
            Customer customer = customerRepo.findById(entity.getCustomer()).get();
            Booking booking=new Booking(
                    entity.getBookingId(),
                    customer
            );

            Booking IsBooking = bookingRepo.save(booking);

            if(IsBooking!=null){
                for (BookingDetailsDTO detailsDTO:entity.getBookingDetails()) {
                   /* Booking booking1 = bookingRepo.findById(detailsDTO.getBookingId()).get();*/
                    BookingDetails bookingDetails=new BookingDetails(
                            detailsDTO.getPickUpDate(),
                            detailsDTO.getReturnDate(),
                            detailsDTO.getLoseDamageStatus(),
                            "uploads/"+detailsDTO.getLoseDamageImg(),
                            "Not Approved",
                            booking

                    );

                    BookingDetails IsBookingDetails = bookingDetailsRepo.save(bookingDetails);

                    if(IsBookingDetails!=null) {

                        System.out.println(detailsDTO.getDriverNICNumber());
                        if(detailsDTO.getDriverNICNumber().equals("Assign")){
                            Driver driver=mapper.map( driverService.getRandomDriver(),Driver.class);


                            DriverSchedule driverSchedule = new DriverSchedule(
                                    detailsDTO.getPickUpDate(),
                                    detailsDTO.getReturnDate(),
                                    "On Work",
                                    IsBookingDetails,
                                    driver
                                    );
                                    DriverSchedule IsDriverSchedule = drivescheduleRepo.save(driverSchedule);
                                }
                        if (IsBookingDetails != null) {
                                    Vehicle vehicle = vehicleRepo.findById(detailsDTO.getVehicleNumber()).get();
                                    VehicleSchedule vehicleSchedule = new VehicleSchedule(
                                            detailsDTO.getPickUpDate(),
                                            detailsDTO.getReturnDate(),
                                            "On Booking",
                                            IsBookingDetails,
                                            vehicle
                                    );
                                    vehicleScheduleRepo.save(vehicleSchedule);
                                }
                            }


                }
            }
        }else {
            throw new RuntimeException("This Booking ID is Already Exist !");
        }

    }

    public void deleteBooking(String id) {

    }

   public void updateBooking(BookingDTO entity) {
      /*   if(bookingRepo.existsById(entity.getBookingId())){
            if(entity.getBookingStatus().equals("Rejected")){
                Booking booking = bookingRepo.findById(entity.getBookingId()).get();
                booking.setBookingStatus(entity.getBookingStatus());

                Booking IsBooking = bookingRepo.save(booking);

                if(IsBooking!=null){
                    List<BookingDetails> allByIds = bookingDetailsRepo.findAllByIds(entity.getBookingId());
                    for (BookingDetails details:allByIds) {
                        BookingDetails bookingDetails=details;
                        bookingDetails.setDetailsStatus("Rejected");
                        BookingDetails details1 = bookingDetailsRepo.save(bookingDetails);

                        if (details1!=null){
                            Vehicle vehicle = vehicleRepo.findById(details.getVehicleNumber().getVehicleNumber()).get();
                            vehicle.setVehicleStatus("Not Use");
                            Vehicle vehicle1 = vehicleRepo.save(vehicle);

                            if (vehicle1!=null){
                                List<VehicleSchedule> allVehicleByIds = vehicleScheduleRepo.findAllVehicleByIds(details.getVehicleNumber().getVehicleNumber());
                                for (VehicleSchedule scheduleDetails:allVehicleByIds) {
                                    if(entity.getPickUpDate().equals(scheduleDetails.getVehicleStartDate())&entity.getReturnDate().equals(scheduleDetails.getVehicleEndDate())){
                                        scheduleDetails.setVehicleScheduleStatus("Cancel");
                                        vehicleScheduleRepo.save(scheduleDetails);
                                    }
                                }

                            }
                            List<DriverSchedule> allDriversByIds = drivescheduleRepo.findAllDriversByIds(details.getDriverNICNumber().getDriverNICNumber());
                            for (DriverSchedule driverScheduleDetails:allDriversByIds) {
                                if(entity.getPickUpDate().equals(driverScheduleDetails.getDriverStartDate())&entity.getReturnDate().equals(driverScheduleDetails.getDriverEndDate())){
                                    driverScheduleDetails.setDriverScheduleStatus("Cancel");
                                    drivescheduleRepo.save(driverScheduleDetails);
                                }
                            }
                        }

                    }



                }



            }else if(entity.getBookingStatus().equals("Approved")){
                Booking booking = bookingRepo.findById(entity.getBookingId()).get();
                booking.setBookingStatus("Pending Payment");

                Booking IsBooking = bookingRepo.save(booking);
                if(IsBooking!=null){
                    List<BookingDetails> all = bookingDetailsRepo.findAllByIds(entity.getBookingId());
                    for (BookingDetails details:all) {
                        BookingDetails bookingDetails=details;
                        bookingDetails.setDetailsStatus("Pending Payment");
                        bookingDetailsRepo.save(bookingDetails);
                    }
                }
            }
        }else {
            throw new RuntimeException("No such Booking! Try Again....!");
       }
*/
}

    public BookingDTO searchBooking(String id) {
        Booking booking = bookingRepo.findById(id).get();
        BookingDTO bookingDTO = mapper.map(booking, BookingDTO.class);
        return bookingDTO;
    }

    public List<BookingDTO> getAllBooking() {
        List<Booking> all=bookingRepo.findAll();
        return mapper.map(all,new TypeToken<List<BookingDTO>>(){}.getType());
    }

    @Override
    public String getLastRid() {
        return bookingRepo.getLastID();
    }
}
