import {EventBody, EventButton, EventContent, EventFormStyle, EventInput, EventRow, EventTitle} from "./EventStyle";

export function EventFormOld({event, eventHandler, changeTextHandler, fetchHandler, deleteHandler}) {
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
                        <EventInput
                            value={name}
                            placeholder="Название"
                            onChange={e => changeTextHandler(e.target.value, 'name')}
                        />
                    </EventRow>
                    <EventRow>
                        <EventInput
                            value={sum}
                            placeholder="Сумма"
                            onChange={e => changeTextHandler(e.target.value, 'sum')}
                        />
                    </EventRow>
                    <EventRow>
                        {isEvent ?
                            <EventButton
                                $isDeleted={true}
                                onClick={deleteHandler}>
                                Удалить
                            </EventButton>
                            : null
                        }
                        <EventButton
                            onClick={fetchHandler}>{isEvent ? 'Обновить' : 'Сохранить'}
                        </EventButton>
                    </EventRow>
                </EventBody>
            </EventContent>
        </EventFormStyle>
    )
}