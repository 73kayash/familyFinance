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

export function EventForm({event, eventHandler, changeTextHandler, fetchHandler}) {
    const isEvent = !!event.id;
    const title = event.sum != null ? event.date : event.format('yyyy-MM-DD');
    const sum = event.sum ? event.sum : "";
    const name = event.name ? event.name : "";

    return (
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
                <EventFooter><EventButton
                    onClick={fetchHandler}>{isEvent ? 'Обновить' : 'Сохранить'}</EventButton></EventFooter>
            </EventContent>
        </EventFormStyle>
    )
}