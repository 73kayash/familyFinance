import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import moment from "moment";

export function EditEventForm({event, eventIndex, inputChangeHandler, activeDate, activeName, activeSum}) {
    moment.updateLocale('en', {
        months: [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
            "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ],
        weekdaysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        week: {dow: 1}
    })

    return (
        <Row className={"d-flex"}>
            <Row>
                <Col className="col-md-5 m-2 ps-0 pe-3 pt-2"
                     style={{border: '2px', borderColor: '#dee2e6', borderStyle: 'solid', borderRadius: '10px'}}>
                    <Row><Col>{event.name !== "" ?
                        <Button
                            className={"small overflow-hidden ms-2 m-2"}
                            style={{textOverflow: "ellipsis", fontSize: 10}}
                            variant={event.sum > 0 ? "outline-success" : "outline-danger"}
                            size="sm"
                            key={event.id}
                            title={event.sum + " р."}>
                            {event.name}
                        </Button> : null}</Col>
                    <Col className={"d-flex flex-sm-wrap align-content-center p-0 justify-content-start"}>{moment(event.date).format('DD MMMM yyyy ddd')}</Col></Row>
                    <Form.Control
                        disabled={activeDate}
                        className={`bg-dark text-bg-dark m-2 ${activeDate && 'd-none'}`}
                        type="date"
                        name="doj"
                        defaultValue={event.date !== "" ? event.date : moment().format("yyyy-MM-DD")}
                        placeholder="Дата события"
                        onChange={(e) => {
                            inputChangeHandler(eventIndex, e.target.value, "date");
                        }}/>
                    <Form.Control
                        // disabled={activeName}
                        className={`bg-dark text-bg-dark m-2 ${activeName && 'd-none'}`}
                        type={"text"}
                        value={event.name}
                        onChange={(e) => {
                            inputChangeHandler(eventIndex, e.target.value, "name");
                        }}
                        aria-placeholder={"Название"}/>
                    <InputGroup className={`m-2 ${activeSum && 'd-none'}`}>
                        <Form.Control
                            // disabled={activeSum}
                            value={event.sum}
                            className={"bg-dark text-bg-dark"}
                            aria-label="Dollar amount (with dot and two decimal places)"
                            onChange={(e) => {
                                inputChangeHandler(eventIndex, e.target.value, "sum");
                            }}
                        />
                        <InputGroup.Text className={"bg-dark text-bg-dark"}>р.</InputGroup.Text>
                    </InputGroup>
                </Col>
            </Row>
        </Row>
    )
}