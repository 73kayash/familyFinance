import {Button} from "react-bootstrap";

export function Event({eventItem, startDragHandler, eventHandler}) {
    return (
        <Button
            className={"small overflow-hidden ms-2"}
            style={{textOverflow: "ellipsis", fontSize: 10}}
            variant={eventItem.sum > 0 ? "outline-success" : "outline-danger"}
            size="sm"
            draggable={true}
            onDragStart={() => startDragHandler(eventItem)}
            key={eventItem.id}
            title={eventItem.sum + " р."}
            onClick={() => eventHandler(eventItem)}>
            {eventItem.name}
        </Button>
    )
}