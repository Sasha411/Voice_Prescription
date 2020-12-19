import React from 'react'
import { Grid, Typography, Paper, makeStyles, CssBaseline, AppBar, Toolbar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import {IconButton} from '@material-ui/core'
import {connect} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    paper2: {
        marginLeft: "3.5vw",
        width:"72.5vw",
        minHeight: "200px",
        paddingTop: "40px",
        marginTop: "60px",
        backgroundColor: "#B2F3ED",
    },
    root: {
        display: 'flex',
    },
    toolbar: {
        backgroundColor: '#008080',
    },
    link: {
        color: "white",
    },
}))

const ReportInfo = () => {
    const classes = useStyles()
    return (<>
            <div style={{width: "100vw", height: "100vh",marginBottom: "20px", overflowX: "hidden"}}>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar className={classes.toolbar}>
                            <Link className={classes.link}
                                  to='/dashboard'
                            > <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                //onClick={handleDrawerOpen}
                            >
                                <DashboardIcon/>
                            </IconButton>
                            </Link>
                        </Toolbar>
                    </AppBar>
                </div>

                <Grid container
                      direction="column"
                      spacing={10}
                ><Paper elevation={3} style={{width: "80vw",marginLeft: "12.5vw", height: "100vh",paddingTop: "20px",marginTop: "60px",backgroundColor: "#F8F8F8"}}>
                    <Grid item container
                          direction="column"
                          justify="flex-start"
                          alignItems="center"
                    >
                        <Grid item><Typography gutterBottom variant="h3">REPORT</Typography></Grid>
                        <Grid item><Typography variant="h5"><strong>Name</strong> : Ayush</Typography></Grid>
                        <Grid item><Typography variant="h5"><strong>Gender</strong> : Male | <strong>Age</strong> : 21</Typography></Grid>
                    </Grid>
                    <Paper className={classes.paper2} elevation={3} style={{}}>
                        <Grid item container
                              direction="row"
                              justify="space-evenly"
                              alignItems="center"

                        >

                            <Grid item container
                                  direction="column"
                                  justify="space-between"
                                  alignItems="center"
                                  xs={6}
                                  spacing={3}
                            >
                                <Grid item><Typography variant="h6"><strong>Symptoms</strong>: Cough</Typography></Grid>
                                <Grid item><Typography variant="h6"><strong>Diagnosis</strong>: Benadryl</Typography></Grid>
                            </Grid>
                            <Grid item container
                                  direction="column"
                                  justify="space-between"
                                  alignItems="center"
                                  xs={6}
                                  spacing={3}
                            >
                                <Grid item><Typography variant="h6"><strong>Prescription</strong>: 20ml 3 times a day</Typography></Grid>
                                <Grid item><Typography variant="h6"><strong>Adivce</strong>: Drink warm water</Typography></Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Paper>
                </Grid>

            </div>
        </>
    )
}


const mapStateToProps = (state) => {
    return {user: state.email.userId}
}

export default connect (mapStateToProps, null) (ReportInfo)