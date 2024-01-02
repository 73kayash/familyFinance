import {
    EventBody,
    EventButton,
    EventContent,
    EventFooter,
    EventFormStyle,
    EventInput,
    EventRow,
    EventTitle
} from "./EventStyle";

export function EventForm({formVisible, event, eventHandler, changeTextHandler}) {
    console.log(event);
    const isEvent = event != null ? (!!event.id) : false;
    console.log(isEvent);
    const title = isEvent ? event.date : (event != null && event.format('DD-MM-yyyy'));
    const sum = isEvent ? event.sum : null;
    const name = isEvent ? event.name : null;

    return (
        formVisible ? (
            <EventFormStyle onClick={() => eventHandler(null)}>
                <EventContent onClick={e => e.stopPropagation()}>
                    <EventTitle><h2>{title}</h2></EventTitle>
                    <EventBody>
                        <EventRow>
                            <p>Название</p>
                            <EventInput
                                value={name}
                                onChange={e => changeTextHandler(e.target.value, 'name')}
                            />
                        </EventRow>
                        <EventRow>
                            <p>Сумма</p>
                            <EventInput
                                value={sum}
                                onChange={e => changeTextHandler(e.target.value, 'sum')}
                            />
                        </EventRow>
                    </EventBody>
                    <EventFooter><EventButton>{isEvent ? 'Обновить' : 'Сохранить'}</EventButton></EventFooter>
                </EventContent>
            </EventFormStyle>
        ) : null
    )
}