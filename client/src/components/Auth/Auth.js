import React from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {GoogleLogin} from 'react-google-login';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Icon from './icon'
const Auth = () => {
    const classes=useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
    
        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/');
        } catch (error) {
          console.log(error);
        }
      };
    
      const googleError = (error) => {
        console.log(error);
      };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <form className={classes.form}>
          <GoogleLogin
            clientId="901073815097-qrgigg0qk7g0ts8m3m7m5p58edv828ho.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          
        </form>
      </Paper>
    </Container>
  )
}

export default Auth