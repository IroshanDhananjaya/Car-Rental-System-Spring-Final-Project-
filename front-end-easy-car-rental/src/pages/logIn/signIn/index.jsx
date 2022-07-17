import {Component} from "react";
import "./style.css"
import TextField from '@mui/material/TextField';
import {Box, Button, Grid} from "@mui/material";

class LogIn extends Component{
    constructor(props) {
        super(props);
    }

    render() {

        return(
            <section className="loging-are">
                <div className="loging-container">
                    <h1>LOGIN</h1>
                    <h4>Don't have an account?</h4>
                    <a>Register Here</a>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '70ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <TextField id="standard-basic" label="Email" variant="standard" />
                        <br/><br/><br/>
                        <TextField id="standard-basic" type="password" label="Password" variant="standard" />
                    </Box>
                    <Button className="btn-logIn" variant="contained" color="success">
                        Log In
                    </Button>
                    <h6>forget Password</h6>

                </div>
            </section>
        )
    }
}

export default LogIn