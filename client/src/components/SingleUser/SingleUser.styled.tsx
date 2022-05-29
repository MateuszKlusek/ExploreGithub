import styled from 'styled-components'
import { device } from '../../utils/device'



export const SingleUser = styled.div`
  cursor: pointer;
  display: grid;
  min-width: 300px;
  max-width: 350px;
  min-height: 60px;

  background: ${(props) => `rgba(${props.color.red},${props.color.green},${props.color.blue},0.7)`};
  padding: 10px;
  border-radius: 5px;
  transition: all 350ms;

  grid-template-rows: 1fr 1fr;
  grid-template-columns: 60px auto;
  grid-template-areas:
    'icon name name name'
    'icon stats stats stats';

  &:hover {
    background: ${(props) =>
    `rgba(${props.color.red},${props.color.green},${props.color.blue},0.8)`};
    box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.25);
    transform: translateY(-8px);
  }

  @media ${device.laptop} {
    min-width: 450px;
    grid-template-rows: 1fr;
    grid-template-columns: 60px 220px auto;
    grid-template-areas: 'icon name stats';

    &:hover {
      background: ${(props) =>
    `rgba(${props.color.red},${props.color.green},${props.color.blue},0.8)`};
      transform: translateX(4px);
    }
  }

  @media ${device.tablet} {
    min-width: 400px;
    grid-template-rows: 1fr;
    grid-template-columns: 60px 180px auto;
    grid-template-areas: 'icon name stats';

    &:hover {
      background: ${(props) =>
    `rgba(${props.color.red},${props.color.green},${props.color.blue},0.8)`};
      transform: translateX(4px);
    }
  }

  @media ${device.mobileL} {
    min-width: 90%;
    max-width: 95%;

    grid-template-rows: 1fr 1fr;
    grid-template-columns: 60px auto;
    grid-template-areas:
      'icon name name name'
      'icon stats stats stats';
  }
`

export const GithubUserIcon = styled.img`
  grid-area: icon;
  height: auto;
  width: 100%;
  border-radius: 50%;
  z-index: 200;
`

export const GithubName = styled.div`
  font-weight: 600;
  letter-spacing: 1px;
  margin-right: 10px;
  display: flex;
  padding-left: 10px;
  align-items: center;
  grid-area: name;

  @media ${device.tablet} {
    font-size: 14px;
  }
`

export const GitHubStats = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  padding-left: 10px;
  grid-area: stats;

  @media ${device.laptop} {
    grid-template-columns: 1fr;
    grid-template-row: 1fr 1fr 1fr;
  }

  @media ${device.mobileL} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-row: 1fr;
  }
`

export const GitHubStat = styled.div`
  font-size: 12px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 1fr;

  grid-template-areas:
    '. statNumber'
    'statText statText';

  @media ${device.laptop} {
    grid-template-columns: 30px 30px auto;
    grid-template-rows: 1fr;

    grid-template-areas: '. statNumber statText';

    & div {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
  }

  @media ${device.mobileL} {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 1fr;

    grid-template-areas:
      '. statNumber'
      'statText statText';
  }
`

export const GitHubStatNumber = styled.div`
  grid-area: statNumber;
  padding-left: 5px;
`

export const GitHubStatText = styled.div`
  padding-top: 2px;
  grid-area: statText;
  text-align: center;

  @media ${device.laptop} {
    font-size: 14px;
  }
`
export const ContentLoaderContainer = styled.div``
