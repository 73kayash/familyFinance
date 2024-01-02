import {Cell, CurrentDay, Day, Row, WithoutDay} from "./DayStyle"
import moment from "moment"
import {Event} from "./DayStyle";

function isCurrentDay(day) {
    if (moment().isSame(day, 'day')) {
        return (
            <CurrentDay>{day.format('D')}</CurrentDay>
        );
    } else {
        return day.format('D');
    }
}

function isWithoutDay(day, currentDay) {
    if (currentDay.isSame(day, 'month')) {
        return (
            <Day>
                {isCurrentDay(day)}
            </Day>
        )
    } else {
        return (
            <WithoutDay>
                {isCurrentDay(day)}
            </WithoutDay>
        )
    }
}

function createEvent(event, day) {
    const date = moment(event.date);
    if (date.isSame(day, 'day')) {
        return (
            <Row><Event sum={event.sum}>{event.name}</Event></Row>
        )
    }
}

export function DaySell({day, currentDay, events}) {
    return (
        <Cell weekend={day.day() === 6 || day.day() === 0}>
            <Row justify={'flex-end'}>
                {isWithoutDay(day, currentDay)}
            </Row>
            {events.map((eventItem) => createEvent(eventItem, day))}
        </Cell>
    )
}