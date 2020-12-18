import React from 'react'
import { Breadcrumbs, Typography, makeStyles, Grid, Paper, IconButton, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {connect} from 'react-redux';

const useStyles = makeStyles((theme)=>({
    primary:{
        color: "#6FE2D7",
        fontFamily: "Arimo",
        fontWeight: "bold",
    },
    secondary:{
        color: "#000000",
        fontFamily: "Arimo",
        fontWeight: "bold",

    },
    root: {
        width: "75vw",
        marginTop: "40px",
        marginLeft: "20px",
        height: "90vh",
        padding: "15px",
        backgroundColor: "#f8f8f8"
    },
    row1 : {
        //marginTop: "20px",
        //marginLeft: "30px",
        height: "200px",
        backgroundColor: "#B2F3ED",
        //padding: "15px"
    },
    row2 : {
        height: "200px",
        minWidth: "200px",
        backgroundColor: "#B2F3ED",
    },
    userIcon: {
        fontSize: "100px"
    },
}))

const DashboardProfile = () => {
    const classes = useStyles();
    return (
        <div>
            <Breadcrumbs separator="›"
                         aria-label="breadcrumb">
                <Typography className={classes.primary}
                            href="#">
                    &nbsp;DashBoard
                </Typography>
                <Typography className={classes.secondary}>Profile</Typography>
            </Breadcrumbs>
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
            ><Paper className={classes.root} elevation={3}>
                <Grid
                    container
                    item
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                    spacing={3}

                >
                    <Grid item xs={4}><Paper className={classes.row1} elevation={3}><Grid container direction="column" justify="center" alignItems="center"><Grid item><IconButton><AccountCircleIcon className={classes.userIcon} /></IconButton> </Grid><Grid item><Typography><strong>Name</strong> : Dr Archit Jain</Typography></Grid><Grid item><Typography><strong>Age</strong> : 21</Typography></Grid></Grid></Paper></Grid>
                    <Grid item xs={4}><Paper  className={classes.row1} elevation={3}><Grid container direction="column" justify="center" alignItems="center"><Grid item><Typography style={{marginTop: "20px"}} gutterBottom><strong>Qualification</strong> : Dr Archit Jain</Typography></Grid><Grid item><Typography style={{marginTop: "20px"}}><strong>Speciality</strong> : Surgeon</Typography></Grid></Grid></Paper></Grid>
                </Grid>
                <Grid
                    container
                    item
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                    spacing={3}
                    style={{marginTop: "35px"}}
                >
                    <Grid item><Paper className={classes.row2} elevation={3}><Grid container direction="column" justify="center" alignItems="center"><Grid style={{marginTop: "20px"}} item><Typography gutterBottom><strong>Recent Report</strong></Typography></Grid><Grid item><Typography gutterBottom><strong>Name</strong> : Ayush</Typography></Grid><Grid item><Typography gutterBottom><strong>Symptoms</strong> : Head ache</Typography></Grid><Grid item style={{ marginTop: "20px"}}><Link style={{textDecoration: "none",}} to="/voicehistory/report" target="_blank"><Button variant="outlined">More Info</Button></Link></Grid></Grid></Paper></Grid>
                    <Grid item><Paper className={classes.row2} elevation={3}><Grid container direction="column" justify="center" alignItems="center"><Grid style={{marginTop: "40px"}} item><Typography gutterBottom><strong>Total Prescriptions</strong></Typography></Grid><Grid item style={{fontSize: "26px"}}><strong>5</strong></Grid></Grid></Paper></Grid>
                    <Grid item><Paper className={classes.row2} elevation={3}><Grid container direction="column" justify="center" alignItems="center"><Grid style={{marginTop: "30px"}} item><Typography gutterBottom><strong>Contact</strong></Typography></Grid><Grid item><Typography gutterBottom><strong>Email</strong> : abc@gmail.com</Typography></Grid><Grid item><Typography gutterBottom><strong>Phone no</strong> : 6789998212</Typography></Grid></Grid></Paper></Grid>
                </Grid>
            </Paper>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {user: state.email.userId}
}

export default connect (mapStateToProps, null) (DashboardProfile)