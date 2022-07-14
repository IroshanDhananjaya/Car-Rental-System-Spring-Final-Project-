import {Component} from "react";
import {styleSheet} from "./style";
import { withStyles } from "@mui/styles";
import "./style.css"
import rentImg from "../../assets/image/Car ren.jpg"
import {Button, Grid, Icon, Typography} from "@mui/material";
import {green} from "@mui/material/colors";
import * as React from 'react';




class HomePage extends Component{
    constructor(props) {
        super(props);
    }


    render() {

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
                    <div className="hero-image">
                        <img className="himage" src={rentImg}/>
                    </div>

                </div>
                <div className="Service-area">
                    <h1>Customer Services</h1>

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


            </section>






        );
    }

}

export default withStyles(styleSheet) (HomePage)