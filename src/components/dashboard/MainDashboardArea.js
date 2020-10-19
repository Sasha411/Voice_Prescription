import {makeStyles} from '@material-ui/core/styles';
import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {useLocation} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

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
    buttons: {
        marginLeft: "20px",
    },
}));

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

function HeaderView() {
    const location = useLocation();
    console.log(location.pathname);
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

//speech to text
const speechConfig = sdk.SpeechConfig.fromSubscription("46120d9c892f430a8a7b2033df62afdc", "southeastasia");
const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

recognizer.recognizing = (s, e) => {
    console.log(`RECOGNIZING: Text=${e.result.text}`);
};

recognizer.recognized = (s, e) => {
    if (e.result.reason == sdk.ResultReason.RecognizedSpeech) {
        console.log(`RECOGNIZED: Text=${e.result.text}`);
    } else if (e.result.reason == sdk.ResultReason.NoMatch) {
        console.log("NOMATCH: Speech could not be recognized.");
    }
};

recognizer.canceled = (s, e) => {
    console.log(`CANCELED: Reason=${e.reason}`);

    if (e.reason == sdk.CancellationReason.Error) {
        console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
        console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
        console.log("CANCELED: Did you update the subscription info?");
    }

    recognizer.stopContinuousRecognitionAsync();
};

recognizer.sessionStopped = (s, e) => {
    console.log("\n    Session stopped event.");
    recognizer.stopContinuousRecognitionAsync();
};

export const recordvoice = (classes) => {
    return (
        <>
            <Breadcrumbs separator="›"
                         aria-label="breadcrumb">
                <Link color="inherit"
                      href="/"
                      onClick={handleClick}>
                    RecordVoice
                </Link>
                <Typography color="textPrimary">Main</Typography>
            </Breadcrumbs>
            <div className={classes.messg}>
                <Typography color="primary">This will record your voice and store it</Typography>
            </div>
            <form className={classes.root}
                  noValidate
                  autoComplete="off">
                <TextField
                    id="standard-textarea"
                    label="Speech To Text"
                    placeholder="Message Displayed Here"
                    multiline
                />
                <Button className={classes.buttons}
                        onClick={recognizer.startContinuousRecognitionAsync()}
                        variant="outlined"
                        color="primary">
                    Start Recording
                </Button>
                <Button className={classes.buttons}
                        onClick={recognizer.stopContinuousRecognitionAsync()}
                        variant="outlined"
                        color="secondary">
                    Stop Recording
                </Button>
            </form>
        </>
    )
}

export const MainDashboardArea = () => {
    const classes = useStyles();
    if (HeaderView() === '/dashboard') {
        return dashboard(classes);
    } else if (HeaderView() === '/recordvoice') {
        return recordvoice(classes);
    }
}


