import {CellProps, DayProps, Event, NumberRow, Row} from "./DayStyle"
import moment from "moment"

export function DaySell({day, currentDay, events, eventHandler}) {
    const weekend = day.day() === 6 || day.day() === 0;
    const anotherMonth = !day.isSame(currentDay, 'month');
    const isCurrentDay = moment().isSame(day, 'day');
    const displayedDay = day.format('D');
    const cellDayEvents = events.filter((eventItem) => moment(eventItem.date).isSame(day, 'day'));
    return (
        <CellProps $isWeekend={weekend}>
            <NumberRow>
                <DayProps $anotherMonth={anotherMonth} $currentDay={false} onClick={() => eventHandler(day)}>
                    {isCurrentDay ? <DayProps $anotherMonth={false} $currentDay={true}>{displayedDay}</DayProps> : displayedDay}
                </DayProps>
            </NumberRow>
            {cellDayEvents.map((eventItem) => {return (
                <Row key={eventItem.id}>
                    <Event
                        key={eventItem.id + day.format('X')}
                        $sum={eventItem.sum > 0}
                        onClick={() => eventHandler(eventItem)}>
                        {eventItem.name}
                    </Event>
                </Row>)})
            }
        </CellProps>
    )
}