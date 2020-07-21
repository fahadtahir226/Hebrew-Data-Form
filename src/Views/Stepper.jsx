import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, Button, Paper, StepConnector } from '@material-ui/core';
import {  useSnackbar } from 'notistack';
import firebase from '../Firebase/firebase'

import Boxes from './Component/Boxes';
import Form from './Component/Form';
import VerificationMsg from './Component/VerificationMsg';

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


function getStepContent(stepIndex, handleBoxes) {
  switch (stepIndex) {
    case 0:
      return <Boxes handleBoxes={handleBoxes} />;
    case 1:
      return <Form />;
    case 2:
      return <VerificationMsg />;
    default:
      return 'Thank You';
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const handleBoxes = () => {
    setActiveStep(1);
  }
  const handleNext = () => {
    if(activeStep === 1 ){
      let name = document.getElementById('fullName').value,
      phoneNum = document.getElementById('phoneNum').value,
      email  = document.getElementById('email').value,
      subscribe = document.getElementById('subscriberID').value,
      payment  = document.getElementById('meanOfPayment').value,
      brand = document.getElementById('selectedImage').innerHTML,
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
        document.getElementById('data1').innerHTML = name;
        document.getElementById('data2').innerHTML = phoneNum;
        document.getElementById('data3').innerHTML = email;
        document.getElementById('data4').innerHTML = subscribe
        document.getElementById('data5').innerHTML = payment;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
    else if(activeStep === 2){
      let userData = { 
        name : document.getElementById('data1').innerHTML,
        phoneNum : document.getElementById('data2').innerHTML,
        email : document.getElementById('data3').innerHTML,
        subscribe : document.getElementById('data4').innerHTML,
        payment : document.getElementById('data5').innerHTML,
        brand: document.getElementById('selectedImage').innerHTML,
      }
      firebase.auth().createUserWithEmailAndPassword(userData.email, userData.email)
      .then(res => {
        firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
          console.log(res.user.uid)
          firebase.firestore().collection('Users').doc(res.user.uid).set(userData)
          .then(() => {enqueueSnackbar("User Data Sucessfully Submitted!", { variant: "success" }); setActiveStep((prevActiveStep) => prevActiveStep + 1)})
          .catch(err => enqueueSnackbar(err.message, { variant: "error" }))
        })
        .catch(err => enqueueSnackbar(err.message, { variant: "error" }))
      })
      .catch(err => enqueueSnackbar(err.message, { variant: "error" }))
    }
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
          <div className={classes.instructions}>{getStepContent(activeStep, handleBoxes)}</div>
          {
            (activeStep == 1 || activeStep == 2 ) ? 
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
              disabled={activeStep === 0 || activeStep > 2} 
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
    <span style={{color: '#8c9ea3'}} id='selectedImage'  ></span>
    <span style={{color: '#8c9ea3'}} id="data1"> </span>
    <span style={{color: '#8c9ea3'}} id="data2"> </span>
    <span style={{color: '#8c9ea3'}} id="data3"> </span>
    <span style={{color: '#8c9ea3'}} id="data4"> </span>
    <span style={{color: '#8c9ea3'}} id="data5"> </span>

    </div>
  );
}