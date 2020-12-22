import React from 'react'
import {Button, Grid, Typography, Paper, makeStyles, CssBaseline, AppBar, Toolbar} from '@material-ui/core'
import {Link} from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import {IconButton} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {connect} from 'react-redux';
import history from "../../history";

export class ReportInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reportDetails: {}
        }
    }

    componentDidMount() {
        const setReportValues = (data) => {
            var reportDetails1 = data
            this.setState({reportDetails: reportDetails1});
        }

        fetch(`http://localhost:3000/reports/showall/${this.props.match.params.id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then(response => response.json())
            .then(response => setReportValues(response.report))
            .then(() => {
                    console.log('history reportssss: ', this.state.reportDetails);
                    history.push({
                        pathname: `/reports/showall/${this.props.match.params.id}`,
                        state: {details: this.state.reportDetails}
                    });
                    // localStorage.setItem('data', doctorProfileDetails);
                }
            )
    }

    deleteReport = () => {
        fetch(`http://localhost:3000/reports/showall/${this.props.match.params.id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
            // .then(response => response.json())
            .then(history.push('/reports/showall'))
    }

    // console.log(props.match.params.id);

    render() {
        return (
            <>
                <div style={{width: "100vw", height: "100vh", marginBottom: "20px", overflowX: "hidden"}}>
                    <div style={{display: 'flex'}}>
                        <AppBar position="static">
                            <Toolbar style={{backgroundColor: '#008080'}}>
                                <Link style={{color: "white"}}
                                      to='/dashboard'
                                > <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
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
                    >

                        <Paper elevation={3}
                            style={{
                                width: "80vw",
                                marginLeft: "12.5vw",
                                height: "100vh",
                                paddingTop: "20px",
                                marginTop: "60px",
                                backgroundColor: "#F8F8F8"
                            }}>

                            <Button
                                style={{float: "right", marginRight: "20px"}}
                                onClick={this.deleteReport}
                            >
                                <DeleteOutlineIcon style={{color: "#008080"}}>
                                    Delete
                                </DeleteOutlineIcon>
                            </Button>

                        <Grid item
                              container
                              direction="column"
                              justify="flex-start"
                              alignItems="center"
                        >
                            <Grid item><Typography gutterBottom
                                                   variant="h3">REPORT</Typography></Grid>
                            <Grid item><Typography variant="h5"><strong>Name</strong> : {this.state.reportDetails.name}</Typography></Grid>
                            <Grid item><Typography variant="h5"><strong>Gender</strong> : {this.state.reportDetails.gender} | <strong>Age</strong> : {this.state.reportDetails.age}</Typography></Grid>
                        </Grid>


                        <Paper style={{
                            marginLeft: "3.5vw",
                            width: "72.5vw",
                            minHeight: "200px",
                            paddingTop: "40px",
                            marginTop: "60px",
                            backgroundColor: "#B2F3ED"
                        }}
                               elevation={3}
                        >
                            <Grid item
                                  container
                                  direction="row"
                                  justify="space-evenly"
                                  alignItems="center"

                            >

                                <Grid item
                                      container
                                      direction="column"
                                      justify="space-between"
                                      alignItems="center"
                                      xs={6}
                                      spacing={3}
                                >
                                    <Grid item><Typography variant="h6"><strong>Symptoms</strong>: {this.state.reportDetails.symptoms}</Typography></Grid>
                                    <Grid item><Typography variant="h6"><strong>Diagnosis</strong>: {this.state.reportDetails.diagnosis}</Typography></Grid>
                                </Grid>
                                <Grid item
                                      container
                                      direction="column"
                                      justify="space-between"
                                      alignItems="center"
                                      xs={6}
                                      spacing={3}
                                >
                                    <Grid item><Typography variant="h6"><strong>Prescription</strong>: {this.state.reportDetails.prescription}</Typography></Grid>
                                    <Grid item><Typography variant="h6"><strong>Adivce</strong>: {this.state.reportDetails.advice}</Typography></Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Paper>
                    </Grid>

                </div>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {user: state.email.userId}
}

export default connect(mapStateToProps, null)(ReportInfo)