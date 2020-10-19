import {makeStyles} from '@material-ui/core/styles';
import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {useLocation, Redirect} from 'react-router-dom'
import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
import { Button, TextField } from '@material-ui/core';



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
    note: {
        marginTop: "40px",
        marginLeft: "10px",
    }
}));

export const MainDashboardArea = (props) => {
    const classes = useStyles();
    const [text,setText] = React.useState([]);
    //const [stop,setStop] = React.useState(null);
    ///

     //speech to text
     function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
    

const speechConfig = sdk.SpeechConfig.fromSubscription("46120d9c892f430a8a7b2033df62afdc", "southeastasia");
const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

// if(stop===null || stop===true){
//     recognizer.speechEndDetected = (s, e) => {
//         recognizer.stopContinuousRecognitionAsync();
//     }
//     recognizer.speechEndDetected();
//     recognizer.sessionStopped = (s, e) => {
//         console.log("\n    Session stopped event.");
//         recognizer.stopContinuousRecognitionAsync();
//     };

// }
// else{
    recognizer.recognizing = (s, e) => {
   
    };
    
    recognizer.recognized = (s, e) => {
        
        if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
            if(e.result.text === 'Stop.' || e.result.text === 'stop.'){
                recognizer.stopContinuousRecognitionAsync();
            }
            setText(text => [...text, e.result.text]);
            
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
    
//}





    ///
    
    if (HeaderView() === '/dashboard') {
        return dashboard(classes);
    } else if (HeaderView() === '/recordvoice') {
        return <>
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
                    value={text}
                    multiline
                />
                <Button className={classes.buttons}
                        onClick={() => {recognizer.startContinuousRecognitionAsync()}}
                        variant="outlined"
                        color="primary">
                    Start Recording
                </Button>
                {/* <Button className={classes.buttons}
                        onClick={() => { 
                            recognizer.stopContinuousRecognitionAsync();
                            setStop(true);
                            }}
                        variant="outlined"
                        color="secondary">
                    Stop Recording
                </Button> */}
            </form>
            <Typography className={classes.note} color="primary">* Say Stop to end the recording</Typography>
        </>
    }
}


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









