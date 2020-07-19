import React from 'react';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Typography
} from '@material-ui/core';



const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    height: '100%'
  },
  content: {
    paddingLeft: 100,
    paddingRight: 100,
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
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },

}));

const VerificationMsg = props => {
  const { history } = props;

  const classes = useStyles();

  // const handleSubmit = event => {
  //   let inputs = document.getElementsByClassName('textField');
  //   console.log(inputs);
  //   event.preventDefault();
  // };

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5" >
        אישור סופי לשליחת הבקשה
      </Typography>

      <Typography color="textSecondary" gutterBottom >
        אנו נשלח את הבקשה בשמך לספק והוא מחוייב לפי חוק לנתק אותך לאלתר
      </Typography>
      
      <Typography color="textSecondary" gutterBottom >
        אלה הם הפרטים שנשלח לספק:
      </Typography>


      <Typography color="textSecondary" variant="body1" >
        אני מבקש להתנתק היום מכל השירותים של ספק השירות
      </Typography>

      <Typography color="textSecondary" variant="body1" >
        הריני מאשר בזאת כי קראתי את תנאי השימוש והתקנון ואני מסכים
      </Typography>
    </div>
  );
};


export default VerificationMsg;
