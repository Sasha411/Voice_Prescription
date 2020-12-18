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
// import {doctorProfileDetails} from '../dashboard/SideNavigation';

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


const ShowProfile = (props) => {
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

    const doc = props.location.state.details;

    var docDetails = {
        FirstName: doc.FirstName,
        LastName: doc.LastName,
        Age: doc.Age,
        Gender: doc.Gender,
        PhoneNumber: doc.PhoneNumber,
        Email: doc.Email,
        Qualification: doc.Qualification,
        Specialization: doc.Specialization,
        StateRegistrationNo: doc.StateRegistrationNo,

        Name: doc.Name,
        Address: doc.Address,
        CIN: doc.CIN,
        RegisteredOffice: doc.RegisteredOffice,
        ContactNumber: doc.ContactNumber,
        HospitalEmail: doc.HospitalEmail,
    }

    //Helper Functions
    const createGridItem = (item, props) => {
        return (
            <Grid className={classes.gridItem}
                  item>
                <TextField
                    defaultValue={doc[item]}
                    // value={doc[item]}
                    onChange={(e) => abc(item, e)}
                    autoComplete
                    label={item}
                />
            </Grid>
        )
    }

    function abc(item, e) {
        docDetails[item] = e.target.value;
        console.log(docDetails[item])
    }

    const id = doc.id;

    function onSubmitDocDetailChanges() {
        var finalDocDetails = {
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
        }

        console.log('***', id, finalDocDetails);
        fetch(`http://localhost:3000/profile/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                doctorProfile: finalDocDetails,
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
                            {createGridItem("FirstName", props)}
                            {createGridItem("LastName", props)}
                            {createGridItem("Age", props)}
                            {createGridItem("Gender", props)}
                            {createGridItem("PhoneNumber", props)}
                            {createGridItem("Email", props)}
                            {createGridItem("Qualification", props)}
                            {createGridItem("Specialization", props)}
                            {createGridItem("StateRegistrationNo", props)}
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
                            {createGridItem("Name", props)}
                            {createGridItem("Address", props)}
                            {createGridItem("CIN", props)}
                            {createGridItem("RegisteredOffice", props)}
                            {createGridItem("ContactNumber", props)}
                            {createGridItem("HospitalEmail", props)}
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

export default connect (mapStateToProps, null) (ShowProfile)