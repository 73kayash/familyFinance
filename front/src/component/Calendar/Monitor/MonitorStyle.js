import styled from "styled-components";

export const MonitorDiv = styled('div')`
    display: flex;
    justify-content: space-between;
    background-color: #1E1F21;
    color: #DCDDDD;
    padding: 16px;
`

export const MonthYear = styled('span')`
    font-size: 32px;
`

export const Month = styled(MonthYear)`
    font-weight: bold;
    margin-right: 8px;
`

export const ButtonMonth = styled('button')`
    border: unset;
    outline: unset;
    background-color: #565759;
    height: 20px;
    margin-right: 2px;
    border-radius: 4px;
    color: #E6E6E6
`

export const TodayButton = styled(ButtonMonth)`
    padding-right: 16px;
    padding-left: 16px;
    font-weight: bold
`