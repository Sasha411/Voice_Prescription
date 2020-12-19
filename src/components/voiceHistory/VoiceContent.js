import React from 'react'
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(()=> ({
    card : {
        minWidth: "200px",
        backgroundColor: "rgba(189, 251, 248, 0.56)",
    },
    button: {
        marginLeft : "20px",
    }
}))

export const VoiceContent = () => {
    const classes = useStyles();
    return (
        <Grid container
              justify="space-around"
              alignItems="center"
              spacing={3}
              style={{marginTop: "20px"}}
        >
            <Grid item xs={3}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Name : Ayush
                        </Typography>
                        <Typography color="textSecondary" >
                            Symptoms  Head Ache
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link style={{textDecoration: "none"}} target="_blank" to='/voicehistory/report'>
                            <Button  className={classes.button} variant="outlined" color="primary" size="small">More Info</Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Name : Ayush
                        </Typography>
                        <Typography color="textSecondary" >
                            Symptoms  Head Ache
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button  className={classes.button} variant="outlined" color="primary" size="small">More Info</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Name : Ayush
                        </Typography>
                        <Typography color="textSecondary" >
                            Symptoms  Head Ache
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button  className={classes.button} variant="outlined" color="primary" size="small">More Info</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {user: state.email.userId}
}

export default connect (mapStateToProps, null) (VoiceContent)