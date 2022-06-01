import styled from "styled-components";

interface IKeyboardNavigationContainer {
  top: number
  opacity: number
  color: string
}

export const KeyboardNavigationContainer = styled.div<IKeyboardNavigationContainer>`
  position: absolute;
  left: 20px;
  top: ${(props) => `${props.top}px`};
  cursor: pointer;
  opacity: ${(props) => props.opacity};
  &:before {
    color: ${props => props.color};
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f11c";
    font-size: clamp(1.5rem, 3.5vw, 2rem);
  }
`;
