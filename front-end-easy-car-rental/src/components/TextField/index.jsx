import {Component} from "react";
import {PropTypes} from "@mui/material";
import {string} from "prop-types";

class MyTextField extends Component{
    static propTypes={
        autoComplete:PropTypes.string,
        autoFocus:PropTypes.bool,
        classes:PropTypes.object,
        color:PropTypes.string,
        defaultValue:PropTypes.any,
        disabled:PropTypes.bool,
        error:PropTypes.bool,
        FormHelperTextProps:PropTypes.object,
        fullWidth:PropTypes.bool,
        helperText:PropTypes.node,
        id:PropTypes.string,
        InputLabelProps:PropTypes.object,
        inputProps:PropTypes.object,
        InputProps:PropTypes.object,
        label:PropTypes.ref,
        margin:PropTypes.string,
        maxRows:PropTypes.string,
        minRows:PropTypes.string,
        multiline:PropTypes.bool,
        name:PropTypes.string,
        onChange:PropTypes.func,



    }
}