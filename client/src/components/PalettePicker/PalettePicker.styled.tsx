import styled from 'styled-components'

export const ColorSwitcherContainer = styled.div`
  z-index: 4000;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
`

export const SingleColor = styled.div`
  background: ${(props) => props.color};
  height: 20px;
  width: 20px;
`

interface IPaletteContainer {
  opacity: string
  top: string
  display: string
}


export const PaletteContainer = styled.div<IPaletteContainer>`
  opacity: ${(props) => props.opacity};
  position: absolute;
  top: ${(props) => props.top};
  right: 0px;
  /* width: 80px; */
  /* height: 20px; */
  display: ${(props) => (props.display === 'grid' ? 'grid' : 'none')};
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`

export const Button = styled.div`
  width: 100px;
  height: 60px;
  background: #9797c9;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`
