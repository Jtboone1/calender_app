import React from 'react';
import {format} from "date-fns";
import SnaptoToday from "./SnaptoToday";
import OptionsMenu from "./OptionsMenu";

import {
    format,
    addDays,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    subMonths,
    addMonths
}
    from "date-fns";


// Format String
const dateFormat = "MMMM yyyy";

const MyComponent = ({currentMonth}) => {
    return (
        <React.Fragment>
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>{format(currentMonth, dateFormat)}</span>
                </div>

                <SnaptoToday/>
                <OptionsMenu/>


                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>

        </React.Fragment>
    );
};



export default MyComponent;
