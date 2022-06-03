import styled from "styled-components"

export const TopReposSingleRepoContainer = styled.div`
cursor: pointer;
position: relative;
width: 100%;
height: 200px;
border-radius: 5px;
background: #f6f6f6;
box-shadow: 0 2px 10px 1px rgba(202, 197, 197, 0.25);
transition: all 0.2s ease-in-out;

 &:hover{
     transform: translateY(-2px);
     box-shadow: 0 2px 10px 2px rgba(110, 107, 107, 0.25);
}

`

export const Title = styled.div`
    &:before {
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
        content: '\f02d';
        margin-right: 10px;
        font-size: 20px;
    }
    padding:25px;
    font-size: 22px;
`

export const Subtitle = styled.div`
    padding: 0 25px;
    font-size: 14px;
    letter-spacing: 0.2px;
    color: #443e3e;
`

export const ButtomIconContainer = styled.div`
    width: 100%;
    position: absolute;
    bottom: 20px;
    font-size: 12px;
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 5fr;

`

export const Language = styled.div`
width: 100%;
    display: flex;
    padding: 0 10px 0 25px;

`
export const Stars = styled.div`
  &:before {
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
        content: '\f005';
        margin-right: 5px;
    }
    padding: 0 10px;
`

export const Forks = styled.div`
display: flex;
padding: 0 10px;
`

export const ForkIconImg = styled.img`
width: 12px;
padding-right: 5px;
`

export const ForkText = styled.div``

export const Size = styled.div`
padding: 0 25px 0 10px;
`

export const Text = styled.div`
`
export const Dot = styled.div`
    padding: 0 !important;
    height: 15px;
    width: 15px;
    background-color:${props => props.color};
    border-radius: 50%;
    margin-right: 5px;
`
