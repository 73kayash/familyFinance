import {Cell, Day, Event, NumberRow, Row} from "./DayStyle"
import moment from "moment"

export function DaySell({day, currentDay, events, eventHandler, isNotWorkDay, startDragHandler, dropEventHandler}) {
    const weekend = day.day() === 6 || day.day() === 0;
    const anotherMonth = !day.isSame(currentDay, 'month');
    const isCurrentDay = moment().isSame(day, 'day');
    const displayedDay = day.format('D');
    const cellDayEvents = events.filter((eventItem) => moment(eventItem.date).isSame(day, 'day'));

    return (
        <Cell
            $isWeekend={weekend}
            onDragOver={e => e.preventDefault()}
            onDrop={(e) => dropEventHandler(e, day)}
        >
            <NumberRow>
                <Day
                    $anotherMonth={anotherMonth}
                    $isNotWorkDay={isNotWorkDay}
                    $currentDay={false}
                    onClick={() => eventHandler(day)}>
                    {isCurrentDay
                        ? <Day
                            $anotherMonth={false}
                            $currentDay={true}
                            $isNotWorkDay={isNotWorkDay}
                        >{displayedDay}</Day>
                        : displayedDay}
                </Day>
            </NumberRow>
            {cellDayEvents.map((eventItem) => {
                return (
                    <Row
                        key={eventItem.id}>
                        <Event
                            draggable={true}
                            onDragStart={() => startDragHandler(eventItem)}
                            key={eventItem.id + day.format('X')}
                            title={eventItem.sum + " р."}
                            $sum={eventItem.sum > 0}
                            onClick={() => eventHandler(eventItem)}>
                            {eventItem.name}
                        </Event>
                    </Row>)
            })
            }
        </Cell>
    )
}