import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    '& > *': {
      margin: "auto",
      width: "50%",
      paddingLeft: "10px",

      height: theme.spacing(88),
    },
  },
  text: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


// TODO
// Add actually options to change the user options in the backend.
export default function Options() {
  const classes = useStyles();  
  const [sendEmail, toggleEmail] = useState(false);
  const [sendText, toggleText] = useState(false);
  const [emailString, setEmailString] = useState("");
  const [textString, setTextString] = useState("");
  const [alert, setAlert] = useState(false);
  const [notificationTime, setNotificationTime] = useState('hourly')

  // This just gets the todos from the data in the backend
  useEffect (() => {
    const getOptions = async () => {
    const response = await fetch("/api/usertasks", {
        method: "GET",
    })
      const jsonResponse = await response.json();
      toggleEmail(jsonResponse[0].sendemail);
      toggleText(jsonResponse[0].sendphonenumber);
      setEmailString(jsonResponse[0].email);
      setTextString(jsonResponse[0].phonenumber);
   }

   getOptions();
  }, [])

  // This updates the data in the backend whenever
  // we press apply in the options
    const saveChanges = async () => {
        const response = await fetch("/api/useroptions", {
            method: "PUT",
            body:  JSON.stringify({
              sendemail: sendEmail,
              sendphonenumber: sendText,
              email: emailString,
              phonenumber: textString,
              timeperiod: notificationTime
            }),
            headers: {
              'Content-Type': 'application/json'
            },
        })
        setAlert(true);
        console.log(response);
    }

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10%"}}>
          <h4>Notification Time</h4>
          <RadioGroup row aria-label="position" name="position" defaultValue="top">
            <FormControlLabel
              checked={notificationTime === "hourly"}
              control={<Radio color="primary" />}
              label="Hourly"
              labelPlacement="top"
              onChange={() => setNotificationTime("hourly")}
            />
            <FormControlLabel
              checked={notificationTime === "daily"}
              control={<Radio color="primary" />}
              label="Daily"
              labelPlacement="top"
              onChange={() => setNotificationTime("daily")}
            />
            <FormControlLabel
              checked={notificationTime === "weekly"}
              control={<Radio color="primary" />}
              label="Weekly"
              labelPlacement="top"
              onChange={() => setNotificationTime("weekly")}
            />
          </RadioGroup>

          <h4 style={{marginTop: 50}}>Notification Settings</h4>
          <Switch
              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              checked={sendEmail}
              onChange={() => toggleEmail(!sendEmail)}
          /> 
          <div style={{paddingTop: 10}}>
            Enable Email Notifications  
          </div>
          <TextField id="standard-basic" label="Email" disabled={!sendEmail} value={emailString} onChange={(e) => setEmailString(e.target.value)}/>
          <div style={{paddingTop: 50}}>
            <Switch
              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              checked={sendText}
              onChange={() => toggleText(!sendText)}
            />
          </div>
          <div>
            Enable SMS Notifications  
          </div>
          <TextField id="standard-basic" label="Phone Number" disabled={!sendText} value={textString} onChange={(e) => setTextString(e.target.value)}/>
          <Button variant="contained" color="primary" style={{marginTop: 50}} onClick={() => saveChanges()}>Apply</Button>
        </div>
      </Paper>
      <Snackbar
        open={alert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        severity="success"
        message="Options Successfully Updated!"
        autoHideDuration={1000}
        onClose={() => setAlert(false)}
      />
    </div>
  );
}
