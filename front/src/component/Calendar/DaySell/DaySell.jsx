import { Cell } from "./DayStyle"
import { Row } from "./DayStyle"
import { Day } from "./DayStyle"
import moment from "moment"
import { CurrentDay } from "./DayStyle"
import { WithoutDay } from "./DayStyle"

function isCurrentDay(day) {    
    if(moment().isSame(day, 'day')) {
        return (
            <CurrentDay>{day.format('D')}</CurrentDay>
        );
    } else {
        return day.format('D');
    }
}

function isWithoutDay(day, currentDay) {
    if(currentDay.isSame(day, 'month')) {
        return (
            <Day>
                {isCurrentDay(day)}
            </Day>
        )
    } else {
        return (
            <WithoutDay>
                {isCurrentDay(day)}
            </WithoutDay>
        )
    }
}

export function DaySell({day, currentDay}) {
    return (
        <Cell weekend={day.day() === 6 || day.day() === 0}>
            <Row justify={'flex-end'}>
                {isWithoutDay(day, currentDay)}
            </Row>
        </Cell>
    )
}