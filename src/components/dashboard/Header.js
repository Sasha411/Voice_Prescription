import { AppBar, Badge, Button, Grid, Grow, Hidden, IconButton, makeStyles, Paper, Popper, SwipeableDrawer, Toolbar } from '@material-ui/core';
import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {openDrawer, closeDrawer} from '../actions'
import { connect } from 'react-redux';
import SideNavigation from './SideNavigation';
import {MainDashboardArea} from './MainDashboardArea';



const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    buttoncol: {
        backgroundColor: 'rgba(189, 251, 248, 0.56)',
        '&:hover': {
            background: "rgba(189, 251, 248, 0.56)",
         },
    },
    mainDrawer: {
        width: '250px',
        height: '100vh',
        backgroundColor: 'rgba(189, 251, 248, 0.56)',
    },
    drawer: {
        width: '250px',
        height: '100vh',
        backgroundColor: 'rgba(189, 251, 248, 0.56)',
        
    },
    mainDashboard: {
        
    }
}));

const Header = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    }

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
      };

function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        }
      }

const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);


  

    return (
        <div className={classes.grow}>
            <AppBar style={{backgroundColor: "#008080"}} position="static">
                <Toolbar>
                    <Hidden mdUp>
                        <Button
                            color="inherit"
                            className={classes.button}
                            onClick={() => props.openDrawer()}
                        >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            
                        >
                            <MenuIcon />
                        </IconButton>
                        </Button>
                        <SwipeableDrawer
                            open={props.isDrawerOpen}
                            >
                                <Button 
                                    color="inherit"
                                    className={classes.buttoncol}
                                    onClick={() => props.closeDrawer()}
                                >
                                    X
                                </Button>
                                <div className={classes.drawer}>
                                    <SideNavigation />
                                </div>
                            </SwipeableDrawer>
                        
                    </Hidden>
                    <Grid container justify="flex-end">
                    <Grid item>
                    <Button
                        color="inherit"
                        ref={anchorRef}
                        onClick={handleToggle}
                    >
                    <IconButton
                        
                        color="inherit"
                        aria-label="show new notifications"
                    >
                        <Badge badgeContent={3} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    </Button>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement}) => (
                            <Grow 
                                {...TransitionProps}
                                style={{transformOrigin: placement === 'bottom'? 'center top' : 'center bottom'}}
                                >
                                    <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                            <MenuItem onClick={handleClose}>Your Message 3</MenuItem>
                                            <MenuItem onClick={handleClose}>Your Message 2</MenuItem>
                                            <MenuItem onClick={handleClose}>Your Message 1</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                    </Paper>
                                </Grow>
                        )}
                    </Popper>
                    </Grid>
                    <Grid item>
                    <IconButton
                        
                        color="inherit"
                        aria-label="settings"
                    >
                        <SettingsIcon />
                    </IconButton>
                    </Grid>
                    <Grid item>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="user"
                    >
                        <AccountCircleIcon/>
                    </IconButton>
                    </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Hidden smDown>
                    <Paper
                        variant="outlined"
                        
                    >
                        <Grid container
                            justify="flex-start"
                            alignItems="flex-start"
                            direction="row"
                        >
                            <Grid item className={classes.mainDrawer}>
                            <SideNavigation />
                            </Grid>
                            <Grid item
                            className={classes.mainDashboard}
                            >
                            <MainDashboardArea />
                            </Grid>
                        </Grid>
                    </Paper>
                </Hidden>
        </div>
    )
}

const mapStateToProps= (state) => {
    return {isDrawerOpen: state.drawer.isDrawerOpen}
}

export default connect(mapStateToProps, {openDrawer, closeDrawer})(Header)
