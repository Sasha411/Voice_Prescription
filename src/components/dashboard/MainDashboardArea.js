import {makeStyles} from '@material-ui/core/styles';
import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {useLocation} from 'react-router-dom'
import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
import { Button, Grid, Paper, TextField } from '@material-ui/core';
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
    buttons: {
        marginLeft: "20px",
    },
    note: {
        marginTop: "40px",
        marginLeft: "10px",
    },
    ppr: {
        marginTop: "40px",
        marginLeft: "10px",
    },
    gItem: {
        marginTop: "5px",
        fontSize: "1.5em",
        //marginLeft: "10px",
    }
}));

export const MainDashboardArea = (props) => {
    const classes = useStyles();
    const [text,setText] = React.useState("");
    const [prev,setPrev] = React.useState(false);
    const [rec,setRec] = React.useState({
        Name: "Dummy",
        Age: 0,
        Gender: "",
        Symptoms: "",
        Diagnosis: "",
        Prescription: "",
        Advice: ""
    })
    var dummy_rec = rec;
    
    const getText = () => {
        const list = ["Name","Age","Gender","Symptoms","Diagnosis","Prescription","Advice"];
        for(var field in list){
            var index = text.indexOf(list[6-field]);
            console.log("Looking for : "+ list[6-field]);
            console.log(index);
            var changed_rec = rec;
            if(index!= -1){
                var listItem = list[6-field];
                const listItemLength = listItem.length;
                index = index + listItemLength;
                var index2 = text.indexOf(list[7-field]);
                if(index2==-1){
                    var ans= text.substring(index);
                }
                else{
                    var ans= text.substring(index,index2);
                }
                console.log(ans);
                //setRec( {...rec, [listItem] : ans} );
                changed_rec[listItem] = ans;

            }
            setRec(changed_rec);
        }

            //await axios.GET( `localhost::3000/${unique.ID}/${report.ID})

        
    }
    const createGridItem = (field) => {
        return (
            <Grid item>
                {/* <Typography
                color="primary"
                className={classes.gItem}
                >
                    {field}: {rec[field]}
                </Typography> */}
                <TextField
                    variant="outlined"
                    margin="normal"
                    id={field}
                    label={field}
                    defaultValue={rec[field]}
                    onChange={(e) => {dummy_rec[field]=e.target.value}}
                    //name="firstname"
                    //autoComplete="firstname"
                    //autoFocus
                /> 
                
            </Grid>
        )
    }

    const callBoth = () =>{
        getText();
        setPrev(!prev);
    }
    const saveBoxes = () =>{
        setRec(dummy_rec);

    }
    

    const generatePreview = () => {
        if(prev===false){
            return;
        }
        else{
            return (
                
                <div>
                    <Paper
                        variant="outlined"
                        className={classes.ppr}
                    >
                        <Grid container
                            justify="flex-start"
                            alignItems="flex-start"
                            direction="column"
                            
                        >
                            {createGridItem("Name")}
                            {createGridItem("Age")}
                            {createGridItem("Gender")}
                            {createGridItem("Symptoms")}
                            {createGridItem("Diagnosis")}
                            {createGridItem("Prescription")}
                            {createGridItem("Advice")}
                        </Grid>
                        
                    </Paper>
                <Button style={{marginTop: "10px"}} className={classes.buttons}
                        onClick={() => {saveBoxes()}}
                        variant="outlined"
                        color="primary">
                    Save Changes
                </Button>

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
speechConfig.speechRecognitionLanguage='en-IN';
const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizing = (s, e) => {
   
    };
    // AYush? stop. Stop. stop
    recognizer.recognized = (s, e) => {
        
        if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
            
            var realText2 = e.result.text;
            var checkStop = realText2.substring(realText2.length-5,realText2.length);
            if(checkStop.indexOf("Stop.")!=-1 || checkStop.indexOf("stop.")!=-1){
                recognizer.stopContinuousRecognitionAsync();
                realText = '';
                setText(text => text + realText);
            }
            var index = realText2.indexOf('?')
            var realText = "";
            if(index!=-1){
                realText = realText2.substring(0,index);
                console.log(realText + "After ");
            }
            else{
                realText = e.result.text;
            }
            console.log(realText);
            if(realText === 'Stop.' || realText === 'stop.'){
                recognizer.stopContinuousRecognitionAsync();
                realText = '';
                setText(text => text + realText);
            }
            else if(realText === 'Edge.' || realText === 'edge.' || realText === 'edge' || realText === 'H.' || realText === 'H'){
                console.log("edge to age");
                setText(text => text + "Age");
            }
            else if(realText === 'gender.' || realText === 'gender' || realText === 'Gender.' || realText === 'gender male' || realText === 'gender female.' || realText === 'gender other.' || realText === 'gender male.' || realText === 'gender female' ){
                if(realText==='gender male.'){
                    setText(text => text + "Gender Male");
                }
                else if(realText === 'gender female.'){
                    setText(text => text + "Gender Female");
                }
                else if(realText === 'gender other.'){
                    setText(text => text + "Gender Other");
                }
                else{
                    setText(text => text + "Gender");
                }
                
            }
            else if (realText === 'Mail.' || realText === 'mail.' || realText === 'Mail'){
                setText(text => text + "Male");
            }
            else if(realText === 'Symptoms.' || realText === 'symptoms.'){
                setText(text => text + 'Symptoms' );
            }
            else if(realText === 'Diagnosis.' || realText === 'diagnosis.' ){
                setText(text => text + 'Diagnosis');
            }
            else if(realText === 'Prescription.' || realText === 'prescription.'){
                setText(text => text + 'Prescription');
            }
            else if(realText === 'advice.' || realText === 'Advice.'){
                setText(text => text + 'Advice');
            }
            else{
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
                <Button className={classes.buttons}
                        onClick={() => callBoth()  }
                        variant="outlined"
                        color="primary">
                    Preview
                </Button>
            </form>
    <Typography className={classes.note} color="primary">* Say Stop to end the recording</Typography>
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









