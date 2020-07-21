import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  TextField,
  Checkbox,
  Typography
} from '@material-ui/core';

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  policy: {
    presence: { allowEmpty: false, message: 'is required' },
    checked: true
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    // paddingBottom: 50,
    flexBasis: 600,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2),
  },

  policy: {
    // marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },

}));

const Forms = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <form className={classes.form} >
        <Typography className={classes.title} variant="h5" >
        בקשה לניתוק
        </Typography>
        <Typography color="textSecondary" gutterBottom >
        אנא מלא את הפרטים הדרושים כדי שנוכל לשלוח בקשה לניתוק בשמך
        </Typography>

        <TextField className={classes.textField} fullWidth type="text" variant="outlined" label="שם מלא" id="fullName" />
        <TextField className={classes.textField} fullWidth type="text" variant="outlined" label="טלפון ליצירת קשר" id="phoneNum" />
        <TextField className={classes.textField} fullWidth type="text" variant="outlined" label="כתובת מייל לאישור" id="email" />
        <TextField className={classes.textField} fullWidth type="text" variant="outlined" label="תעודת זהות של בעל המנוי" id="subscriberID" />
        <TextField className={classes.textField} fullWidth type="text" variant="outlined" label="ארבע ספרות של אמצעי התשלום" id="meanOfPayment" />

        <div className={classes.policy}>
          <Checkbox className={classes.policyCheckbox} checked={true} color="primary" id="policy1" />
          <Typography className={classes.policyText} color="textSecondary" variant="body1" >
          אני מבקש להתנתק היום מכל השירותים של ספק השירות
          </Typography>
        </div>                
        <div className={classes.policy}>
          <Checkbox className={classes.policyCheckbox} color="primary" id="policy2" />
          <Typography className={classes.policyText} color="textSecondary" variant="body1" >
          הריני מאשר בזאת כי קראתי את תנאי השימוש והתקנון ואני מסכים
          </Typography>
        </div>
      </form>

    </div>
  );
};


export default Forms;
