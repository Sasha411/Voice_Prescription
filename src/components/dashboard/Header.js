import { AppBar, Badge, Button, Grid, Grow, Hidden, IconButton, makeStyles, Paper, Popper, SwipeableDrawer, Toolbar } from '@material-ui/core';
import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {openDrawer, closeDrawer} from '../actions'
import { connect } from 'react-redux';
import SideNavigation from './SideNavigation';
import MainDashboardArea from './MainDashboardArea';
import { Link } from 'react-router-dom';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';


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
            <AppBar style={{backgroundColor: "#F8F8F8"}} position="static">
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
                    <IconButton
                        
                        ref={anchorRef}
                        onClick={handleToggle}
                        aria-label="show new notifications"
                    >
                        <Badge badgeContent={0} color="secondary">
                            <NotificationsNoneOutlinedIcon/>
                        </Badge>
                    </IconButton>
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
                        
                        aria-label="settings"
                    >
                        <SettingsOutlinedIcon />
                    </IconButton>
                    </Grid>
                    <Grid item>
                    <IconButton
                        edge="end"
                        aria-label="user"
                    >
                        <Link style={{color: "rgba(0, 0, 0, 0.54)"}} to='#'><AccountCircleOutlinedIcon/></Link>
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
    return {isDrawerOpen: state.drawer.isDrawerOpen, user: state.email.userId}
}

export default connect(mapStateToProps, {openDrawer, closeDrawer})(Header)
