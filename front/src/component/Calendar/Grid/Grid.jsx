import {DaySell} from "../DaySell/DaySell";
import {CalendarGrid, HeaderCell, HeaderGrid} from "./GridWraper";
import {useEffect, useState} from "react";
import {EventForm} from "../../EventForm/EventForm";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс",];
const url = "http://localhost:8080/api/v1/";

export function Grid({currentDay}) {
    const startDay = currentDay.clone().startOf('month').startOf('week');
    const start = startDay.clone().subtract(1, 'day');
    const days = [...Array(42)].map(() => start.add(1, 'day').clone());
    const queryEnd = startDay.clone().add(42, 'day');

    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState(null);
    const [eventFormIsVisible, setEventFormIsVisible] = useState(false);
    // getEvents
    useEffect(() => {
        fetch(`${url}event/changeAll?start=${startDay.format('X')}&end=${queryEnd.format('X')}`)
            .then(res => res.json())
            .then(res => setEvents(res));
    }, [currentDay])
    // Обработчик открытия модального окна
    const eventHandler = (item) => {
        item != null ? (item.sum != null ? setEvent(item) : setEvent({
            id: null,
            name: "",
            sum: "",
            date: item.format('yyyy-MM-DD')
        })) : setEvent(null);
        setEventFormIsVisible(!eventFormIsVisible);
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
        const fetchUrl = event.id ? `${url}/event/${event.id}` : `${url}/event/new`
        const httpMethod = event.id ? "patch" : "post";
        console.log(fetchUrl);
        console.log(httpMethod);
        console.log(event);
        // fetch(fetchUrl, {
        //     method: httpMethod,
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify(event)
        // })
        //     .then(res => res.json())
        //     .then(res => console.log(res))
    }

    return (
        <>
            {eventFormIsVisible ? <EventForm
                event={event}
                eventHandler={eventHandler}
                changeTextHandler={changeTextHandler}
                fetchHandler={fetchHandler}
            /> : null}
            <HeaderGrid>
                {weekDays.map((self) => <HeaderCell key={self}>{self}</HeaderCell>)}
            </HeaderGrid>
            <CalendarGrid>
                {
                    days.map((day) => (
                        <DaySell
                            key={day.format('X')}
                            day={day}
                            currentDay={currentDay}
                            events={events}
                            eventHandler={eventHandler}
                        />
                    ))
                }
            </CalendarGrid>
        </>
    )
}