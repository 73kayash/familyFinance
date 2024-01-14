import {DaySell} from "../DaySell/DaySell";
import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {EventFormOld} from "../EventForm/EventFormOld";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const url = "http://localhost:8080/api/v1";

export function Grid({currentDay}) {
    const startDay = currentDay.clone().startOf('month').startOf('week');
    const start = startDay.clone().subtract(1, 'day');
    const weeks = [...Array(6)].map(() => [...Array(7)].map(() => start.add(1, 'day').clone()));
    const queryEnd = startDay.clone().add(42, 'day');

    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState(null);
    const [eventFormIsVisible, setEventFormIsVisible] = useState(false);
    const [workDaysString, setWorkDays] = useState([]);
    // getEvents
    useEffect(() => {
        fetch(`${url}/event/changeAll?start=${startDay.format('X')}&end=${queryEnd.format('X')}`)
            .then(res => res.json())
            .then(res => setEvents(res));

        fetch(`https://isdayoff.ru/api/getData?date1=${startDay.format('yyyyMMDD')}&date2=${queryEnd.format('yyyyMMDD')}&delimeter=,`, {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => setWorkDays(result.split(",")))
            .catch(error => console.log('error', error));
    }, [currentDay])
    // Обработчик открытия модального окна
    const eventHandler = (item) => {
        item != null ? (item.sum != null ? setEvent(item) : setEvent({
            id: null,
            name: "",
            sum: "",
            date: item.format('yyyy-MM-DD')
        })) : setEvent(null);
        setEventFormIsVisible(item != null);
    };
    // Обработчик изменения текста в полях модального окна
    const changeTextHandler = (text, field) => {
        setEvent(prevState => ({
            ...prevState,
            [field]: text
        }))
    }
    // Обработчик обновления\сохранения новых значений
    const fetchHandler = () => {
        const fetchUrl = event.id ? `${url}/event/${event.id}` : `${url}/event/new`;
        const isUpdate = !!event.id;
        const httpMethod = isUpdate ? "PATCH" : "POST";
        fetch(fetchUrl, {
            method: httpMethod,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(event)
        })
            .then(res => res.json())
            .then(res => {
                isUpdate
                    ? setEvents(prevState => prevState.map(element => element.id === res.id ? res : element))
                    : setEvents(prevState => [...prevState, res]);
                eventHandler(null);
            })
    }
    const deleteHandler = () => {
        const fetchUrl = `${url}/event/${event.id}`;
        fetch(fetchUrl, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(() => {
                setEvents(prevState => prevState.filter(element => element.id !== event.id));
                eventHandler(null);
            })
    }
    const startDragHandler = (dragItem) => {
        setEvent(dragItem);
    }
    const dropEventHandler = (e, day) => {
        e.preventDefault();
        event.date = day.format('yyyy-MM-DD');
        fetchHandler();
    }

    return (
        <>
            {eventFormIsVisible ? <EventFormOld
                event={event}
                eventHandler={eventHandler}
                changeTextHandler={changeTextHandler}
                fetchHandler={fetchHandler}
                deleteHandler={deleteHandler}
            /> : null}
            <Container className={"text-bg-dark bg-dark mb-3"}>
                <Row key="rowDayOfWeeks" className={"text-bg-dark bg-dark"}>
                    {weekDays.map((self) => <Col key={self}>{self}</Col>)}
                </Row>
                <div className={"bg-light"}>
                    {
                        weeks.map((week, j) => (
                            <Row key={"week" + j}>
                                {
                                    week.map((day, i) => (
                                        <DaySell
                                            key={day.format('X')}
                                            day={day}
                                            currentDay={currentDay}
                                            events={events}
                                            eventHandler={eventHandler}
                                            isNotWorkDay={workDaysString[i + (j * 7)] === "1"}
                                            startDragHandler={startDragHandler}
                                            dropEventHandler={dropEventHandler}/>
                                    ))
                                }
                            </Row>
                        ))
                    }
                </div>
                <hr/>
            </Container>
        </>
    )
}