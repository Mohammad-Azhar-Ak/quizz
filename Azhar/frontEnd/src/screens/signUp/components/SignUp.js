import React from 'react';
import Avatar from '@mui/material/Avatar';
import { CustomButton, CustomPositionedSnackbar } from '../../../shared';
import { CustomInput } from '../../../shared';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { SignUpImg } from '../../../assets/images';
import { FormControl, Link } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#fce9ef",
  },
  imageStyle: {
    paddingLeft: "45px",
    padding: 30,
    maxHeight: 619
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "#fce9ef",
    border: "solid",
    borderColor: "#801313",
    borderWidth: "10px",
    padding: "30px"
  },
  signUpStyle: {
    padding: "30px",
    backgroundColor: "#fce9ef",
  }
}));

function SignUpComponent({ data, handleChange, handleClick, error, handleClose, open, handleLink }) {
  const classes = useStyles();

  return (
    <Grid
      container
      component="main"
      className={classes.root}>
      <Grid
        item
        xs={false}
        sm={false}
        md={6}  >
        <img
          src={SignUpImg}
          className={classes.imageStyle} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        component={Paper}
        elevation={0}
        className={classes.signUpStyle}>
        <Grid
          className={classes.paper}>
          <Avatar>
            <AddCircleIcon
              color='secondary' />
          </Avatar>
          <Typography
            component="h1"
            variant="h5">
            Sign Up
          </Typography>
          <FormControl
            sx={{ minWidth: "70%" }}>
            <CustomInput
              label='Name'
              type='text'
              value={data.name}
              handleChange={(value) => handleChange(value, 'name')}
              error={error.name}
              helperText={error.name}
              placeholder="Enter your name" />
            <CustomInput
              label='Email'
              type='text'
              value={data.email}
              handleChange={(value) => handleChange(value, 'email')}
              error={error.email}
              helperText={error.email}
              placeholder="Enter your email" />
            <CustomInput
              label='Mobile'
              type='number'
              value={data.mobile}
              handleChange={(value) => handleChange(value, 'mobile')}
              error={error.mobile}
              helperText={error.mobile}
              placeholder="Enter your mobile number" />
            <CustomInput
              label='Password'
              type='password'
              value={data.password}
              handleChange={(value) => handleChange(value, 'password')}
              error={error.password}
              helperText={error.password}
              placeholder="Enter your password" />
            <CustomInput
              label='Confirm Password'
              type='password'
              value={data.confirm_password}
              handleChange={(value) => handleChange(value, 'confirm_password')}
              error={error.confirm_password}
              helperText={error.confirm_password}
              placeholder="Enter confirm password" />
          </FormControl>
          <Grid sx={{ marginTop: "10px" }}>
            <CustomButton
              label='Sign Up'
              type='submit'
              value='Submit'
              handleClick={handleClick} />
          </Grid>
          <Grid
            item
            justify="center"
            sx={{ marginTop: "10px", color: "#801313" }}
          >
            <p onClick={handleLink}>Already have an account? <Link sx={{ cursor: "pointer" }}>Sign In</Link></p>
          </Grid>
        </Grid>
        <CustomPositionedSnackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={open}
          onClose={handleClose}
          message="Email Already Exist"
        />
      </Grid>
    </Grid>
  )
}

export default SignUpComponent

