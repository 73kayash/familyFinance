import {ButtonGroup, Form, Row, ToggleButton} from "react-bootstrap";

export function MultiEventForm({changeStateHandler, multiState}) {
    const radios = [
        { name: 'Любые дни', value: '1' },
        { name: 'Только рабочие дни', value: '2' },
        { name: 'Только выходные дни', value: '3' },
    ];

    return (
        <div className={"bg-dark text-bg-dark p-2"}>
            <Row className={"p-2 w-50"}>
                <div>Последнее событие</div>
                <Form.Control
                    className={"bg-dark text-bg-dark m-2"}
                    type="date"
                    name="doj"
                    defaultValue={multiState.lastDate}
                    placeholder="Последнее событие"
                    onChange={(e) => changeStateHandler('lastDate', e.target.value)}/>
            </Row>
            <ButtonGroup vertical>
                <ToggleButton id="toggle-date" type="checkbox" variant="outline-secondary" checked={multiState.changeDate}
                              value="1" onChange={(e) => changeStateHandler('changeDate', e.currentTarget.checked)}>
                    Изменение даты
                </ToggleButton>
                {multiState.changeDate ? radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={"outline-secondary"}
                    name="radio"
                    value={radio.value}
                    checked={multiState.workingDays === radio.value}
                    onChange={(e) => changeStateHandler('workingDays', e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
                )) : null}

                <ToggleButton id="toggle-name" type="checkbox" variant="outline-secondary" checked={multiState.changeName}
                              value="1" onChange={(e) => changeStateHandler('changeName', e.currentTarget.checked)}>
                    Изменение названия
                </ToggleButton>
                <ToggleButton id="toggle-sum" type="checkbox" variant="outline-secondary" checked={multiState.changeSum}
                              value="1" onChange={(e) => changeStateHandler('changeSum', e.currentTarget.checked)}>
                    Изменение суммы
                </ToggleButton>
            </ButtonGroup>
        </div>
    )
}