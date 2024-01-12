import moment from "moment"
import {Col, Row} from "react-bootstrap";
import {Event} from "../Event/Event";

export function DaySell({day, currentDay, events, eventHandler, isNotWorkDay, startDragHandler, dropEventHandler}) {
    const weekend = day.day() === 6 || day.day() === 0;
    const anotherMonth = !day.isSame(currentDay, 'month');
    const isCurrentDay = moment().isSame(day, 'day');
    const displayedDay = day.format('D');
    const cellDayEvents = events.filter((eventItem) => moment(eventItem.date).isSame(day, 'day'));

    return (
        <Col
            className={`border border-light overflow-hidden`}
            onDragOver={e => e.preventDefault()}
            onDrop={(e) => dropEventHandler(e, day)}
            style={{
                aspectRatio: 1,
                maxHeight: '130px',
                color: anotherMonth ? '#5d5d5d' : '',
                backgroundColor: weekend ? '#2b2f33' : '#212529'
            }}
        >
            <Row
                className={'pt-2 pe-2 justify-content-end'}
                style={{color: isCurrentDay ? 'rgb(25,135,84)' : (isNotWorkDay && !anotherMonth) && 'rgb(220, 53, 69)'}}
                onClick={() => eventHandler(day)}>
                {displayedDay}
            </Row>
            {cellDayEvents.map((eventItem) => {
                return (
                    <Row
                        key={eventItem.id}
                        className={"pe-2 ps-2 pb-sm-1"}
                        style={{maxWidth: '85%'}}
                    >
                        <Event
                            eventItem={eventItem}
                            eventHandler={eventHandler}
                            startDragHandler={startDragHandler}
                        />
                    </Row>)
            })
            }
        </Col>
    )
}