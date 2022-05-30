import styled from "styled-components";

export const RequestPointsText = styled.div``;

export const RequestPointsContainer = styled.div`
  z-index: 4000;
  font-size: clamp(0.8rem, 1.5vw, 1rem);
  position: absolute;
  top: 20px;
  left: 20px;
  /* border: 1px solid red; */
  max-height: 80px;
`;
export const RequestPointsValue = styled.div`
  height: clamp(2rem, 4.5vw, 2.2rem);
  font-size: clamp(1.4rem, 3.5vw, 1.7rem);
  font-weight: 600;
  letter-spacing: 1px;
`;

export const ContentLoadedContainer = styled.div`
  height: clamp(2rem, 4.5vw, 2.2rem);
`;
