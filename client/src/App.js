
import Calendar from "./components/Calendar";
import Todo from "./components/Todo";
import Options from "./components/Options"
import React, { useState } from "react";
import "./App.css";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function App() {
  const [view, setView] = useState("Calendar");

  const renderView = () => {
    if (view === "Calendar") {
      return <Calendar />
    }
    else if (view === "Todo") {
      return <Todo />;
    }
    else {
      return <Options />;
    }
  }

    return (
      <div className="App">
        <header>
          <div id="logo">
            <span className="icon">date_range</span>
            <span>
              Lethe <b>Calendar</b>
            </span>
            {}
            <div style={buttonDivStyle}>
              <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button onClick={() => setView("Calendar")}>Calendar</Button>
                <Button onClick={() => setView("Todo")}>To do list</Button>
                <Button onClick={() => setView("Options")}>Options</Button>
              </ButtonGroup>
            </div>
          </div>
        </header>
        <main>
          {renderView()}
        </main>
      </div>
    );
}

const buttonDivStyle = {
  marginTop: 10,
};

export default App;
