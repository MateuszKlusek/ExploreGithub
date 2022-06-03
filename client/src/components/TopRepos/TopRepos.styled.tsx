import styled from "styled-components"

// helpers
import { device } from '../../utils/device.js'

export const TopReposContainer = styled.div`
    padding-top: 35px;
    max-width: 1400px;
    margin: auto;

    @media ${device.laptopL} {
        max-width: 90%;
    }
 

`

export const Container = styled.div`
    padding-top: 30px;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat( auto-fit, minmax(330px, 1fr) );
    place-items: center;
    justify-content: center;    

    
`

export const Title = styled.div`

    width: fit-content;
    font-size: 26px;
    background-image: linear-gradient(90deg, rgb(163, 164, 165) 50%, rgba(255, 255, 255, 0) 0px);
    background-position: center bottom;
    background-repeat: repeat-x;
    background-size: 12px 2px;
`

export const Subtitle = styled.div`
    font-size: 14px;
    padding-top: 5px;
    letter-spacing: 0.5px;
    color: #726d79;
`


