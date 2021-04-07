import React from "react";
// Used for date logic
import {
    format,
    addDays,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    subMonths,
    addMonths,
  startOfToday
} from 'date-fns'

// Other NPM functionality
import CalendarCell from './CalendarCell';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Calendar extends React.Component {
    state = {
        newItemTask: "",
        today: new Date(),
        currentMonth: new Date(),
        selectedDate: new Date(),
        taskDates: []
    }

    // When we load the page, here we just make a call to the DB to 
    // get the users tasks, and then load them into the state.
    componentDidMount() {
        const getCalendarTasks = async () => {
            const response = await fetch("/api/usertasks", {
                method: "GET",
            })
            const jsonResponse = await response.json();
            console.log(jsonResponse[0].userTasks);

            const userTasksFromDB = [];
            for (let i = 0; i < jsonResponse[0].userTasks.length; i++) {
                userTasksFromDB.push([new Date(jsonResponse[0].userTasks[i][0]), jsonResponse[0].userTasks[i][1]]);
            }

            this.setState({
                taskDates: userTasksFromDB
            })
        }
        getCalendarTasks();
    }

    // This calls the saveChanges function every time the data in the state
    // changes. Its what keeps the state from changing when
    // switching tabs in the app.
    componentDidUpdate() {
        this.saveChanges();
    }

    // This is the function that updates the data in the backend
    saveChanges = async () => {
        const response = await fetch("/api/usertasks", {
            method: "PUT",
            body:  JSON.stringify({userTasks: this.state.taskDates}),
            headers: {
              'Content-Type': 'application/json'
            },
        })
        console.log(response);
    }

    appendNewTask = () => {
        const newDates = this.state.taskDates;
        const newDate = this.state.selectedDate;
        const newTask = this.state.newItemTask;

        this.setState({
            taskDates: [...newDates,  [newDate, newTask]],
            newItemTask: ""
        })
    }

    clearCell = () => {
        const filteredTaskObjects = [];
        for (let i = 0; i < this.state.taskDates.length; i++) {
            if (
                this.state.taskDates[i][0].getDate() !== this.state.selectedDate.getDate() ||
                this.state.taskDates[i][0].getMonth() !== this.state.selectedDate.getMonth() ||
                this.state.taskDates[i][0].getFullYear() !== this.state.selectedDate.getFullYear()
            ) 
            {
                const newTask = [this.state.taskDates[i][0], this.state.taskDates[i][1]]
                filteredTaskObjects.push(newTask);
            }
        }

        this.setState({
            taskDates: filteredTaskObjects
        })
    }

    setNewTask = (date) => {
        this.setState({ 
            newItemDate: date
        })
    }
    
    changeTaskText = (e) => {
        this.setState({
            newItemTask: e.target.value
        })
    }

    // Renders Month / Year header
    renderHeader() {

        // Format String
        const dateFormat = "MMMM yyyy";

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span className="header-month" onClick={this.snaptotoday}>
                        {format(this.state.currentMonth, dateFormat)}
                    </span>
                </div>
                <div className="col col-end">
                    <div className="icon" onClick={this.nextMonth}>chevron_right</div>
                </div>
            </div>
        );
    }

    // Renders days of the week.
    renderDays() {
        const dateFormat = "EEEE";
        const days = [];

        let startDate = startOfWeek(this.state.currentMonth)

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            )
        }

        return <div className="days row">{days}</div>
    }

    renderCells() {
        const {currentMonth, selectedDate} = this.state
        const monthStart = startOfMonth(currentMonth)
        const monthEnd = endOfMonth(monthStart)
        const startDate = startOfWeek(monthStart)
        const endDate = endOfWeek(monthEnd)

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        // Basically just loop through all dates of a month
        // and push them into the grid
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat)
                const cloneDay = day
                let tasks = [];
                for (let i = 0; i < this.state.taskDates.length; i++) {

                    // If the has the same date as the task date, we pass it into the cell component.
                    if (
                        this.state.taskDates[i][0].getDate() === day.getDate() &&
                        this.state.taskDates[i][0].getMonth() === day.getMonth() &&
                        this.state.taskDates[i][0].getFullYear() === day.getFullYear()
                    ) {
                        tasks.push(this.state.taskDates[i][1]);
                    }
                }

                days.push(
                    <CalendarCell
                        formattedDate={formattedDate}
                        cloneDay={cloneDay}
                        day={day}
                        monthStart={monthStart}
                        selectedDate={selectedDate}
                        onClickCell={this.onDateClick}
                        tasks={tasks}
                    />
                )
                day = addDays(day, 1)
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            )
            days = []
        }
        return <div className="body">{rows}</div>;
    }

    // Function where we can add functionality when clicking a date cell.
    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    };

    // Used to switch months
    nextMonth = () => {
        this.setState({
            currentMonth: addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: subMonths(this.state.currentMonth, 1)
        });
    };

    snaptotoday = () => {
        const {currentMonth, selectedDate} = this.state;
        const monthStart = startOfToday(currentMonth);
        const todayStart = startOfToday(selectedDate);

        this.setState({
            currentMonth: monthStart,
            selectedDate: todayStart
        });
    };

    render() {
        return (
          <div>
            <div> 
              <form noValidate autoComplete="off">
                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                  <TextField id="standard-basic" label="Add New Task" value={this.state.newItemTask} onChange={(e) => this.changeTaskText(e)} style={{margin: "6px"}}/>
                  <Button variant="contained" color="primary" onClick={() => this.appendNewTask()} style={{margin: "6px"}}>Add Task</Button>
                  <Button variant="contained" color="secondary" onClick={() => this.clearCell()} style={{margin: "6px"}}>Clear Cell</Button>
                </div>
              </form>
            </div>
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        </div>
        )
    }
}

export default Calendar;
