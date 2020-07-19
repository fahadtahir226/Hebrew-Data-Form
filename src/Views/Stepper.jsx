import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, Button, Typography, Paper, StepConnector } from '@material-ui/core';
import {  useSnackbar } from 'notistack';
import { auth } from '../Firebase/auth'
import { db } from '../Firebase/firestore'

import Boxes from './Component/Boxes';
import Form from './Component/Form';
import VerificationMsg from './Component/VerificationMsg';
import { SignUpCall } from '../Firebase/auth';

const useStyles = makeStyles((theme) => ({
  rootWrapper: {
    background: "#8c9ea3",
    padding: theme.spacing(4),
    height: '100vh',
  },
  root: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(1),
  },

  backButton: {
    marginLeft: theme.spacing(1),
    border: "2px solid #27AE60",
    color: "#27AE60",
    borderRadius: 0,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepIcon: {
    color: "#27AE60 !important",
    '&$completed': {
      color: '#27AE60',
    },
  },
  
}));


function getStepContent(stepIndex, handleNext) {
  switch (stepIndex) {
    case 0:
      return <Boxes handleNext={handleNext} />;
    case 1:
      return <Form />;
    case 2:
      return <VerificationMsg />;
    default:
      return '';
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const handleNext = () => {
    if(activeStep === 1 ){
      let name = document.getElementById('fullName').value,
      phoneNum = document.getElementById('phoneNum').value,
      email  = document.getElementById('email').value,
      subscribe = document.getElementById('subscriberID').value,
      payment  = document.getElementById('meanOfPayment').value,
      brand = document.getElementById('selectedImage').innerHTML,
      userData = {name, phoneNum, email, subscribe, payment, brand}
      let 
      checkBox1 = document.getElementById('policy1').checked,
      checkBox2 = document.getElementById('policy2').checked;
      console.log(brand);

      console.log(name, phoneNum, email, subscribe, payment, checkBox1, checkBox2);
      if(name.length <1 || phoneNum.length <1 || email.length <1 || subscribe.length <1 || payment.length <1){
        enqueueSnackbar('All Fields are Mandatory!', { variant: 'error' });
        return;
      }
      else if( !checkBox1 || !checkBox2 ){
        enqueueSnackbar('You Must Agree with all Policies!', { variant: 'error' });
        return
      }
      else{
        let authenticate = SignUpCall();
        authenticate
        .then((user) => {
          console.log(user);
          enqueueSnackbar("Sucessfully done", { variant: "success" })
          auth.currentUser.sendEmailVerification().then(function() {
            console.log("Email Sent!");
            db.collection('Users').doc(auth.currentUser.uid).set(userData)
            .then(() => console.log("User Data Added to firebase!"))
            .catch(err => console.log("Error while saving to database", err.message));
          })
          .catch(function(error) {
            // An error happened.
            console.log("Error in sending email", error.message);
          });
        })
        .catch(err => {
          enqueueSnackbar(err.message, { variant: "error" })
          return;
        })
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const ColorlibConnector = withStyles({
    active: {
      '& $line': { background: '#27AE60' },
    },
    completed: {
      '& $line': { background: '#27AE60' },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector);
  return (
    <div className={classes.rootWrapper} >
        
    <Paper className={classes.root}>
      <Stepper activeStep={activeStep}  alternativeLabel connector={<ColorlibConnector />} style={{color: "#27AE60", paddingBottom: 0}} >
          <Step key="בחר ספק">
            <StepLabel StepIconProps={{ classes: { completed: classes.stepIcon, active: classes.stepIcon }}} >בחר ספק</StepLabel>
          </Step>
          <Step key="מלא פרטים">
            <StepLabel StepIconProps={{ classes: { completed: classes.stepIcon, active: classes.stepIcon }}}>מלא פרטים</StepLabel>
          </Step>
          <Step key="שלח בקשת התנתקות">
            <StepLabel StepIconProps={{ classes: { completed: classes.stepIcon, active: classes.stepIcon }}}>שלח בקשת התנתקות</StepLabel>
          </Step>
      </Stepper>
      <div>
        <div>
          <div className={classes.instructions}>{getStepContent(activeStep, () => handleNext)}</div>
          {
            (activeStep > 0 && activeStep < 4) ? 
            <div>
            <Button 
              variant="contained"
              onClick={handleNext}
              disabled={activeStep > 2}
              style={{color: "white", background: "#27AE60", borderRadius: 0, border: "2px solid #27AE60",}}
              >
              המשך לאישור
            </Button>
            <Button
              disabled={activeStep === 0 || activeStep >= 2} 
              onClick={handleBack}
              className={classes.backButton}
              >
              חזרה
            </Button>
          </div>
          : null
        }
        </div>
      </div>
    </Paper>
    <span id='selectedImage' style={{color: '#8c9ea3'}}  ></span>
    </div>
  );
}