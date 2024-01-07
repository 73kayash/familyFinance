import moment from "moment"
import {Button, Col, Row} from "react-bootstrap";

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
            style={{aspectRatio: 1, maxHeight: '130px', color: anotherMonth ? '#5d5d5d' : '', backgroundColor: weekend ? '#2b2f33' : '#212529'}}
        >
            <Row
                className={'pt-2 pe-2 justify-content-end'}
                style={{color: isCurrentDay ? 'rgb(25,135,84)' : (isNotWorkDay && !anotherMonth) && 'rgb(220, 53, 69)'}}
                // $anotherMonth={anotherMonth}
                // $isNotWorkDay={isNotWorkDay}
                // $currentDay={false}
                onClick={() => eventHandler(day)}>
                {displayedDay}
                {/*{isCurrentDay*/}
                {/*    ? <Day*/}
                {/*        $anotherMonth={false}*/}
                {/*        $currentDay={true}*/}
                {/*        $isNotWorkDay={isNotWorkDay}*/}
                {/*    >{displayedDay}</Day>*/}
                {/*    : displayedDay}*/}
            </Row>
            {cellDayEvents.map((eventItem) => {
                return (
                    <Row
                        key={eventItem.id}
                        className={"pe-2 ps-2 pb-sm-1"}
                    >
                        <Button
                            className={"small overflow-hidden"}
                            style={{textOverflow: "ellipsis", fontSize: 10}}
                            variant={eventItem.sum > 0 ? "outline-success" : "outline-danger"}
                            size="sm"
                            draggable={true}
                            onDragStart={() => startDragHandler(eventItem)}
                            key={eventItem.id + day.format('X')}
                            title={eventItem.sum + " р."}
                            onClick={() => eventHandler(eventItem)}>
                            {eventItem.name}
                        </Button>
                    </Row>)
            })
            }
        </Col>
    )
}