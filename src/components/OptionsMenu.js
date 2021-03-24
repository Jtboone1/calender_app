import React from 'react';
import {Button, Popover, OverlayTrigger, ButtonGroup} from 'react-bootstrap';

const popover = (
    <Popover id="popover-basic">
        <Popover.Title>Options:</Popover.Title>
        <Popover.Content>
            <ButtonGroup vertical>
                <Button variant={"outline-info"} size={"sm"}>Add Event</Button>
                <Button variant={"outline-info"} size={"sm"}>Add Remind</Button>
            </ButtonGroup>
        </Popover.Content>
    </Popover>
);

const OptionsMenu = () => {
    return (
        <React.Fragment>
            <OverlayTrigger trigger="focus" placement="right" overlay={popover}>
                <Button variant={"outline-info"} size={"sm"} data-toggle>Add event</Button>
            </OverlayTrigger>
        </React.Fragment>
)
}

export default OptionsMenu;


