import { FC, useEffect, useContext, memo } from 'react'
import { KeyboardNavigationContext } from '../../context/KeyboardNavigationContext'
import { PaletteContext } from '../../context/PaletteContext'
import { SearchContext } from '../../context/SearchContext'

import { useLocation, useNavigate } from 'react-router-dom'

import * as S from './KeyboardNavigation.styled'

const KeyboardNavigation: FC<KeyboardNavigationProps> = (props) => {
  const { Refs, visibility } = useContext(KeyboardNavigationContext)
  const { keysVisible, setKeysVisible } = visibility

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { paletteAnimationEnabled, rolledOut } = useContext(PaletteContext)
  const { setProfileQuery } = useContext(SearchContext)

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      // console.log(`Key: ${e.key} with keycode ${e.keyCode}`)

      switch (pathname) {
        case '/':
          if (e.key === 'Enter') {
            Refs.searchButtonRef.current.click()
          } else if (e.key === 'r' && Refs.searchField.current !== document.activeElement) {
            window.location.reload()
          } else if (e.key === 'm' && Refs.searchField.current !== document.activeElement) {
            Refs.switcherRef.current.click()
          } else if (e.key === 'p' && Refs.searchField.current !== document.activeElement) {
            Refs.SwitcherContainerRef.current.click()
          } else if (e.key === 'i' && Refs.searchField.current !== document.activeElement) {
            Refs.searchField.current.focus()
            // without the e.preventDefault() typed 'i' makes input show i as a first letter
            e.preventDefault()
          } else if (e.key === 'Escape') {
            Refs.searchField.current.blur()
          } else if (e.key === 'c' && Refs.searchField.current !== document.activeElement) {
            setProfileQuery('')
          } else if (e.key === '1' && paletteAnimationEnabled && rolledOut) {
            Refs.MainPaletteRef.current.click()
          } else if (e.key === '2' && paletteAnimationEnabled && rolledOut) {
            Refs.PaletteRestRef.current[0].click()
          } else if (e.key === '3' && paletteAnimationEnabled && rolledOut) {
            Refs.PaletteRestRef.current[1].click()
          } else if (e.key === '4' && paletteAnimationEnabled && rolledOut) {
            Refs.PaletteRestRef.current[2].click()
          } else if (e.key === '5' && paletteAnimationEnabled && rolledOut) {
            Refs.PaletteRestRef.current[3].click()
          } else if (e.key === '6' && paletteAnimationEnabled && rolledOut) {
            Refs.PaletteRestRef.current[4].click()
          } else if (e.key === '7' && paletteAnimationEnabled && rolledOut) {
            Refs.PaletteRestRef.current[5].click()
          } else {
          }
          break
        case '/display':
          switch (e.key) {
            case 'r':
              window.location.reload()
              break
            case 'p':
              Refs.SwitcherContainerRef.current.click()
              break
            case '1':
              if (paletteAnimationEnabled && rolledOut) {
                Refs.MainPaletteRef.current.click()
              }
              break
            case '2':
              if (paletteAnimationEnabled && rolledOut) {
                Refs.PaletteRestRef.current[0].click()
              }
              break
            case '3':
              if (paletteAnimationEnabled && rolledOut) {
                Refs.PaletteRestRef.current[1].click()
              }
              break
            case '4':
              if (paletteAnimationEnabled && rolledOut) {
                Refs.PaletteRestRef.current[2].click()
              }
              break
            case '5':
              if (paletteAnimationEnabled && rolledOut) {
                Refs.PaletteRestRef.current[3].click()
              }
              break
            case '6':
              if (paletteAnimationEnabled && rolledOut) {
                Refs.PaletteRestRef.current[4].click()
              }
              break
            case '7':
              if (paletteAnimationEnabled && rolledOut) {
                Refs.PaletteRestRef.current[5].click()
              }
              break
            case 'Backspace':
              navigate(-1)
              break
            default:
          }
          break
        default:
      }
    }

    window.addEventListener('keydown', keyListener)

    return () => {
      window.removeEventListener('keydown', keyListener)
    }
  }, [paletteAnimationEnabled])

  return (
    <S.KeyboardNavigationContainer
      onClick={() => setKeysVisible((prev: boolean) => !prev)}
      top={props.top}
      opacity={keysVisible ? 0.8 : 0.3}
    />
  )
}

export default memo(KeyboardNavigation)
