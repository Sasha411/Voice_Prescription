import { AppBar, CssBaseline, Grid, Hidden, IconButton, makeStyles, Paper, TextField, Toolbar, Typography } from '@material-ui/core';
import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme)=> ({
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
    paper: {
        //height: "40vh",
        //width: "25vw",
        minWidth: "25vw",
    },
    gridItem: {
        marginTop: "10px",
        marginBottom: "10px",
    }
}) )


const Profile = () => {
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
      const createGridItem = (item) =>{
            return (
                <Grid className={classes.gridItem} item>
                    <TextField autoComplete label={item}/>
                </Grid>
            )
      }
    //Return
    return (
        <>
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                <Link className={classes.link} to='/dashboard'> <IconButton
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
                                <Typography variant="h4" gutterBottom>Doctor's Details</Typography>
                            </Grid>
                            {createGridItem("First Name")}
                            {createGridItem("Last Name")}
                            {createGridItem("Age")}
                            {createGridItem("Gender")}
                            {createGridItem("Phone Number")}
                            {createGridItem("Email")}
                            {createGridItem("Qualification")}
                            {createGridItem("Specialization")}
                            {/* {createGridItem("State Registration Number")} */}
                            <Grid style={{marginTop: "10px", marginBottom: "45px"}} item>
                                <TextField label="State Registration Number"/>
                            </Grid>
                            
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
                                <Typography variant="h4" gutterBottom>Hospital's Details</Typography>
                            </Grid>
                    {createGridItem("Name")}
                    {createGridItem("Address")}
                    {createGridItem("CIN")}
                    {createGridItem("Registered Office")}
                    {createGridItem("Contact Number")}
                    <Grid style={{marginTop: "10px", marginBottom: "45px"}} item>
                        <TextField label="Email"/>
                    </Grid>
                    </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Profile
