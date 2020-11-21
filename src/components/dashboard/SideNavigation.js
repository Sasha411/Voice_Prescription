import React from 'react'
import { Button, Grid, IconButton, makeStyles } from '@material-ui/core'
import {Link} from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
    },
    userIcon: {
        fontSize: '80px',
    },
    link2: {
        color: '#008080',
    }
}))

const SideNavigation = () => {
    const classes = useStyles()
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
                <Grid item><Link className={classes.link2} to="/profile">
                <IconButton

                ><AccountCircleIcon className={classes.userIcon} />
                </IconButton>
                </Link>
                </Grid>
                <Grid item>
                    Doctor : Hey You
                </Grid>
            </Grid>
            <Grid item>
                <Link className={classes.link} to="/dashboard">
                    <Button
                        color="inherit"
                    >
                        Dashboard
                    </Button>
                </Link>
            </Grid>
            <Grid item>
                <Link className={classes.link} to="/recordvoice">
                    <Button
                        color="inherit"
                    >
                        Record Voice
                    </Button>
                </Link>
            </Grid>
            <Grid item>
                <Link className={classes.link} to="/voicehistory">
                    <Button
                        color="inherit"
                    >
                        Voice History
                    </Button>
                </Link>
            </Grid>
        </Grid>
    )
}

export default SideNavigation
