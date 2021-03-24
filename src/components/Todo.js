import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

export default function SimplePaper() {
  const classes = useStyles();
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("")

  const doit = (newText) => {

  }

  return (
    <div className={classes.root}>

      <Paper elevation={3} >
        <form className={classes.text} noValidate autoComplete="off">
          <TextField id="standard-basic" label="New Task" style={addTodoStyle}/>
          <Button variant="contained" color="primary" style={addButtonStyle} onClick={() => doit(newTodo)}>Add</Button>
          <ul>
            
          </ul>
        </form>
      </Paper>

    </div>
  );
}

const addTodoStyle = {
    height: 50,
    width: "80%"
}

const addButtonStyle = {
    height: 50,
    width: "15%"
}
