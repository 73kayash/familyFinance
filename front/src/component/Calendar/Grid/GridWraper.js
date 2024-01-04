import styled from 'styled-components'
import {Cell} from '../DaySell/DayStyle';

export const CalendarGrid = styled('div')`
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            grid-template-rows: repeat(6, 1fr);
            grid-gap: 1px;
            background-color: #494848;
`;

export const HeaderGrid = styled(CalendarGrid)`
    grid-gap: 0px;
    grid-template-rows: 1fr;
    padding-bottom: 1px;
`

export const HeaderCell = styled(Cell)`
    min-height: 12px;
    display: flex;
    justify-content: end;
    padding-right: 4px;
`