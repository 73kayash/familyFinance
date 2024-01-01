import { DaySell } from "../DaySell/DaySell";
import { CallendarGrid } from "./GridWraper";
import { HeaderGrid } from "./GridWraper";
import { HeaderCell } from "./GridWraper";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс",];

export function Grid({currentDay}) {
    const startDay = currentDay.clone().startOf('month').startOf('week');

    const start = startDay.clone().subtract(1, 'day');
    const days = [...Array(42)].map(() => start.add(1, 'day').clone());
    return (
        <>
            <HeaderGrid>
                {weekDays.map((self) => <HeaderCell>{self}</HeaderCell>)}
            </HeaderGrid>
            <CallendarGrid>
                {
                    days.map((_, i) => (
                        <DaySell key={i} day={_} currentDay={currentDay}/>
                    ))
                }
            </CallendarGrid>
        </>
    )
}