import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
}));

export default function SimplePaper() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Paper elevation={3} >
         
      </Paper>
      <Paper  elevation={3}/>

    </div>
  );
}