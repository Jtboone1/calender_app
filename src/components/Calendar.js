import React from 'react';

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
} from 'date-fns'

// Other NPM functionality
import CalendarCell from './CalendarCell';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Calendar extends React.Component {

    // TODO
    // Task dates will have to be changed into something that
    // can be stored. A list with two items, a date and a task.
    state = {
        newItemTask: "",
        today: new Date(),
        currentMonth: new Date(),
        selectedDate: new Date(),
        taskDates: [[new Date(), "Do laundry"], [new Date(), "Take out trash"]]
    }
    

    // This changes currentMonth and selectedDate state to the today state which is today
    goToToday = () => {
        this.setState({
            currentMonth: this.state.today,
            selectedDate: this.state.today
        })
    }


    appendNewTask = () => {
        const newDates = this.state.taskDates;
        const newDate = this.state.selectedDate;
        const newTask = this.state.newItemTask;

        this.setState({
            taskDates: [...newDates,  [newDate, newTask]]
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
        const dateFormat = 'MMMM yyyy'

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>{format(this.state.currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        )
    }

    // Renders days of the week.
    renderDays() {
        const dateFormat = 'EEEE'
        const days = []

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
        const { currentMonth, selectedDate } = this.state
        const monthStart = startOfMonth(currentMonth)
        const monthEnd = endOfMonth(monthStart)
        const startDate = startOfWeek(monthStart)
        const endDate = endOfWeek(monthEnd)

        const dateFormat = 'd'
        const rows = []

        let days = []
        let day = startDate
        let formattedDate = ''

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
        return <div className="body">{rows}</div>
    }

    // Function where we can add functionality when clicking a date cell.
    onDateClick = (day) => {
        this.setState({
            selectedDate: day,
        })
    }

    // Used to switch months
    nextMonth = () => {
        this.setState({
            currentMonth: addMonths(this.state.currentMonth, 1),
        })
    }

    prevMonth = () => {
        this.setState({
            currentMonth: subMonths(this.state.currentMonth, 1),
        })
    }

    render() {
        return (
          <div>
            
              <form noValidate autoComplete="off">
                <div style={{display: "flex", flexDirection: "row"}}>
                  <TextField id="standard-basic" label="Add New Task" onChange={(e) => this.changeTaskText(e)}/>
                  <Button variant="contained" color="primary" onClick={() => this.appendNewTask()}>Add Task</Button>
                  <Button style={{float: "right"}} variant="contained" color="secondary" onClick={() => this.clearCell()}>Clear Cell</Button>
                </div>
              </form>
            
            <div>
                
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

export default Calendar
