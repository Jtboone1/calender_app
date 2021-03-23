import React, { Component } from 'react'
import {    
    isSameMonth,
    isSameDay,
} from 'date-fns';

/*
* Functionality with each cell and their info will go here.
*/
export class CalendarCell extends Component {
    render() {
        return (
                <div
                    className={`col cell ${
                        !isSameMonth(this.props.day, this.props.monthStart)
                            ? 'disabled'
                            : isSameDay(this.props.day, this.props.selectedDate)
                            ? 'selected'
                            : ''
                    }`}
                    key={this.props.day}
                    onClick={() => this.props.onClickCell(this.props.cloneDay)}
                >
                    <span className="number">{this.props.formattedDate}</span>
                    <span className="bg">{this.props.formattedDate}</span>
                    <ul>
                        {this.props.tasks.map(task => {
                            return <li>{task}</li>
                        })}
                    </ul>
            </div>
        )
    }
}

export default CalendarCell
