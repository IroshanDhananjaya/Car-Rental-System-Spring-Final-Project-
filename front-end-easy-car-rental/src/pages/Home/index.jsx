import {Component} from "react";
import {styleSheet} from "./style";
import { withStyles } from "@mui/styles";
import "./style.css"
import rentImg from "../../assets/image/Car ren.jpg"
import {Button, Grid, Icon, Typography} from "@mui/material";
import {green} from "@mui/material/colors";
import * as React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




class HomePage extends Component{
    constructor(props) {
        super(props);
    }


    render() {
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return(
            <section>
                <div className="header">
                    <nav className="nav" id="nav-menu">

                        <ul className="nav-list">

                            <li className="nav-item"><a href="#hero" className="nav-link">Home</a></li>
                            <li className="nav-item"><a href="#about" className="nav-link">Services</a></li>
                            <li className="nav-item"><a href="#education" className="nav-link">Vehicle Models</a></li>
                            <li className="nav-item"><a href="#education" className="nav-link">Contact</a></li>
                            <li className="nav-item"><a href="#education" className="nav-link btn-signIn"  onClick={() => {
                                console.log('Increase button clicked!')
                            }}>Sign In</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-content-h1">
                            Easy Car Rental
                        </h1>
                        <p className= "hero-content-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
                    </div>


                </div>
                <div className="Service-area">
                    <h1>Customer Services</h1>
                    <p>We offer professional car rental & limousine services in our range of high-end vehicles</p>

                    <div className="services1">
                        <div className="services1-div1">

                            <h1> <Icon sx={{ color: green[500] }}>+</Icon>Special rates on car booking</h1>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed nonumy eirmod tempor invidunt ut labore et dolore magnaed aliquyam erat, sed diam voluptua. </p>
                        </div>
                        <div className="services1-div1">
                            <h1><Icon sx={{ color: green[500] }}>+</Icon>Mobile Phone Reservation</h1>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed nonumy eirmod tempor invidunt ut labore et dolore magnaed aliquyam erat, sed diam voluptua. </p>
                        </div>
                    </div>
                    <div className="services2">
                        <div className="services2-div1">
                            <h1><Icon sx={{ color: green[500] }}>+</Icon>Unlimited Miles Car Rental</h1>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed nonumy eirmod tempor invidunt ut labore et dolore magnaed aliquyam erat, sed diam voluptua. </p>
                        </div>
                        <div className="services2-div1">
                            <h1><Icon sx={{ color: green[500] }}>+</Icon>One Way Car Rentals</h1>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed nonumy eirmod tempor invidunt ut labore et dolore magnaed aliquyam erat, sed diam voluptua. </p>
                        </div>
                    </div>
                </div>

                <div className="vehicle-model">
                    <h1>Our Vehicle Models</h1>
                    <p>We offer professional car rental & limousine services in our range of high-end vehicles</p>
                </div>
                <div className="App">
                    <Slider {...settings}>
                        {data.map(item=>(
                            <div className="card">
                                <div className="card-top">
                                    <img src={item.linkImg} alt={item.title}/>
                                    <h1>{item.title}</h1>
                                </div>
                                <div className="card-bottom">
                                    <h3>Per Day : {item.price}</h3>
                                    <p className="category">{item.category}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="">

                </div>

            </section>






        );
    }

}

const data=[
    {
        id:1,
        title:'Toyota',
        price:'3000.00 LKR',
        category:'gsfs gshystyw hhgsis',
        linkImg:'data:image/webp;base64,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'
    },
    {
        id:3,
        title:'Iroshan Dhananjaya',
        price:'$27252',
        category:'gsfs gshystyw hhgsis',
        linkImg:'data:image/webp;base64,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'
    },
    {
        id:3,
        title:'Iroshan Dhananjaya',
        price:'$27252',
        category:'gsfs gshystyw hhgsis',
        linkImg:'data:image/webp;base64,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'
    },
    {
        id:3,
        title:'Iroshan Dhananjaya',
        price:'$27252',
        category:'gsfs gshystyw hhgsis',
        linkImg:'data:image/webp;base64,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'
    },
    {
        id:3,
        title:'Iroshan Dhananjaya',
        price:'$27252',
        category:'gsfs gshystyw hhgsis',
        linkImg:'data:image/webp;base64,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'
    },
    {
        id:3,
        title:'Iroshan Dhananjaya',
        price:'$27252',
        category:'gsfs gshystyw hhgsis',
        linkImg:'data:image/webp;base64,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'
    }
]

export default withStyles(styleSheet) (HomePage)