import {Button, ButtonGroup, Container, Navbar, ToggleButton} from "react-bootstrap";
import {MultiEventForm} from "./MultiEventForm";
import {EditEventForm} from "./EditEventForm";
import {useEffect, useState} from "react";
import moment from "moment";

export function EventFormPage() {
    const [visibleParameters, setVisibleParameters] = useState(false);
    const [rootEvent, setRootEvent] = useState({
        date: "",
        name: "",
        sum: ""
    })
    const [multiState, setMultiState] = useState({
        lastDate: moment().format('yyyy-MM-DD'),
        workingDays: '1',
        changeDate: false,
        changeName: false,
        changeSum: false
    })
    const [eventList, setEventList] = useState([])
    const [workingCalendar, setWorkingCalendar] = useState(new Map())
    window.workingCalendar = workingCalendar;
    const getWorkingCalendarData = (getDate) => {
        fetch(`https://isdayoff.ru/api/getData?year=${getDate.format('yyyy')}&month=${getDate.format('MM')}&delimeter=,`, {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => {
                let resArr = result.split(",");
                setWorkingCalendar(prevState => prevState.set(getDate.format('yyyy-MM'), resArr))
            })
            .catch(error => console.log('error', error));
    }
    const refreshWorkingCalendar = (monthCount) => {
        let getMonthCount;
        if(monthCount < 10 || workingCalendar.size < 12) {
            getMonthCount = 12;
        } else if(monthCount > workingCalendar.size - 3) {
            getMonthCount = workingCalendar.size * 2;
        }
        let calendarEmpty = new Map();
        for(let i = 0; i < getMonthCount; i++) {
            let date = moment(rootEvent.date).add(i, 'month');
            let key = date.format('yyyy-MM');
            let value = workingCalendar.get(key)
            if(value === undefined) {
                value = new Map();
                getWorkingCalendarData(date);
            }
            calendarEmpty.set(key, value);
        }
        setWorkingCalendar(calendarEmpty);
    }
    const getDay = (day) => {
        let date = moment(day);
        let key = date.format('yyyy-MM');
        let dayInDict = date.format('DD');
        let dictionary = workingCalendar.get(key);
        let result;
        if(dictionary !== undefined) {
            result = dictionary[dayInDict - 1];
        }
        if(result !== undefined && ((multiState.workingDays === '2' && result !== '0') || (multiState.workingDays === '3' && result !== '1'))) {
            return getDay(date.subtract(1, 'day').format('yyyy-MM-DD'))
        }else {
            return day;
        }
    }

    useEffect(() => {
        if (rootEvent.name === "" || rootEvent.sum === "") {
            return;
        }
        let rootDate;
        if (rootEvent.date !== "") {
            rootDate = moment(rootEvent.date)
        }
        let lastDate;
        if (multiState.lastDate !== "") {
            lastDate = moment(multiState.lastDate);
        }
        if (lastDate == null || rootDate == null) {
            return;
        }
        let betweenDate = lastDate.diff(rootDate, 'months');
        if (betweenDate < 1) {
            return;
        }

        refreshWorkingCalendar(betweenDate);
        let list = [...Array(betweenDate)];
        for (let i = 0; i <= betweenDate; i++) {
            let day = rootDate.clone().add(i, 'month').format('yyyy-MM-DD');
            if(multiState.changeDate && multiState.workingDays !== '1') {
                day = getDay(day);
            }
            list[i] = {
                date: day,
                name: rootEvent.name,
                sum: rootEvent.sum
            };
        }
        setEventList(list);
    }, [multiState, rootEvent])

    const changeMultiStateHandler = (field, value) => {
        setMultiState(prevState => ({
            ...prevState,
            [field]: value
        }))
    }
    const changeRootHandler = (index, text, field) => {
        setRootEvent(prevState => ({
            ...prevState,
            [field]: text
        }))
    }

    return (
        <>
            <Navbar variant={"dark"} bg={"dark"} className={"ms-0"}>
                <Container>
                    <Navbar.Brand>Создать событие</Navbar.Brand>
                </Container>
            </Navbar>
            <div key={"page-header"} className={"ms-2"}>
                <ButtonGroup>
                    <ToggleButton id="toggle-check" type="checkbox" variant="outline-secondary"
                                  checked={visibleParameters}
                                  value="1" onChange={(e) => {
                        setVisibleParameters(e.currentTarget.checked);
                    }}>
                        Параметры
                    </ToggleButton>
                    <Button variant={"secondary"}>Сохранить</Button>
                </ButtonGroup>
                {visibleParameters ?
                    <MultiEventForm changeStateHandler={changeMultiStateHandler} multiState={multiState}/> : null}

                <EditEventForm
                    eventIndex={0}
                    event={rootEvent}
                    inputChangeHandler={changeRootHandler}
                    activeDate={false}
                    activeName={false}
                    activeSum={false}
                />

                <hr/>
            </div>

            <div key={"page-body"} className={"bg-dark text-bg-dark ms-2"}>


                {eventList.map((self, index) =>
                    <EditEventForm
                        key={"childEventByIndex" + index}
                        eventIndex={index}
                        event={self}
                        inputChangeHandler={console.log}
                        activeDate={!multiState.changeDate}
                        activeName={!multiState.changeName}
                        activeSum={!multiState.changeSum}
                    />
                )}
            </div>

            <div key={"page-footer"} className={"bg-dark text-bg-dark ms-2"}>
                <hr/>
            </div>
        </>
    )
}