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
    display: flex;
    flex-direction: column;

    &:hover{
        transform: translateY(-2px);
        box-shadow: 0 2px 10px 2px rgba(110, 107, 107, 0.25);
    }
`

export const Title = styled.div`
    box-sizing: border-box;
    height: 50px;
    font-size: 22px;
    padding:  15px 15px 0 15px;
    &:before {
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
        content: '\f02d';
        margin-right: 10px;
        font-size: 20px;
    }
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap;
`

export const Subtitle = styled.div`
    box-sizing: border-box;
    height: 120px;;
    font-size: 14px;
    letter-spacing: 0.2px;
    color: #443e3e;
    overflow: hidden; 
    padding: 15px;
    text-overflow: ellipsis; 
    /* white-space: nowrap; */
`

export const ButtomIconContainer = styled.div`
    height: 30px;
    width: 100%;
    font-size: 12px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    background: #dbd6dc;
`

export const Language = styled.div`
    display: flex;
    padding: 0 10px 0 15px;

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
    padding: 0 5px;
`

export const ForkIconImg = styled.img`
    width: 12px;
    padding-right: 5px;
`

export const ForkText = styled.div``

export const Size = styled.div`
    padding: 0 10px 0 10px;
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
