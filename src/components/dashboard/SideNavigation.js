import React from 'react'
import { Button, Grid, IconButton, makeStyles } from '@material-ui/core'
import {Link} from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


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

export default SideNavigation
