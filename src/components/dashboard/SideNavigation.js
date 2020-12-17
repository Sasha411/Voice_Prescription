import React from 'react'
import { Button, Grid, IconButton, makeStyles } from '@material-ui/core'
import {Link} from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import history from "../../history";
import Axios from "axios";
import {connect} from "react-redux";
import {signIn, signOut} from "../actions";

var doctorProfileDetails = {
    id: '',
    FirstName: '',
    LastName: '',
    Age: '',
    Gender: '',
    PhoneNumber: '',
    Email: '',
    Qualification: '',
    Specialization: '',
    StateRegistrationNo: '',

    Name: '',
    Address: '',
    CIN: '',
    RegisteredOffice: '',
    ContactNumber: '',
    HospitalEmail: '',
}

const useStyles = makeStyles((theme) => ({
    userIcon: {
        fontSize: '80px',
    },
    link2: {
        color: '#008080',
    },
    primary: {
        color: '#009688',
        fontWeight: "bold",
        fontFamily: "Arimo",
        fontSize: '16px',

    },
    secondary: {
        textDecoration: "none !important",
        color: '#000000',
        fontFamily: "Arimo",
        fontSize: '16px',
        fontWeight: "bold",
    }

}))

const SideNavigation = (props) => {
    // console.log(props.user);
    // setTimeout(() => {console.log('*****', props.user);})
    const classes = useStyles()

    const getProfile = () => {
        Axios({
            url: `http://localhost:3000/profile/`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then(response => console.log(response.data.message));
    }

    const setDocValues = (data) => {
        for(var i=0; i<data.length; i++) {
            if(data[i].userName === props.user) {
                console.log(data[i]);
                doctorProfileDetails.id = data[i]._id;
                doctorProfileDetails.FirstName = data[i].firstName;
                doctorProfileDetails.LastName = data[i].lastName;
                doctorProfileDetails.Age = data[i].age;
                doctorProfileDetails.Gender = data[i].gender;
                doctorProfileDetails.PhoneNumber = data[i].phoneNo;
                doctorProfileDetails.Email = data[i].email;
                doctorProfileDetails.Qualification = data[i].qualification;
                doctorProfileDetails.Specialization = data[i].specialization;
                doctorProfileDetails.StateRegistrationNo = data[i].stateRegistrationNo;

                doctorProfileDetails.Name = data[i].hospitalName;
                doctorProfileDetails.Address = data[i].hospitalAddress;
                doctorProfileDetails.CIN = data[i].hospitalCin;
                doctorProfileDetails.RegisteredOffice = data[i].hospitalRegdOffice;
                doctorProfileDetails.ContactNumber = data[i].hospitalContactNo;
                doctorProfileDetails.HospitalEmail = data[i].hospitalEmail;
            }
        }
    }

    const getProfileWithData = () => {
        fetch(`http://localhost:3000/profile/showall`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then(response => response.json())
            .then(response => setDocValues(response.doctorProfiles))
            // .then(response => response.doctorProfile)
            // .then(console.log(doctorProfileDetails))
            .then(() => {
                    console.log('history one: ', doctorProfileDetails);
                    history.push({
                        pathname: '/profile/showall',
                        state: {details: doctorProfileDetails}
                    });
                    // localStorage.setItem('data', doctorProfileDetails);
                }
            )
    }

    return (
        <Grid container
            direction="column"
            justify="space-evenly"
            alignItems="flex-start"
        >
            <Grid item container 
                direction="column"
                justify="center"
                alignItems="center"
                
            >
                <Grid item>
                    <Link className={classes.link2}
                                 onClick={() => getProfileWithData()}
                                 to="#"
                        >
                <IconButton

                ><AccountCircleIcon className={classes.userIcon} />
                </IconButton>
                </Link>
                </Grid>
                <Grid className={classes.primary} item>
                    DR. ARCHIT JAIN
                </Grid>
            </Grid>
            <Grid item container
                direction="column"
                alignItems="center"
            >
            <Grid item>
                <Link style={{textDecoration: "none"}} to="/dashboard">
                    <Button
                    className={classes.secondary}
                    >
                        Dashboard
                    </Button>
                </Link>
            </Grid>
            <Grid item>
                <Link style={{textDecoration: "none"}} to="/recordvoice">
                    <Button
                    className={classes.secondary}
                    >
                        Record Voice
                    </Button>
                </Link>
            </Grid>
            <Grid item>
                <Link style={{textDecoration: "none"}} to="/voicehistory">
                    <Button
                    className={classes.secondary}
                    >
                        Voice History
                    </Button>
                </Link>
            </Grid>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.email, user: state.email.userId}
}

export default connect(mapStateToProps, {signIn, signOut}) (SideNavigation)
