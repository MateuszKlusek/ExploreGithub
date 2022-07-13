// react
import React, { useRef, useContext } from 'react'

// packages
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

// context
import { KeyboardNavigationContext } from '../../context/KeyboardNavigationContext.js'

// styles
import * as S from './GoBack.styled'

const GoBack: React.FC<GoBackProps> = ({ color }) => {
  // states
  const { visibility } = useContext(KeyboardNavigationContext)
  const { setKeysVisible } = visibility

  // refs
  const arrowRef = useRef<HTMLDivElement>(null)
  const SVGRef = useRef(null)

  const navigate = useNavigate()

  // handle jiggle animation for going back to the Search component
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
    <S.GoBackContainer className="type" ref={arrowRef} onClick={() => {
      animateGoingBack()
    }}>
      <S.SVG viewBox="0 0 70 50" fill="none">
        <S.Line
          points="42,2 24,20 42,38"
          stroke={color}
          strokeWidth="5"
          ref={SVGRef}

        />
      </S.SVG>
    </S.GoBackContainer>
  )
}

export default GoBack
