import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { v4 as uuidv4 } from 'uuid';
import TodoItem from "./TodoItem";

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
  const [todoName, setTodoName] = useState("")

  const addTodo = (task) => {

    if (task !== "") {
        const newTodo = {
            id: uuidv4(),
            task,
            finished: false
        };
    
        setTodoList([...todoList, newTodo]);
        setTodoName("");
    }
  }

  const deleteTodo = id => {
      let newTodoList = todoList.filter(todo => todo.id !== id);
      setTodoList(newTodoList);
  };

   // Toggle Finished
   const markFinished = id => {
    console.log(id)
    setTodoList(todoList.map(todo => {
        if (todo.id === id) {
          todo.finished = !todo.finished;
        }
        return todo;
    }))
  };


  return (
    <div className={classes.root}>

      <Paper elevation={3} >
        <form className={classes.text} noValidate autoComplete="off">
          <TextField id="standard-basic"  value={todoName} label="New Task" style={addTodoStyle} onChange={(e) => setTodoName(e.target.value)}/>
          <Button variant="contained" color="primary" style={addButtonStyle} onClick={() => addTodo(todoName)}>Add</Button>
          
        </form>
        {todoList.map((todo) => (
          <TodoItem 
            key={todo.id} 
            todo={todo}  
            deleteTodo={deleteTodo}
            markFinished={markFinished}/>
        ))}
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
