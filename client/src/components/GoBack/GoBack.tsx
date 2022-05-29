// react
import React, { useRef, useContext } from 'react'

// packages
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

// context
import { KeyboardNavigationContext } from '../../context/KeyboardNavigationContext.js'

// styles
import * as S from './GoBack.styled'

const GoBack = (props) => {
  const { Refs, visibility } = useContext(KeyboardNavigationContext)
  const { keysVisible, setKeysVisible } = visibility

  const navigate = useNavigate()

  const arrowRef = useRef()
  const SVGRef = useRef()

  const animateGoingBack = async () => {
    var tl = gsap.timeline({
      onComplete: () => {
        setKeysVisible(false)
        gsap.globalTimeline.getChildren().forEach((t) => t.kill())
        navigate(-1)
      },
    })
    tl.to(SVGRef.current, {
      x: 10,
      duration: 0.05,
    })
      .to(SVGRef.current, {
        x: 0,
        duration: 0.05,
      })
      .to(SVGRef.current, {
        x: 10,
        duration: 0.05,
      })
      .to(SVGRef.current, {
        x: -50,
      })
  }

  return (
    <S.GoBackContainer className="type" ref={arrowRef}>
      <S.SVG viewBox="0 0 70 50" fill="none">
        <S.Line
          points="42,2 24,20 42,38"
          stroke={props.color}
          strokeWidth="5"
          ref={SVGRef}
          onClick={() => {
            animateGoingBack()
          }}
        />
      </S.SVG>
    </S.GoBackContainer>
  )
}

export default GoBack
