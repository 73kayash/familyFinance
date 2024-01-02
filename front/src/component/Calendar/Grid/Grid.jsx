import { DaySell } from "../DaySell/DaySell";
import { CallendarGrid } from "./GridWraper";
import { HeaderGrid } from "./GridWraper";
import { HeaderCell } from "./GridWraper";
import {useEffect, useState} from "react";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс",];
const url = "http://localhost:8080/api/v1/";

export function Grid({currentDay}) {
    const startDay = currentDay.clone().startOf('month').startOf('week');

    const start = startDay.clone().subtract(1, 'day');
    const days = [...Array(42)].map(() => start.add(1, 'day').clone());

    const queryEnd = startDay.clone().add(42, 'day');
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetch(`${url}event/changeAll?start=${startDay.format('X')}&end=${queryEnd.format('X')}`)
            .then(res => res.json())
            .then(res => setEvents(res));
    }, [currentDay])
    console.log(events);
    return (
        <>
            <HeaderGrid>
                {weekDays.map((self) => <HeaderCell>{self}</HeaderCell>)}
            </HeaderGrid>
            <CallendarGrid>
                {
                    days.map((_, i) => (
                        <DaySell key={i} day={_} currentDay={currentDay} events={events}/>
                    ))
                }
            </CallendarGrid>
        </>
    )
}