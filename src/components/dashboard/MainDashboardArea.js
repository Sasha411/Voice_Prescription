import {makeStyles} from '@material-ui/core/styles';
import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {useLocation} from 'react-router-dom'
import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
import {Button, Grid, Paper, TextField} from '@material-ui/core';
import history from "../../history";
import VoiceHistory from '../voiceHistory/VoiceHistory';
import {VoiceContent} from '../voiceHistory/VoiceContent'
import {DashboardProfile} from './DashboardProfile';
import {connect} from "react-redux";
import {signIn, signOut} from "../actions";
// import Axios from "axios";
//import key from './key';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '80ch',
            marginTop: '20px',
        },
    },
    messg: {
        paddingTop: "20px",
    },
    buttonsp: {
        marginLeft: "20px",
        marginTop: "20px",
        backgroundColor: "#009688",
        color: "white",
        fontWeight: "bold",
        fontFamily: "Source Sans Pro",
        padding: "15px 25px",
        minWidth: "200px",

    },
    note: {
        marginTop: "40px",
        marginLeft: "10px",
        color: "#009688",
        fontFamily: "Arimo",
        fontWeight: "bold",
        fontSize: "16px",
    },
    note2: {
        marginLeft: "10px",
        color: "#009688",
        fontFamily: "Arimo",
        fontWeight: "bold",
        fontSize: "12px",
    },
    ppr: {
        marginTop: "40px",
        marginLeft: "10px",
    },
    gItem: {
        marginTop: "5px",
        fontSize: "1.5em",
        //marginLeft: "10px",
    },
    primary: {
        color: "#6FE2D7",
        fontFamily: "Arimo",
        fontWeight: "bold",
    },
    secondary: {
        color: "#000000",
        fontFamily: "Arimo",
        fontWeight: "bold",

    },
    text_1: {
        color: "#009688",
        fontFamily: "Arimo",
        fontWeight: "bold",
        fontSize: "26px",
    },
}));

const MainDashboardArea = (props) => {
    const classes = useStyles();
    const [text, setText] = React.useState("");
    const [prev, setPrev] = React.useState(false);
    const [rec, setRec] = React.useState({
        Name: "",
        Age: 0,
        Gender: "",
        Symptoms: "",
        Diagnosis: "",
        Prescription: "",
        Advice: ""
    })
    var dummy_rec = rec;

    // var id;
    //
    // const setIDValue = (data) => {
    //     console.log("set id valueeeeee")
    //     for (var i = 0; i < data.length; i++) {
    //         if (data[i].userName === props.user) {
    //             id = data[i]._id;
    //         }
    //     }
    //
    //
    //         // .then(response => response.json())
    //         // .then(history.push('/dashboard'))
    // }

    //to save the change in the db
    function onReportChanges() {
        var report = {
            userName: props.user,
            name: rec.Name,
            age: rec.Age,
            gender: rec.Gender,
            symptoms: rec.Symptoms,
            diagnosis: rec.Diagnosis,
            prescription: rec.Prescription,
            advice: rec.Advice,
        }

        console.log("report data: ", report);

        fetch("http://localhost:3000/reports", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(report)
        })
            .then(response => response.json())
            .then(history.push('/dashboard'))
    }

    const getText = () => {
        const list = ["Name", "Age", "Gender", "Symptoms", "Diagnosis", "Prescription", "Advice"];
        for (var field in list) {
            var index = text.indexOf(list[6 - field]);
            // console.log("Looking for : "+ list[6-field]);
            // console.log(index);
            var changed_rec = rec;
            if (index != -1) {
                var listItem = list[6 - field];
                const listItemLength = listItem.length;
                index = index + listItemLength;
                var index2 = text.indexOf(list[7 - field]);
                if (index2 == -1) {
                    var ans = text.substring(index);
                } else {
                    var ans = text.substring(index, index2);
                }
                console.log(ans);
                //setRec( {...rec, [listItem] : ans} );
                changed_rec[listItem] = ans;

            }
            setRec(changed_rec);
        }
    }

    const createGridItem = (field) => {
        return (
            <Grid item>
                <TextField
                    variant="outlined"
                    margin="normal"
                    id={field}
                    label={field}
                    defaultValue={rec[field]}
                    onChange={(e) => {
                        dummy_rec[field] = e.target.value
                    }}
                />
            </Grid>
        )
    }

    const callBoth = () => {
        getText();
        setPrev(!prev);
    }
    const saveBoxes = () => {
        setRec(dummy_rec);

    }

    const generatePreview = () => {
        if (prev === false) {
            return;
        } else {
            return (

                <div>
                    <Paper
                        variant="outlined"
                        className={classes.ppr}
                    >
                        <Grid container
                              justify="center"
                              alignItems="center"
                              direction="row"
                        >
                            <Grid container
                                  item
                                  xs={4}
                                  direction="column"
                            >
                                {createGridItem("Name")}
                                {createGridItem("Age")}
                                {createGridItem("Gender")}
                                {createGridItem("Symptoms")}
                            </Grid>
                            <Grid container
                                  item
                                  xs={4}
                                  direction="column"
                            >
                                {createGridItem("Diagnosis")}
                                {createGridItem("Prescription")}
                                {createGridItem("Advice")}
                                <Grid item>
                                    <Button style={{marginTop: "10px"}}
                                            className={classes.buttons}
                                            onClick={() => {
                                                saveBoxes()
                                                onReportChanges()
                                            }}
                                            variant="outlined"
                                            color="primary"
                                    >
                                        Save Changes
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Paper>

                </div>
            )
        }
    }

    //speech to text
    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }


    const speechConfig = sdk.SpeechConfig.fromSubscription("b7c265fa60194e1db5d15aa3395952d0", "centralindia");
    speechConfig.enableDictation();
    speechConfig.speechRecognitionLanguage = 'en-IN';
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizing = (s, e) => {

    };
    // AYush? stop. Stop. stop
    recognizer.recognized = (s, e) => {

        if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {

            var realText2 = e.result.text;
            var checkStop = realText2.substring(realText2.length - 5, realText2.length);
            if (checkStop.indexOf("Stop.") != -1 || checkStop.indexOf("stop.") != -1) {
                recognizer.stopContinuousRecognitionAsync();
                realText = '';
                setText(text => text + realText);
            }
            var index = realText2.indexOf('?')
            var realText = "";
            if (index != -1) {
                realText = realText2.substring(0, index);
                console.log(realText + "After ");
            } else {
                realText = e.result.text;
            }
            console.log(realText);
            if (realText === 'Stop.' || realText === 'stop.' || realText === 'stop' || realText === 'Stop') {
                recognizer.stopContinuousRecognitionAsync();
                realText = '';
                setText(text => text + realText);
            } else if (realText === 'Name.' || realText === 'name.' || realText === 'name') {
                setText(text => text + 'Name');
            } else if (realText === 'age' || realText === 'age.' || realText === 'Age.' || realText === 'Edge.' || realText === 'edge.' || realText === 'edge' || realText === 'H.' || realText === 'H') {
                console.log("edge to age");
                setText(text => text + "Age");
            } else if (realText === 'gender.' || realText === 'gender' || realText === 'Gender.' || realText === 'gender male' || realText === 'gender female.' || realText === 'gender other.' || realText === 'gender male.' || realText === 'gender female') {
                if (realText === 'gender male.') {
                    setText(text => text + "Gender Male");
                } else if (realText === 'gender female.') {
                    setText(text => text + "Gender Female");
                } else if (realText === 'gender other.') {
                    setText(text => text + "Gender Other");
                } else {
                    setText(text => text + "Gender");
                }

            } else if (realText === 'male' || realText === 'male.' || realText === 'Male.' || realText === 'Mail.' || realText === 'mail.' || realText === 'Mail') {
                setText(text => text + "Male");
            } else if (realText === 'Symptoms.' || realText === 'symptoms.' || realText === 'symptoms') {
                setText(text => text + 'Symptoms');
            } else if (realText === 'Diagnosis.' || realText === 'diagnosis.' || realText === 'diagnosis') {
                setText(text => text + 'Diagnosis');
            } else if (realText === 'Prescription.' || realText === 'prescription.' || realText === 'prescription') {
                setText(text => text + 'Prescription');
            } else if (realText === 'advice.' || realText === 'Advice.' || realText === 'advice') {
                setText(text => text + 'Advice');
            } else {
                setText(text => text + realText);
            }

            /*setPText = realText;
            if(pText==='clear.' || pText==='Clear.'){
                setText(text => "");
            }
            console.log(pText);*/


        } else if (e.result.reason === sdk.ResultReason.NoMatch) {
            console.log("NOMATCH: Speech could not be recognized.");
        }

    };

    recognizer.canceled = (s, e) => {
        console.log(`CANCELED: Reason=${e.reason}`);

        if (e.reason === sdk.CancellationReason.Error) {
            console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
            console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
            console.log("CANCELED: Did you update the subscription info?");
        }

        recognizer.stopContinuousRecognitionAsync();
    };

    if (HeaderView() === '/dashboard') {
        return DashboardProfile();
    } else if (HeaderView() === '/voicehistory') {
        return VoiceContent();
    } else if (HeaderView() === '/recordvoice') {
        return <>
            <Breadcrumbs separator="›"
                         aria-label="breadcrumb">
                <Link className={classes.primary}
                      href="/"
                      onClick={handleClick}>
                    &nbsp;RecordVoice
                </Link>
                <Typography className={classes.secondary}>Home</Typography>
            </Breadcrumbs>
            <div className={classes.messg}>
                <Typography className={classes.text_1}>&nbsp;Record your voice here:-</Typography>
            </div>
            <Grid container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
            >
                <Grid item
                      container
                      alignItems="flex-start"
                      direction="column"
                      xs={7}
                >
                    <Grid className={classes.root}
                          item>
                        <TextField
                            id="standard-textarea"
                            label="Speech To Text"
                            placeholder="Message Displayed Here"
                            value={text}
                            multiline
                        />
                    </Grid>
                </Grid>
                <Grid item
                      container
                      direction="column"
                      justify="space-between"
                      alignItems="center"
                      xs={3}
                >
                    <Grid item>
                        <Button className={classes.buttonsp}
                                onClick={() => {
                                    recognizer.startContinuousRecognitionAsync()
                                }}
                        >
                            Start Recording
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button className={classes.buttonsp}
                                onClick={() => callBoth()}
                        >
                            Preview
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Typography className={classes.note}>Say STOP to end recording</Typography>
            <Typography className={classes.note2}>*Press preview to get the idea of schema</Typography>
            <Typography className={classes.note2}>*First speak the key word then its details in the same order as
                mentioned in preview</Typography>
            <Typography className={classes.note2}>*Ex: Speak like this: Name John (give a pause) Age 20 and so
                on</Typography>
            <Typography className={classes.note2}>*Speak clearly in a noise free environment and with pauses after each
                word</Typography>
            {generatePreview()}
        </>
    }
}

//comment

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

function HeaderView() {
    const location = useLocation();
    return location.pathname;
}

export const dashboard = (classes) => {
    return (
        <>
            <Breadcrumbs separator="›"
                         aria-label="breadcrumb">
                <Link color="inherit"
                      href="/"
                      onClick={handleClick}>
                    DashBoard
                </Link>
                <Typography color="textPrimary">Main</Typography>
            </Breadcrumbs>
            <div className={classes.messg}>
                <Typography color="primary">Will Be Complete Soon!!!</Typography>
            </div>

        </>
    )
}

const mapStateToProps = (state) => {
    return {user: state.email.userId}
}

export default connect (mapStateToProps, {signIn, signOut})(MainDashboardArea)