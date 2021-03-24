import React from 'react';
import PropTypes from 'prop-types';

const DayCell = ({currentMonth,currentDay}) => {
    return (
        <React.Fragment>
            <h2>{currentMonth + currentDay}</h2>
        </React.Fragment>
    );
};

DayCell.defaultProps = {
    currentMonth : 'September',
    currentDay: 'TGIF',
}

DayCell.propTypes = {
    
};

export default DayCell;