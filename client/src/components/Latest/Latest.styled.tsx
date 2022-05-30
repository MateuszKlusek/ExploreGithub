import styled from 'styled-components'

// helpers
import { device } from '../../utils/device'

export const LatestContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.mobileL} {
    width: 95%;
  }
`

export const LatestTitle = styled.div`
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  font-size: 1.5rem;
  letter-spacing: 1.8px;
  margin-top: 70px;
  margin-bottom: 20px;
`

export const SingleUsersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  column-gap: 8px;
  height: 80px;

  @media ${device.laptop} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    row-gap: 8px;
  }
`
