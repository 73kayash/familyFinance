import './App.css';
import moment from "moment";
import {Grid} from '../Calendar/Grid/Grid';
import {Calendar} from './AppStyle';
import {Monitor} from '../Calendar/Monitor/Monitor';
import {Title} from '../Calendar/Title/Title';
import {useState} from 'react';

function App() {

    moment.updateLocale("en", {week: {dow: 1}});
    moment.updateLocale('en', {
        months: [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
            "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ]
    });
    window.moment = moment();
    const [today, setToday] = useState(moment());

    const prevHandler = () => setToday(prev => prev.clone().subtract(1, 'month'));
    const todayHandler = () => setToday(moment());
    const nextHandler = () => setToday(next => next.clone().add(1, 'month'));

    return (
        <Calendar>
            {/* <Header /> */}
            <Title/>
            <Monitor
                today={today}
                prevHandler={prevHandler}
                todayHandler={todayHandler}
                nextHandler={nextHandler}
            />
            <Grid currentDay={today}/>
            {/* <Footer /> */}
        </Calendar>
    );
}

export default App;
