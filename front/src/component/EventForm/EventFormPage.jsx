import {Button, Container, Navbar, ToggleButton} from "react-bootstrap";
import {MultiEventForm} from "./MultiEventForm";
import {EditEventForm} from "./EditEventForm";
import {useState} from "react";

export function EventFormPage() {
    const [visibleParameters, setVisibleParameters] = useState(false);
    const [rootEvent, setRootEvent] = useState({
        date: "",
        name: "",
        sum: ""
    })

    return (
        <>
            <Navbar variant={"dark"} bg={"dark"} className={"ms-0"}>
                <Container>
                    <Navbar.Brand>Создать событие</Navbar.Brand>
                </Container>
            </Navbar>
            <div className={"ms-2"}>
                <ToggleButton id="toggle-check" type="checkbox" variant="outline-secondary" checked={visibleParameters}
                              value="1" onChange={(e) => {
                    setVisibleParameters(e.currentTarget.checked);
                }}>
                    Параметры
                </ToggleButton>

                {visibleParameters ? <MultiEventForm/> : null}

                <hr/>
            </div>

            <div className={"bg-dark text-bg-dark ms-2"}>
                <EditEventForm
                    eventIndex={0}
                    event={rootEvent}
                    inputChangeHandler={console.log}
                />
            </div>

            <div className={"bg-dark text-bg-dark ms-2"}>
                <hr/>
                <Button variant="secondary">
                    Save Changes
                </Button>
            </div>
        </>
    )
}