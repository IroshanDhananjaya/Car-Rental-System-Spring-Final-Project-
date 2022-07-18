import {Component} from "react";
import "./style.css"
import TextField from '@mui/material/TextField';
import {Autocomplete, Box, Button, Grid} from "@mui/material";
import MYButton from "../../../components/Button";

class SignUP extends Component{
    constructor(props) {
        super(props);
    }

    render() {

        return(
            <section className="Rejister-area">
                <div className="Rejister-container">
                    <h1>REGISTRATION</h1>
                    <h4>Already have an account?</h4>
                    <a>Login Here</a>
                    <div className="text-area">
                        <Grid  container spacing={5.5} md={8}>
                            <Grid item lg={8} md={4} sm={4} xm={4} >
                                <TextField id="outlined-basic" placeHolder="Name" label="NIC Number" variant="standard" size="small"
                                           style={{width: '100%'}} />
                            </Grid>
                            <Grid item lg={12} md={4} sm={4} xm={4} >
                                <TextField id="outlined-basic" placeHolder="Name" label="Full Name" variant="standard" size="small"
                                           style={{width: '100%'}} />
                            </Grid>
                            <Grid item lg={6} md={4} sm={4} xm={4} >
                                <TextField id="outlined-basic" placeHolder="Name" label="Address" variant="standard" size="small"
                                           style={{width: '100%'}} />
                            </Grid>
                            <Grid item lg={6} md={4} sm={4} xm={4} >
                                <TextField id="outlined-basic" placeHolder="Name" label="Contact Number" variant="standard" size="small"
                                           style={{width: '100%'}} />
                            </Grid>
                            <Grid item lg={6} md={4} sm={4} xm={4} >
                                <label>Upload Your NIC</label>
                                <TextField id="outlined-basic" placeHolder="" type="file" label="" variant="standard" size="small"
                                           style={{width: '100%'}} />
                            </Grid>
                            <Grid item lg={6} md={4} sm={4} xm={4} >
                                <label>Upload Your Driving license</label><br/>
                                <TextField id="outlined-basic" placeHolder="" type="file" label="" variant="standard" size="small"
                                           style={{width: '100%'}} />
                            </Grid>

                            <Grid item lg={6} md={4} sm={4} xm={4} >
                                <TextField id="outlined-basic" placeHolder="Name" label="Email" variant="standard" size="small"
                                           style={{width: '100%'}} />
                            </Grid>
                            <Grid item lg={6} md={4} sm={4} xm={4} >
                                <TextField id="outlined-basic" placeHolder="Name" type="password" label="Password" variant="standard" size="small"
                                           style={{width: '100%'}} />
                            </Grid>
                            <Grid item lg={6} md={4} sm={4} xm={4} >
                                <Button variant="outlined" style={{width: '100%'}} >Sign In</Button>
                            </Grid>
                        </Grid>
                    </div>

                </div>
            </section>
        )
    }
}

export default SignUP