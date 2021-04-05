import React from 'react'
import Button from '@material-ui/core/Button';

export default function TodoItem(props) {
    const lineThroughStyle = () => {
        return {
          textDecoration: props.todo.finished ? "line-through" : "none",
        };
      };


    return (
        <div style={{marginTop: "20px"}}>
          <div style={lineThroughStyle()}>{props.todo.task}
            <Button variant="contained" color="secondary" onClick={() => props.deleteTodo(props.todo.id)} style={{float: "right", marginRight: "10px"}}>
              Remove
            </Button>
            <div >
              <button onClick={() => props.markFinished(props.todo.id)}>Complete</button>
            </div>
          </div>
          
        </div>
        
    )
}
