package lk.carRental.spring.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

/**
 * @author : Dhananjaya
 * @since : 0.0.1
 **/
@Configuration
@Import(JPAConfig.class)
public class WebRootConfig {
}
