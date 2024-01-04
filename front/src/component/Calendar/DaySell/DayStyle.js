import styled from 'styled-components';
import {ButtonMonth} from "../Monitor/MonitorStyle";

export const Cell = styled('div').attrs((props) => ({
    $isWeekend: props.$isWeekend
}))`
  min-width: 140px;
    min-height: 80px;
    background-color: ${(props) => props.$isWeekend ? '#272829' : '#1e1f21'};
    color: #dddcdd;
`;

export const Row = styled('div')`
    display: flex;
    justify-content: flex-start;
    padding: 1px;
`;

export const NumberRow = styled(Row)`
    justify-content: flex-end;
`

export const Day = styled('div').attrs((props) => ({
    $isNotWorkDay: props.$isNotWorkDay,
    $anotherMonth: props.$isNotWorkDay ? 'color: #f14949' : props.$anotherMonth && 'color: #5d5d5d',
    $currentDay: props.$currentDay &&
        'background: #510e18;' +
        '\nborder-radius: 50%;' +
        '\nheight: 100%;' +
        '\nwidth: 100%;' +
        '\naspect-ratio: 1;' +
        '\npadding-bottom: 2px;'
}))`
    height: 33px;
    width: 33px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px;
    cursor: pointer;
    user-select: none;
    ${(props) => props.$currentDay}
    ${(props) => props.$anotherMonth}
`

export const Event = styled(ButtonMonth).attrs((props) => ({
    $sum: props.$sum
}))`
    display: flex;
    justify-content: flex-start;
    background: ${(props) => props.$sum ? '#0e510e' : '#510e18'};
    color: #cdcdcd;
    display: inline-flex;
    margin-left: 7px;
    padding-left: 3px;
    padding-right: 3px;
    border-radius: 6px;
    cursor: pointer;
`