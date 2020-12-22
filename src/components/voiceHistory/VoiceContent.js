import React from 'react'
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Grid, TextField} from '@material-ui/core';
import { Link } from 'react-router-dom';
import history from "../../history";

export class VoiceContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reportsDetails: []
        }
    }

    componentDidMount() {
        // console.log("abc", this.props.user1);
        //for report details
        const setReportsValues = (data) => {
            var reportsDetails1 = []
            var j=0;
            for(var i=0; i<data.length; i++) {
                if(data[i].userName === this.props.user1) {
                    // console.log("reportsssss: ", data[i]);
                   reportsDetails1[j] = data[i];
                    j++;
                }
            }
            this.setState({reportsDetails: reportsDetails1});
        }

        fetch(`http://localhost:3000/reports/showall`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
            .then(response => response.json())
            .then(response => setReportsValues(response.reports))
            .then(() => {
                    console.log('history reportssss: ', this.state.reportsDetails);
                    history.push({
                        pathname: '/reports/showall',
                        state: {details: this.state.reportsDetails}
                    });
                    // localStorage.setItem('data', doctorProfileDetails);
                }
            )
    }

    createReport = (data) => {
        return(
            <Grid item xs={3}>
                    <Card style={{minWidth: "200px",
                        backgroundColor: "rgba(189, 251, 248, 0.56)"}}>
                        <CardContent>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Name : {data.name}
                            </Typography>
                            <Typography color="textSecondary" >
                                Symptoms : {data.symptoms}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link style={{textDecoration: "none"}} target="_blank" to={`/reports/showall/${data._id}`}>
                                <Button  style={{marginLeft : "20px"}} variant="outlined" color="primary" size="small">More Info</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>
        )
    }

    createGridItem = () => {
        let abc = [];
        for(let i=0; i<this.state.reportsDetails.length; i++) {
            abc.push(this.createReport(this.state.reportsDetails[i]));
        }

        return abc;
    }

    render(){
        return (
            <Grid container
                  justify="space-around"
                  alignItems="center"
                  spacing={3}
                  style={{marginTop: "20px"}}
            >
                {
                    this.createGridItem()
                }
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {user: state.email.userId}
}

export default connect (mapStateToProps, null) (VoiceContent)