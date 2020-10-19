import React from 'react'
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Checkbox, FormControlLabel, Link, Tab, Tabs, TextField } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import { signIn, signUp } from '../actions';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
}))

const onTabClick = (val,props) => {
    if(val === 1){
        props.signIn();
    }
    else{
        props.signUp();
    }
}






const Login = (props) => {
    const classes = useStyles();
    

    const signInTab = (props) =>{
        return (
            <>
            <Typography component="h1" variant="h5">
                {props.status}
            </Typography>
            <form className={classes.form} noValidate>
                {(props.isSignIn)? 
                <>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    name="firstname"
                    autoComplete="firstname"
                    autoFocus
                /> 
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="lastname"
                    autoFocus
                /> 
                </>
                : null
                
                }
                <TextField

                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
            
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                {(props.isSignIn)? 
                <>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type="confirm password"
                    id="confirm password"
                    autoComplete="current-confirm-password"
                />
                <Button 
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Button 
                    onClick={() => props.signUp()}
                    color="primary"
                >
                            Already have an account? Sign In
                        </Button>
                </>
                : <><FormControlLabel 
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            /> 
            <Button 
                    
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                </Button>
                <Grid 
                    container
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Link to="/accountrecovery" >Forgot Password</Link>
                    </Grid>
                    <Grid item>
                        <Button 
                            onClick={() => props.signIn()}
                            color="primary"
                        >
                            Don't have an account? Sign Up
                        </Button>
                    </Grid>
                </Grid>
            </>
            }
            </form>
            </>
        )
    }
    
    
    return (
        <Grid container component="main">
            <CssBaseline />
            <Grid item xs={false} sm={6} md={8} className={classes.image} />
            <Grid item xs={12} sm={6} md={4} component={Paper}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                       <AccountCircleIcon/> 
                    </Avatar>
                    <Paper square>
                        <Tabs
                        value={props.isSignIn}
                        indicatorColor="primary"
                        textColor="primary"
                        >
                            <Tab onClick={() => onTabClick(0,props)} label="Sign In" />
                            <Tab onClick={() => onTabClick(1,props)} label="Sign Up" />
                        </Tabs>
                    </Paper>
                    {signInTab(props)}
                </div>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return { isSignIn: state.login.isSignIn }
}

export default connect(mapStateToProps, {signIn, signUp})(Login)