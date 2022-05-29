import styled from "styled-components";

interface IKeyboardNavigationContainer {
  top: number
  opacity: number

}

export const KeyboardNavigationContainer = styled.div<IKeyboardNavigationContainer>`
  /* border: 1px solid black; */
  position: absolute;
  left: 20px;
  top: ${(props) => `${props.top}px`};
  cursor: pointer;
  /* box-shadow: 0px 0px 24px 8px rgba(173,173,146,0.6);
    background: rgba(173,173,146,0.5); */
  opacity: ${(props) => props.opacity};
  &:before {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f11c";
    font-size: clamp(1.5rem, 3.5vw, 2rem);
  }
`;
