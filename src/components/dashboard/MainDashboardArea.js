import { makeStyles } from '@material-ui/core/styles';
import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useLocation } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



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
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link color="inherit" href="/" onClick={handleClick}>
                    DashBoard
                </Link>
            <Typography color="textPrimary">Main</Typography>
        </Breadcrumbs>
        <div className={classes.messg}>
            <Typography  color="primary">Will Be Complete Soon!!!</Typography>
        </div>
        
        </>
    )
}

export const recordvoice = (classes) => {
    
    return (
        <>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link color="inherit" href="/" onClick={handleClick}>
                    RecordVoice
                </Link>
            <Typography color="textPrimary">Main</Typography>
        </Breadcrumbs>
        <div className={classes.messg}>
            <Typography  color="primary">This will record your voice and store it</Typography>
        </div>
        <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-textarea"
          label="Speech To Text"
          placeholder="Message Displayed Here"
          multiline
        />
        <Button className={classes.buttons} variant="outlined" color="primary">
            Start Recording
        </Button>
        <Button className={classes.buttons} variant="outlined" color="secondary">
            Stop Recording
        </Button>
        </form>
        </>
    )
}

export const MainDashboardArea = () => {
    const classes = useStyles();
    if(HeaderView() === '/dashboard'){
        return dashboard(classes);
    }
    else if(HeaderView() === '/recordvoice'){
        return recordvoice(classes);
    }
}


