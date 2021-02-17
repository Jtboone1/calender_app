import React from 'react'

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
import CalendarCell from './CalendarCell'


/*
* Main calendar component. We can store user state here and
* pass each cell of the calendar date we save locally.
*/
class Calendar extends React.Component {

    // TODO
    // Task dates will have to be changed into something that
    // can be stored. A list with two items, a date and a task.
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        taskDates: [[new Date(), "Do laundry"]]
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
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        )
    }
}

export default Calendar