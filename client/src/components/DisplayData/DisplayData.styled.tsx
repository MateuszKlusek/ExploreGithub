import styled from 'styled-components'

// helpers
import { device } from '../../utils/device.js'

export const DisplayDataContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 500px 1fr;
`

export const TopContainer = styled.div`
  min-height: 500px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid black;
  padding-bottom: 20px;
`

export const BottomContainer = styled.div`
width: 100%;
`

export const ChartsContainer = styled.div`
margin-top: -20px;
  width: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, max-content));
  gap: 20px;
  place-items: center;
 
  justify-content: center;    
 padding: 0 auto;

`


interface IGithubAvatar {
  url: string
}

export const GithubAvatar = styled.img<IGithubAvatar>`
  margin-top: 50px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 0.5rem solid #0070f3;

  @media ${device.tablet} {
    width: 100px;
    height: 100px;
  }
`

export const GithubURLContainer = styled.div`
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  position: relative;
`

export const GithubURL = styled.div`
  color: #0070f3;
  font-size: 22px;
  letter-spacing: 1.2px;

  @media ${device.tablet} {
    font-size: 18px;
  }
`

export const GithubURLArrow = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  color: #0070f3;
  opacity: 0;

  &:before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    font-size: 26px;
    content: '\f061';
  }

  @media ${device.tablet} {
    &:before {
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      font-size: 22px;
      content: '\f061';
    }
  }
`

export const GithubJoinDate = styled.div`
  margin-top: 20px;
  font-size: 12px;
  display: flex;

  @media ${device.tablet} {
    font-size: 11px;
  }
`

export const CalendarIcon = styled.div`
  padding-right: 5px;
  &:before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    content: '\f073';
  }
`

export const GithubDataContainer = styled.div`
  margin-top: 30px;
  width: 500px;
  height: 90px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  column-gap: 8px;
  color: white;

  @media ${device.tablet} {
    width: 400px;
    height: 60px;
    row-gap: 8px;
  }

  @media ${device.mobileL} {
    width: 200px;
    height: 180px;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    row-gap: 8px;
  }
`

export const GithubData = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.color};
  border-radius: 8px;
  box-shadow: 1px 2px 2px #00000073;
`

export const GithubDataNumber = styled.div`
  font-size: 20px;

  @media ${device.tablet} {
    font-size: 16px;
  }
`

export const GithubDataText = styled.div`
  margin-top: 10px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #ffffffbb;

  @media ${device.tablet} {
    margin-top: 8px;
    font-size: 11px;
  }
`
