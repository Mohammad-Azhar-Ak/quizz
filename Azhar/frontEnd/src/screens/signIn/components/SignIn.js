import React from 'react';
import Avatar from '@mui/material/Avatar';
import { CustomButton, CustomPositionedSnackbar } from '../../../shared';
import { CustomInput } from '../../../shared';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { CustomLogo } from '../../../assets/images';
import { FormControl, Link } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#fce9ef",
  },
  imageStyle: {
    paddingLeft: "45px",
     padding: 30,    
    maxHeight: 619,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fce9ef',
    border: "solid",
    borderColor: "#801313",
    borderWidth: "10px",
    padding: "30px",
    paddingTop: "100px",
    paddingBottom: "100px"
  },
  signinStyle: {
    padding: "30px",
    backgroundColor: "#fce9ef",
  },
  text: {
    marginTop: "10px",
    color: "#801313",
  }
}));

const SignInComponent = ({ data, handleChange, handleClick, error, handleClose, open, handleLink }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      component="main"
      className={classes.root}>
      <Grid
        item
        xs={0}
        md={6} >
        <img
          src={CustomLogo}
          className={classes.imageStyle}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        component={Paper}
        elevation={0}
        square
        className={classes.signinStyle}
      >
        <Grid
          className={classes.paper}
        >
          <Avatar>
            <LoginIcon
              color="secondary"
            />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
          >
            Sign in
          </Typography>
          <FormControl
            sx={{ minWidth: "70%" }} >
            <CustomInput
              label='Email'
              type='text'
              value={data.email}
              handleChange={(value) => handleChange(value, 'email')}
              error={error.email}
              helperText={error.email}
              placeholder="Enter your email"
            />
            <CustomInput
              label='Password'
              type='password'
              value={data.password}
              handleChange={(value) => handleChange(value, 'password')}
              error={error.password}
              helperText={error.password}
              placeholder="Enter your password"
            />
          </FormControl>
          <Grid
            sx={{
              marginTop: "10px"
            }}>
            <CustomButton
              label='signIn'
              type='submit'
              value='Submit'
              handleClick={handleClick} />
          </Grid>
          <Grid item
            justify='center'
            className={classes.text}
          >
            <p onClick={handleLink}>Don't have an account? <Link sx={{cursor:"pointer"}}>Sign Up</Link></p>
          </Grid>
        </Grid>
        <CustomPositionedSnackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={open}
          onClose={handleClose}
          message="Invalid Credential"
        />
      </Grid>
    </Grid>
  )
}

export default SignInComponent
