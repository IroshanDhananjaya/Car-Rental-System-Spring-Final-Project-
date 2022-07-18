import {Component} from "react";
import "./style.css"
import TextField from '@mui/material/TextField';
import {Autocomplete, Box, Button, Grid} from "@mui/material";
import MYButton from "../../../components/Button";

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
                    <div className="text-field-area" >
                        <TextField id="standard-basic" label="Email" variant="standard"  style={{width: '100%'}}/>
                        <TextField id="standard-basic" label="Password" variant="standard" style={{width: '100%'}} />

                        <Button variant="outlined">Sign In</Button>
                    </div>

                </div>
            </section>
        )
    }
}

export default LogIn