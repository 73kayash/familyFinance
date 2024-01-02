import {Cell, CurrentDay, Day, Event, Row, WithoutDay} from "./DayStyle"
import moment from "moment"

function isCurrentDay(day) {
    if (moment().isSame(day, 'day')) {
        return (
            <CurrentDay>{day.format('D')}</CurrentDay>
        );
    } else {
        return day.format('D');
    }
}

function isWithoutDay(day, currentDay, eventHandler) {
    if (currentDay.isSame(day, 'month')) {
        return (
            <Day onClick={() => eventHandler(day)}>
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

function createEvent(event, day, handler) {
    const date = moment(event.date);
    if (date.isSame(day, 'day')) {
        return (
            <Row key={event.id}>
                <Event
                    key={event.id + day.format('X')}
                    sum={event.sum}
                    onClick={() => handler(event)}>{event.name}
                </Event>
            </Row>
        )
    }
}

export function DaySell({day, currentDay, events, eventHandler}) {
    return (
        <Cell weekend={day.day() === 6 || day.day() === 0}>
            <Row justify={'flex-end'}>
                {isWithoutDay(day, currentDay, eventHandler)}
            </Row>
            {events.map((eventItem) => createEvent(eventItem, day, eventHandler))}
        </Cell>
    )
}