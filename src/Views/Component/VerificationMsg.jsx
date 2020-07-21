import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, FormControlLabel,  Checkbox } from '@material-ui/core';



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
}));

const VerificationMsg = props => {
  const classes = useStyles();
  useEffect(() => {
    document.getElementById('fullnameDisplay').innerHTML =  `Full name ${document.getElementById('data1').innerHTML}`;
    document.getElementById('phoneNumDisplay').innerHTML =  `Phone: ${document.getElementById('data2').innerHTML}`;
    document.getElementById('emailDisplay').innerHTML =  `Email ${document.getElementById('data3').innerHTML}`;
    document.getElementById('idDisplay').innerHTML =  `ID ${document.getElementById('data4').innerHTML}`;
    document.getElementById('cc4Display').innerHTML =  `CC4 ${document.getElementById('data5').innerHTML}`;

  });

  return (
    <div className={classes.root}>
      <div className={classes.content} >
        <Typography className={classes.title} variant="h5" >
          אישור סופי לשליחת הבקשה
        </Typography>

        <Typography color="textSecondary" gutterBottom >
          אנו נשלח את הבקשה בשמך לספק והוא מחוייב לפי חוק לנתק אותך לאלתר
        </Typography>

        <Typography color="textSecondary" gutterBottom id="fullnameDisplay"> </Typography>
        <Typography color="textSecondary" gutterBottom id="phoneNumDisplay"> </Typography>
        <Typography color="textSecondary" gutterBottom id="emailDisplay"> </Typography>
        <Typography color="textSecondary" gutterBottom id="idDisplay"> </Typography>
        <Typography color="textSecondary" gutterBottom id="cc4Display"> </Typography>


        <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              color="primary"
              checked={true}
            />
          }
          label="אשמח לשמוע הצעה בחינם ממומחה של חברה אחרת"
        />
      </div>
    </div>
  );
};


export default VerificationMsg;
