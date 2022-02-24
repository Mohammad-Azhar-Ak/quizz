import { Button } from '@mui/material'

const CustomButton = ({ label, type, handleClick, value, className}) => {
    
    return (
        <Button
            type={type}
           
            margin="normal"
            variant="contained"
            color="secondary"
            className={`${"CustomButton"} ${className}`} 
            value={value}
            onClick={handleClick}
        >
             {label}
        </Button>
    )
}
export default CustomButton