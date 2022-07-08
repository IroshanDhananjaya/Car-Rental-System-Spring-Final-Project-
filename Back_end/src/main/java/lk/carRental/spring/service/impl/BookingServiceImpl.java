package lk.carRental.spring.service.impl;

import lk.carRental.spring.dto.BookingDTO;
import lk.carRental.spring.dto.BookingDetailsDTO;
import lk.carRental.spring.dto.CustomerDTO;
import lk.carRental.spring.entity.*;
import lk.carRental.spring.repo.*;
import lk.carRental.spring.service.BookingService;
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
    ModelMapper mapper;


    public void saveBooking(BookingDTO entity) {
        System.out.println(entity.getCustomer().toString());
        Booking booking=new Booking(
                entity.getBookingId(),
                entity.getPickUpDate(),
                entity.getReturnDate(),
                "Not Approved",
                entity.getCustomer()
        );

        Booking IsBooking = bookingRepo.save(booking);

        if(IsBooking!=null){
            for (BookingDetailsDTO detailsDTO:entity.getBookingDetails()) {

                BookingDetails bookingDetails=new BookingDetails(
                        detailsDTO.getLoseDamageStatus(),
                        detailsDTO.getLoseDamageImg(),
                        "Not Approved",
                        detailsDTO.getBookingId(),
                        detailsDTO.getVehicleNumber(),
                        detailsDTO.getDriverNICNumber()
                );

                BookingDetails IsBookingDetails = bookingDetailsRepo.save(bookingDetails);

                if(IsBookingDetails!=null){
                    Vehicle vehicle = vehicleRepo.findById(detailsDTO.getVehicleNumber().getVehicleNumber()).get();
                    vehicle.setVehicleStatus("On Booking");

                    Vehicle Isvehicle = vehicleRepo.save(vehicle);

                    if(Isvehicle!=null){
                        Driver driver = driverRepo.findById(detailsDTO.getVehicleNumber().getVehicleNumber()).get();
                        driver.setDiverStatus("Assign");

                        Driver IsDriver = driverRepo.save(driver);

                        if(IsDriver!=null){
                            DriverSchedule driverSchedule=new DriverSchedule(
                                    entity.getPickUpDate(),
                                    entity.getReturnDate(),
                                    "On Work",
                                    driver
                            );

                            DriverSchedule IsDriverSchedule = drivescheduleRepo.save(driverSchedule);
                            if(IsDriverSchedule!=null){
                                VehicleSchedule vehicleSchedule=new VehicleSchedule(
                                        entity.getPickUpDate(),
                                        entity.getReturnDate(),
                                        "On Booking",
                                        vehicle
                                );
                                vehicleScheduleRepo.save(vehicleSchedule);
                            }
                        }
                    }
                }
            }
        }
    }

    public void deleteBooking(String id) {

    }

    public void updateBooking(BookingDTO entity) {
        if(entity.getBookingStatus().equals("Rejected")){
            Booking booking = bookingRepo.findById(entity.getBookingId()).get();
            booking.setBookingStatus(entity.getBookingStatus());

            Booking IsBooking = bookingRepo.save(booking);

            if(IsBooking!=null){
                List<BookingDetails> allByIds = bookingDetailsRepo.findAllByIds(entity.getBookingId());
                for (BookingDetails details:allByIds) {
                    details.setDetailsStatus("Rejected");
                    BookingDetails details1 = bookingDetailsRepo.save(details);

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



        }else if(entity.getBookingStatus().equals("Pending Payment")){
            Booking booking = bookingRepo.findById(entity.getBookingId()).get();
            booking.setBookingStatus(entity.getBookingStatus());

            Booking IsBooking = bookingRepo.save(booking);
        }
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
}
