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

    useEffect(() => {
        fetch(`${url}event/changeAll?start=${startDay.format('X')}&end=${queryEnd.format('X')}`)
            .then(res => res.json())
            .then(res => setEvents(res));
    }, [currentDay])
    const eventHandler = (item) => {
        console.log(item);
        setEvent(item);
        setEventFormIsVisible(!eventFormIsVisible);
    };
    const changeTextHandler = (text, field) => {
        setEvent(prevState => ({
            ...prevState,
            [field]: text
        }))
    }
    return (
        <>
            {<EventForm
                formVisible={eventFormIsVisible}
                event={event}
                eventHandler={eventHandler}
                changeTextHandler={changeTextHandler}
            />}
            <HeaderGrid>
                {weekDays.map((self) => <HeaderCell key={self}>{self}</HeaderCell>)}
            </HeaderGrid>
            <CalendarGrid>
                {
                    days.map((_) => (
                        <DaySell
                            key={_.format('X')}
                            day={_}
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