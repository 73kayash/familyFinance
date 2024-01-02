// noinspection JSUnresolvedVariable

import styled from 'styled-components';
import {ButtonMonth} from "../Monitor/MonitorStyle";

export const Cell = styled('div')`
    min-width: 140px;
    min-height: 80px;
    background-color: ${(props) => (props.weekend ? props.weekend === 'true' : undefined) ? '#272829' : '#1e1f21'};
    color: #dddcdd;
`;

export const Row = styled('div')`
    display: flex;
    justify-content: ${(props) => props.justify ? props.justify : 'flex-start'};
`;

export const Day = styled('div')`
    height: 33px;
    width: 33px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px;
    cursor: pointer;
    user-select: none;
`;

export const CurrentDay = styled(Day)`
    background: #f00;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    aspect-ratio: 1;
    padding-bottom: 2px;
`

export const WithoutDay = styled(Day)`
    color: #5d5d5d;
`

export const Event = styled(ButtonMonth)`
    display: flex;
    justify-content: flex-start;
    background: ${(props) => props.sum > 0 ? '#0e510e' : '#510e18'};
    color: #cdcdcd;
    display: inline-flex;
    margin-left: 7px;
    padding-left: 3px;
    padding-right: 3px;
    border-radius: 6px;
    cursor: pointer;
`