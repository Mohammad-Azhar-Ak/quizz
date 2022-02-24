import { TextField } from "@mui/material";

const CustomTextField=({label,type,handleChange,value,error,helperText,placeholder,flag})=>{
    return(
        <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              disabled={flag}
              name="password"
              placeholder={placeholder}
              label={label}
              type={type}
              id="password"
              value = {value}
              error ={error}
              helperText ={helperText}
              autoComplete="current-password"
              onChange = {(e)=>handleChange(e.target.value)}
            />
    )
}
export default CustomTextField