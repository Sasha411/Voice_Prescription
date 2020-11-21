import { AppBar, CssBaseline, Grid, Hidden, IconButton, makeStyles, Paper, Toolbar } from '@material-ui/core';
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
        height: "40vh",
        width: "25vw",
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
                        Left Side
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        Right Side
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Profile
