
import Calendar from "./components/Calendar";
import React from "react";
import "./App.css";

function App() {
    return (
      <div className="App">
        <header>
          <div id="logo">
            <span className="icon">date_range</span>
            <span>
              Lethe <b>Calendar</b>
            </span>
          </div>
        </header>
        <main>
          <Calendar />
        </main>
      </div>
    );
}

export default App;
