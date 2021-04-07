import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

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

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "25%"}}>
          <Switch
              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
          /> 
          <div style={{paddingTop: 10}}>
            Enable Email Notifications  
          </div>
          <TextField id="standard-basic" label="Email"/>
          <div style={{paddingTop: 50}}>
            <Switch
              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </div>
           
          <div>
            Enable SMS Notifications  
          </div>
          <TextField id="standard-basic" label="Phone Number"/>
        </div>
      </Paper>

    </div>
  );
}
