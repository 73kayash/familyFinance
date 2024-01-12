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
        changeDate: false,
        changeName: false,
        changeSum: false
    })
    const [eventList, setEventList] = useState([])

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

        let list = [...Array(betweenDate)];
        for (let i = 0; i < betweenDate; i++) {
            list[i] = {
                date: rootDate.clone().add(i + 1, 'month').format('yyyy-MM-DD'),
                name: rootEvent.name,
                sum: rootEvent.sum
            };
        }
        setEventList(list);
        // console.log(list);
        // console.log(betweenDate);
        // console.log(rootDate, lastDate);
        // console.log(multiState);
    }, [multiState])

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

                <hr/>
            </div>

            <div key={"page-body"} className={"bg-dark text-bg-dark ms-2"}>
                <EditEventForm
                    eventIndex={0}
                    event={rootEvent}
                    inputChangeHandler={changeRootHandler}
                    activeDate={false}
                    activeName={false}
                    activeSum={false}
                />

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
                <Button variant="secondary">
                    Сохранить
                </Button>
            </div>
        </>
    )
}