import {Col, Form, Row, ToggleButton} from "react-bootstrap";
import {useState} from "react";

export function MultiEventForm() {

    const [lasDate, setLastDate] = useState(null);
    const [changeDate, setChangeDate] = useState(false);
    const [changeSum, setChangeSum] = useState(false);

    return (
        <div className={"bg-dark text-bg-dark p-2"}>
            <Row className={"p-2 w-50"}>
                <div>Последнее событие</div>
                <Form.Control
                    className={"bg-dark text-bg-dark m-2"}
                    type="date"
                    name="doj"
                    placeholder="Последнее событие"
                    onChange={(e) => {setLastDate(e.target.value)}}/>
            </Row>
            {lasDate != null ?
                <Row className={"p-2"}>
                    <Col>
                        <ToggleButton id="toggle-date" type="checkbox" variant="outline-secondary" checked={changeDate}
                                      value="1" onChange={(e) => {
                            setChangeDate(e.currentTarget.checked);
                        }}>
                            Изменение даты
                        </ToggleButton>
                    </Col>
                    <Col>
                        <ToggleButton id="toggle-sum" type="checkbox" variant="outline-secondary" checked={changeSum}
                                      value="1" onChange={(e) => {
                            setChangeSum(e.currentTarget.checked);
                        }}>
                            Изменение суммы
                        </ToggleButton>
                    </Col>
                </Row>
                : null}
            <Row>

            </Row>
        </div>
    )
}