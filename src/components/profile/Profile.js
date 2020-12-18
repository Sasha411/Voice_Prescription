import {
    AppBar,
    Button,
    CssBaseline,
    Grid,
    Hidden,
    IconButton,
    makeStyles,
    Paper,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';
import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {Link} from 'react-router-dom';
import history from "../../history";
import {connect} from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        backgroundColor: '#008080',
    },
    link: {
        color: "white",
    },
    mainGrid: {
        marginTop: "20px",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    paper: {
        //height: "40vh",
        //width: "25vw",
        minWidth: "25vw",
    },
    gridItem: {
        marginTop: "10px",
        marginBottom: "10px",
    }
}))


const Profile = (props) => {
    //States
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    //Drawer Settings
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    //Helper Functions
    const createGridItem = (item) => {
        return (
            <Grid className={classes.gridItem}
                  item>
                <TextField onChange={(e) => abc(item, e)}
                           autoComplete
                           label={item}/>
            </Grid>
        )
    }

    function abc(item, e) {
        docDetails[item] = e.target.value
        // console.log(docDetails[item])
    }

    var docDetails = {
        FirstName: '',
        LastName: '',
        Age: 0,
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

    function onSubmitDocDetailChanges() {
        console.log(docDetails);
        fetch('http://localhost:3000/profile', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userName: props.user,
                firstName: docDetails.FirstName,
                lastName: docDetails.LastName,
                age: docDetails.Age,
                gender: docDetails.Gender,
                phoneNo: docDetails.PhoneNumber,
                email: docDetails.Email,
                qualification: docDetails.Qualification,
                specialization: docDetails.Specialization,
                stateRegistrationNo: docDetails.StateRegistrationNo,

                hospitalName: docDetails.Name,
                hospitalAddress: docDetails.Address,
                hospitalCin: docDetails.CIN,
                hospitalRegdOffice: docDetails.RegisteredOffice,
                hospitalContactNo: docDetails.ContactNumber,
                hospitalEmail: docDetails.HospitalEmail,
            })
        })
            .then(response => response.json())
            .then(history.push('/dashboard'))
            // .then(response => response.redirect('/dashboard'));
    }

    //Return
    return (
        <>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <Link className={classes.link}
                              to='/dashboard'> <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                        >
                            <DashboardIcon/>
                        </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>


            </div>
            <Grid container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                  className={classes.mainGrid}
            >

                <Grid item>
                    <Paper className={classes.paper}>
                        <Grid container
                              direction="column"
                              justify="flex-end"
                              alignItems="center"
                        >
                            <Grid item>
                                <Typography variant="h4"
                                            gutterBottom>Doctor's Details</Typography>
                            </Grid>
                            {createGridItem("FirstName")}
                            {createGridItem("LastName")}
                            {createGridItem("Age")}
                            {createGridItem("Gender")}
                            {createGridItem("PhoneNumber")}
                            {createGridItem("Email")}
                            {createGridItem("Qualification")}
                            {createGridItem("Specialization")}
                            {createGridItem("StateRegistrationNo")}
                            {/*<Grid style={{marginTop: "10px", marginBottom: "45px"}}*/}
                            {/*      item>*/}
                            {/*    <TextField label="StateRegistrationNo"/>*/}
                            {/*</Grid>*/}

                        </Grid>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Grid container
                              direction="column"
                              justify="flex-end"
                              alignItems="center"
                        >
                            <Grid item>
                                <Typography variant="h4"
                                            gutterBottom>Hospital's Details</Typography>
                            </Grid>
                            {createGridItem("Name")}
                            {createGridItem("Address")}
                            {createGridItem("CIN")}
                            {createGridItem("RegisteredOffice")}
                            {createGridItem("ContactNumber")}
                            {createGridItem("HospitalEmail")}
                        {/*    <Grid style={{marginTop: "10px", marginBottom: "45px"}}*/}
                        {/*          item>*/}
                        {/*        <TextField label="HospitalEmail"/>*/}
                        {/*    </Grid>*/}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {onSubmitDocDetailChanges()}}
            >
                Save Changes
            </Button>
        </>
    )
}

const mapStateToProps = (state) => {
    return {user: state.email.userId}
}

export default connect (mapStateToProps, null) (Profile)
