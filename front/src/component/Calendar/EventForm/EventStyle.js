import styled from "styled-components";
import {Calendar} from "../../App/AppStyle";

export const EventFormStyle = styled('div')`
    position: absolute;
    z-index: 100;
    background-color: rgba(0,0,0,0.35);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const EventContent = styled(Calendar)`
    width: 320px;
    background-color: #1E1F21;
    color: #DDDDDD;
    box-shadow: unset;
`

export const EventTitle = styled('div')`
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    min-height: 50px;
    padding: 4px 14px;
    text-align: center;
    font-size: .85rem;
    width: 100%;
    border: unset;
    background-color: #1E1F21;
    color: #DDDDDD;
    outline: unset;
}
`

export const EventBody = styled('div')`
    display: grid;
    padding: 4px 14px;
    font-size: .85rem;
    width: 100%;
    border: unset;
    background-color: #1E1F21;
    color: #DDDDDD;
    outline: unset;
`

export const EventInput = styled('textarea')`
    padding: 8px 12px;
    font-size: .85rem;
    margin: 5px;
    color: #DDDDDD;
    background: #1e1f21;
    border-radius: 12px;
    border-color: #464648;
    resize: none;
    height: 60px;
    width: 80%;
`

export const EventButton = styled('button').attrs((props) => ({
    $isDeleted: props.$isDeleted
}))`
    height: 36px;
    color: ${(props) => props.$isDeleted ? '#f14949' : '#dddddd'};
    background: #1e1f21;
    outline: unset;
    border: solid 3px #464648;
    border-radius: 12px;
    cursor: pointer;
    margin-left: 9px;
    
`

export const EventRow = styled('div')`
    display: inline-flex;
    justify-content: center;
`