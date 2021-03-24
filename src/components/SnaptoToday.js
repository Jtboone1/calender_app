import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const SnaptoToday = ({snaptotoday}) => {
    return (
        <React.Fragment>
            <Button variant={"outline-info"} size={"sm"} onClick={snaptotoday}>Today</Button>
        </React.Fragment>
    );
};

SnaptoToday.propTypes = {

};

export default SnaptoToday;
