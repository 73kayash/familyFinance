import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import moment from "moment";
import {useState} from "react";

export function EditEventForm({event, eventIndex, inputChangeHandler}) {

    const [selectedDate, setSelectedDate] = useState(moment().format("yyyy-MM-DD"));

    function handleOnChange(event) {
        setSelectedDate(event.target.value);
    }

    return (
        <Row className={"d-flex"}>
            <Row>
                <Col className="col-md-5 m-2 ps-0 pe-3 pt-2"
                     style={{border: '2px', borderColor: '#dee2e6', borderStyle: 'solid', borderRadius: '10px'}}>
                    {event != null ?
                        <Button
                            className={"small overflow-hidden ms-2 m-2"}
                            style={{textOverflow: "ellipsis", fontSize: 10}}
                            variant={event.sum > 0 ? "outline-success" : "outline-danger"}
                            size="sm"
                            key={event.id}
                            title={event.sum + " р."}>
                            {event.name}
                        </Button> : null}
                    <Form.Control
                        className={"bg-dark text-bg-dark m-2"}
                        type="date"
                        name="doj"
                        defaultValue={selectedDate}
                        placeholder="Дата события"
                        onChange={(e) => {handleOnChange(e); inputChangeHandler(eventIndex, e.target.value, "date")}}/>
                    <Form.Control
                        className={"bg-dark text-bg-dark m-2"}
                        type={"text"}
                        onChange={(e) => inputChangeHandler(eventIndex, e.target.value, "name")}
                        aria-placeholder={"Название"}/>
                    <InputGroup className={"m-2"}>
                        <Form.Control className={"bg-dark text-bg-dark"}
                                      aria-label="Dollar amount (with dot and two decimal places)"
                                      onChange={(e) => inputChangeHandler(eventIndex, e.target.value, "sum")}
                        />
                        <InputGroup.Text className={"bg-dark text-bg-dark"}>р.</InputGroup.Text>
                    </InputGroup>
                </Col>
            </Row>
        </Row>
    )
}