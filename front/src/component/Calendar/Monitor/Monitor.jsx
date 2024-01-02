import { MonitorDiv } from "./MonitorStyle"
import { Month } from "./MonitorStyle"
import { MonthYear } from "./MonitorStyle"
import { ButtonMonth } from "./MonitorStyle"
import { TodayButton } from "./MonitorStyle"

export function Monitor({today, prevHandler, todayHandler, nextHandler}) {
    return (
        <MonitorDiv>
            <div>
                <Month>{today.locale('ru').format('MMMM')}</Month>
                <MonthYear>{today.format('YYYY')}</MonthYear>
            </div>
            <div>
                <ButtonMonth onClick={prevHandler}>  &lt; </ButtonMonth>
                <TodayButton onClick={todayHandler}>Сегодня</TodayButton>
                <ButtonMonth onClick={nextHandler}> &gt; </ButtonMonth>
            </div>
        </MonitorDiv>
    )
}