import {Monitor} from "./Monitor/Monitor";
import {Grid} from "./Grid/Grid";
import moment from "moment";
import {useState} from "react";


export function Calendar() {
    moment.updateLocale('en', {
        week: {dow: 1},
        months: [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
            "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ]
    });
    const [today, setToday] = useState(moment());

    const prevHandler = () => setToday(prev => prev.clone().subtract(1, 'month'));
    const todayHandler = () => setToday(moment());
    const nextHandler = () => setToday(next => next.clone().add(1, 'month'));

    return (
        <>
            <Monitor
                today={today}
                prevHandler={prevHandler}
                todayHandler={todayHandler}
                nextHandler={nextHandler}
            />
            <Grid currentDay={today}/>
        </>
    )
}