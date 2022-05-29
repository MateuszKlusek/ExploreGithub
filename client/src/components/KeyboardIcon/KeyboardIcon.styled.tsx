import styled from "styled-components";


interface KeyboardIconContainerProps {
  top: string
  left: string
  right: string
}

interface KeyProps {
  top: string
  left: string
  right: string
}

export const KeyboardIconContainer = styled.div<KeyboardIconContainerProps>`
  height: 50px;
  width: 150px;
  border-radius: 5px;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  font-size: 14px;

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0.8;

  pointer-events: none;
`;

export const SVG = styled.svg`
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  pointer-events: none;

  animation: firstAnimation 2s ease-in forwards;
  animation-iteration-count: 1;

  position: absolute;

  @keyframes firstAnimation {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

export const Key = styled.div<KeyProps>`
  position: absolute;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  left: ${(props) => props.left};
  opacity: 0;
  color: black;
  font-weight: 600;
`;
