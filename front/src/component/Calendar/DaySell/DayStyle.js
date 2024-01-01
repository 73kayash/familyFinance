import styled from 'styled-components';

export const Cell = styled.div`
    min-width: 70px;
    min-height: 40px;
    background-color: ${props => (props.weekend ? props.weekend : undefined) ? '#272829' : '#1e1f21'};
    color: #dddcdd;
`;

export const Row = styled.div`
    display: flex;
    justify-content: ${props => props.justify ? props.justify : 'flex-start'};
`;

export const Day = styled.div`
    height: 17px;
    width: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px
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