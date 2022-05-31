import styled, { keyframes } from 'styled-components'
import { device } from '../../utils/device'

export const SearchContainer = styled.div`
  width: 100%;
  padding-top: clamp(3rem, 5vw, 5rem);
  position: relative;
  /* min-height: 100vh; */
  overflow-x: hidden;
  overflow-y: hidden;
`
interface IPopupContainer {
  red: number
  green: number
  blue: number
}

export const PopupContainer = styled.div<IPopupContainer>`
  display: grid;
  max-width: 400px;
  width: 90%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 5fr 1fr;
  height: clamp(170px, 30vw, 200px);
  background: ${(props) => `rgba(${props.red},${props.green},${props.blue},0.8)`};
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 150px;
  z-index: 100;
  padding: 15px;
  border-radius: 10px;
  display: none;
  border: 2px solid #2e1e1e;
`
export const PopupTitle = styled.div`
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  text-align: center;
  letter-spacing: 1px;
  padding-top: 10px;
  padding-bottom: 30px;
  font-weight: 800;
`

export const PopupMessage = styled.div`
  grid-column: 1/3;
  font-size: clamp(0.8rem, 1.7vw, 1rem);
  padding-bottom: 10px;
`

export const ButtonsContainer = styled.div`
  width: 100%;
  height: clamp(30px, 3vw, 40px);
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: 0;
  bottom: 10px;
`

export const SmallButton = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  color: white;
  background: ${(props) => props.color};

  display: flex;
  justify-content: center;
  align-items: center;

  text-transform: uppercase;
  border-radius: 4px;
  margin: 10px;
  box-shadow: 1px 2px #6c2828;
  font-size: clamp(0.9rem, 2vw, 1rem);
  &:hover {
    opacity: 0.85;
  }

  &:active {
    opacity: 0.7;
    transform: translate3d(1px, 1px, 0);
  }
`
//////////////////////////////////////////////////////////////////////////////////////////////
// MIDCONTAINER

export const Midcontainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 500;
  padding-bottom: 230px;
`

export const Icon = styled.div`
  background: 1px solid black;
  height: clamp(2.5rem, 4.5vw, 3.5rem);
  position: relative;
  cursor: pointer;
  &:before {
    font-family: 'Font Awesome 5 Brands';
    font-weight: 400;
    content: '\f09b';
    font-size: clamp(4.5rem, 5vw, 5.5rem);
    color: ${(props) => props.color};
  }

  @media ${device.mobileL} {
    padding-top: 40px;
  }
`
export const Title = styled.div`
  font-size: clamp(2rem, 2.5vw, 2.4rem);
  padding: 50px 0 16px;
  margin-bottom: 10px;
`
export const SearchFieldContainer = styled.div`
  width: clamp(300px, 45vw, 450px);
  height: clamp(30px, 3.5vw, 50px);
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;

  @media ${device.mobileS} {
    width: 95%;
  }
`

export const SearchField = styled.input`
  border: none;
  background: rgb(196, 192, 202);
  border-width: 0;
  box-shadow: none;
  width: 100%;
  height: 100%;
  font-size: clamp(1.3rem, 3vw, 2rem);
  padding: 15px;
  color: rgb(115, 117, 207);
  font-weight: 700;
  font-family: 'Lato', sans-serif;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 30px;
  z-index: 200;
  outline: 0px solid transparent;
  transition: all 0.4s ease-in-out;
  border: 4px solid transparent;

  &:focus {
    outline: 0px solid transparent;
    border: 4px solid ${(props) => props.color};
    transition: all 0.2s ease-in-out;
  }
`

export const MessageField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: clamp(300px, 40vw, 450px);
  text-transform: uppercase;
  color: #7e1717;
  font-weight: 600;
  letter-spacing: 0.6px;
`

export const Switcher = styled.div`
  cursor: pointer;
  width: clamp(3rem, 5vw, 5rem);
  height: 20px;
  background-color: gray;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
  position: relative;
  z-index: 200;
  opacity: 0.9;
`

export const Ball = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  position: absolute;
  top: -5px;
  left: -10px;
  opacity: 0.8;
`

//////////////////////////////////////////////////////////////////////////////////////////////

export const SearchButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 130px;
  height: 45px;
  border-radius: 5px;
  background-color: ${(props) => props.color};
  margin: 10px;
  margin-bottom: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: white;
  z-index: 200;

  box-shadow: 1px 2px #888888;
  position: relative;

  &:hover {
    opacity: 0.85;
  }

  &:active {
    opacity: 0.7;
    transform: translate3d(1px, 1px, 0);
  }
`
////////////////////////////////////////////////////////////
// spinner

const SpinnerSpin = keyframes`
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
`

interface ISpinner {
  color1: number
  color2: number
}

export const Spinner = styled.div<ISpinner>`
  z-index: 4000;
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 80px;
  top: 229px;
  left: 0;
  right: 0;
  margin: auto;

  &:after {
    content: ' ';
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    /* margin: 8px; */
    box-sizing: border-box;
    border: 40px solid #fff;
    /* border-color: rgb(125, 41, 41) transparent rgb(119, 87, 87) transparent; */
    border-color: ${(props) => `${props.color1} transparent ${props.color2} transparent`};
    animation: ${SpinnerSpin} 1.2s infinite;
  }
`
