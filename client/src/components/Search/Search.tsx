import React, { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// modules, libraries, packages, etc...
import gsap from 'gsap'
import axios from 'axios'
import hexRgb from 'hex-rgb'

import { axiosURL } from '../../config/axios'

// context
import { SearchContext } from '../../context/SearchContext.js'
import { PaletteContext } from '../../context/PaletteContext.js'
import { KeyboardNavigationContext } from '../../context/KeyboardNavigationContext.js'

// custom hooks
import { useWindowSize } from '../../hooks/useWindowSize'

// components
import KeyboardNavigation from '../KeyboardNavigation/KeyboardNavigation'
import PalettePicker from '../PalettePicker/PalettePicker'
import KeyboardIcon from '../KeyboardIcon/KeyboardIcon'
import GithubPoints from '../GithubPoints/GithubPoints'
import Latest from '../Latest/Latest'

// styled components
import * as S from './Search.styled'

function Search() {
  const [loadPopup, setLoadPopup] = useState(false)
  const [loadSpinner, setLoadSpinner] = useState(false)
  const [enableSearch, setEnableSearch] = useState(false)
  const [switcherEnabled, setSwitcherEnabled] = useState(true)

  const [messageField, setMessageField] = useState('')

  const [dataFromDB, setDataFromDB] = useState<any>([])

  const popupcontainerRef = useRef<HTMLDivElement>(null)
  const midcontainerRef = useRef<HTMLDivElement>(null)
  const spinnerRef = useRef<HTMLDivElement>(null)

  const switcherRef = useRef<HTMLDivElement>(null)
  const switchBubbleRef = useRef<HTMLDivElement>(null)
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  const searchField = useRef<HTMLInputElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  // search mode -> githubAPI or scraper
  const [mode, setMode] = useState('githubAPI')
  const { profileQuery, setProfileQuery } = useContext(SearchContext)

  const [switcherXWidth, setSwitcherXWidth] = useState(0)

  var navigate = useNavigate()

  // window size hook for animation adjustment
  const size = useWindowSize()

  useEffect(() => {
    profileQuery.length > 0 && profileQuery.replaceAll(' ', '') !== ''
      ? setEnableSearch(true)
      : setEnableSearch(false)
  }, [profileQuery])

  // side effect on loadSpinner
  useLayoutEffect(() => {
    if (loadSpinner) {
      if (popupcontainerRef.current) {
        popupcontainerRef.current.style.opacity = "0"
      }
      if (midcontainerRef.current) {
        midcontainerRef.current.style.opacity = "0.3"
        midcontainerRef.current.style.pointerEvents = 'none'
      }
    } else {
      if (popupcontainerRef.current) {
        popupcontainerRef.current.style.opacity = "1"
      }
      if (midcontainerRef.current) {
        if (!loadPopup) {
          midcontainerRef.current.style.opacity = "1"
        }
        midcontainerRef.current.style.pointerEvents = 'auto'
      }
    }
  }, [loadSpinner])

  // cleaning message for non-existent user after 2 seconds
  useEffect(() => {
    const interval = setTimeout(() => {
      setMessageField('')
    }, 1200)
    return () => clearInterval(interval)
  }, [messageField])

  useEffect(() => {
    if (loadPopup) {
      if (midcontainerRef.current && popupcontainerRef.current) {
        midcontainerRef.current.style.opacity = "0.1"
        popupcontainerRef.current.style.display = 'block'
      }
    } else {
      if (midcontainerRef.current) {
        midcontainerRef.current.style.opacity = "1"
      }
    }
  }, [loadPopup])

  useEffect(() => {
    if (enableSearch) {
      if (searchButtonRef.current) {
        searchButtonRef.current.style.opacity = "1"
        searchButtonRef.current.style.cursor = 'pointer'
      }
    } else {
      if (searchButtonRef.current) {
        searchButtonRef.current.style.opacity = "0.7"
        searchButtonRef.current.style.cursor = 'auto'
      }
    }
  }, [enableSearch])

  const { palette, setPalette, paletteAnimationEnabled, setPaletteAnimationEnabled } =
    useContext(PaletteContext)
  const { Refs, visibility } = useContext(KeyboardNavigationContext)
  const { keysVisible, setKeysVisible } = visibility

  useEffect(() => {
    Refs['switcherRef'] = switcherRef
    Refs['searchButtonRef'] = searchButtonRef
    Refs['iconRef'] = iconRef
    Refs['searchField'] = searchField
  }, [paletteAnimationEnabled])

  useEffect(() => {
    if (size.width! / 20 < 80 && size.width! / 20 > 48) {
      setSwitcherXWidth(Number((80 - size.width! / 20).toFixed(2)))
    } else if (size.width! / 20 < 48) {
      setSwitcherXWidth(32)
    } else {
      setSwitcherXWidth(0)
    }

    // move the switcher ball if it's on the right
    if (mode === 'scraper') {
      if (size.width! / 20 < 80 && size.width! / 20 > 48) {
        var t = 70 - switcherXWidth
        if (switchBubbleRef.current) {
          switchBubbleRef.current.style.transform = `translate(${t}px)`
        }
      } else if (size.width! / 20 < 48) {
        if (switchBubbleRef.current) {
          switchBubbleRef.current.style.transform = `translate(38px)`
        }
      } else {
        if (switchBubbleRef.current) {
          switchBubbleRef.current.style.transform = `translate(70px)`
        }
      }
    }
  }, [size])

  const checkDatabase = async () => {
    // load spinner when we start connecting with server
    setLoadSpinner(true)

    try {
      const responseFromDB = await axios({
        method: 'post',
        url: `${axiosURL}/checkDatabase`,
        data: {
          // needs to swap to lower case in order to compare (Github does that behing the scene, query with ex. profilename can match ProfileName)
          profileQuery: profileQuery.toLowerCase().trim(),
          mode: mode,
        },
      })
      // hide spinner when the server send response, so we are all client side now
      console.log(responseFromDB)
      setEnableSearch(false)
      // midcontainerRef.current.style.opacity = 1
      if (responseFromDB.data.status === 'found in DB') {
        setDataFromDB(responseFromDB.data)
        setLoadPopup(true)
        setLoadSpinner(false)
      } else if (responseFromDB.data.status === 'not found in DB') {
        setEnableSearch(true)
        doNotUseSavedData(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const switchMode = (x: number, mode: "scraper" | "githubAPI") => {
    // disable seperately: mouse clicking and 'm' key
    if (switcherRef.current) {
      switcherRef.current.style.pointerEvents = 'none'
    }
    setSwitcherEnabled(false)

    var tl = gsap.timeline({
      onComplete: () => {
        setMode(mode)
        profileQuery.length > 0 ? setEnableSearch(true) : setEnableSearch(false)
        // enable seperately: mouse clicking and 'm' key
        if (switcherRef.current) {
          switcherRef.current.style.pointerEvents = 'auto'
        }
        setSwitcherEnabled(true)
      },
    })

    tl.fromTo(
      switchBubbleRef.current,
      {
        x: x !== 0 ? 0 : 70 - switcherXWidth,
      },
      {
        x: x === 0 ? 0 : 70 - switcherXWidth,
      },
    )
  }

  const useSavedData = () => {
    var data = dataFromDB.data
    navigate('display', { state: data })
  }

  const doNotUseSavedData = async (exists: boolean) => {
    // change midcontainer styles to opacity 0.7 and so on
    console.log('do not use saved data')
    setLoadSpinner(true)
    if (mode === 'githubAPI') {
      console.log('now using saved data: using githubAPI')
      const response = await axios({
        method: 'post',
        url: `${axiosURL}/githubAPI`,
        data: {
          profileQuery: profileQuery,
          mode: mode,
          exists: exists,
        },
      })

      // here we got from getting data from github API
      if (response.data.status === 'not found') {
        console.log("the user doesn't exist", response.data)
        if (midcontainerRef.current && searchField.current) {
          midcontainerRef.current.style.pointerEvents = 'auto'
          searchField.current.disabled = false
        }
        setLoadSpinner(false)
        setMessageField("The user doesn't exist")
      } else {
        var data = response.data.data
        console.log('Data from gihub api from server', data)
        setLoadSpinner(false)
        navigate('display', { state: data })
      }
    } else if (mode === 'scraper') {
      console.log('now using saved data: using scraper')
      const response = await axios({
        method: 'post',
        url: `${axiosURL}/scraperGithub`,
        data: {
          profileQuery: profileQuery,
          mode: mode,
          exists: exists,
        },
      })
      if (response.data.status === 'not found') {
        console.log("the user doesn't exist", response.data)
        if (searchField.current) {
          searchField.current.disabled = false
        }
        setLoadSpinner(false)
        setMessageField("The user doesn't exist")
      } else {
        var data = response.data.data
        console.log('Scraped data from gihub', data)
        setLoadSpinner(false)
        navigate('display', { state: data })
      }
      console.log(response)
    }
  }

  return (
    <S.SearchContainer>
      {mode === 'githubAPI' && <GithubPoints />}
      <PalettePicker />
      {keysVisible && (
        <KeyboardIcon buttonKey={'p'} horizontal={'left'} vertical={'top'} right={40} top={30} theme={"light"} />
      )}

      {mode === 'githubAPI' ? (
        <KeyboardNavigation top={80} opacity={0.3} color={"gray"} />
      ) : (
        <KeyboardNavigation top={20} opacity={0.3} color={"gray"} />
      )}

      <S.PopupContainer ref={popupcontainerRef} red={hexRgb(palette.color4).red} green={hexRgb(palette.color4).green} blue={hexRgb(palette.color4).blue}>
        <S.PopupTitle>github.com/{profileQuery}</S.PopupTitle>
        <S.PopupMessage>
          There is information about /{profileQuery} already found from previous searches. <br />
        </S.PopupMessage>
        <S.PopupMessage>Do you want to use previously obtained data?</S.PopupMessage>
        <S.ButtonsContainer>
          <S.SmallButton onClick={useSavedData} color={palette.color2}>
            yes
          </S.SmallButton>
          <S.SmallButton onClick={() => doNotUseSavedData(true)} color={palette.color2}>
            no
          </S.SmallButton>
        </S.ButtonsContainer>
      </S.PopupContainer>

      <S.Midcontainer ref={midcontainerRef}>
        <S.Icon color={palette.color3} onClick={() => window.location.reload()} ref={iconRef}>
          {keysVisible && (
            <KeyboardIcon
              buttonKey={'r'}
              horizontal={'left'}
              vertical={size.width! > 600 ? 'top' : 'bottom'}
              right={size.width! > 600 ? 20 : 10}
              top={size.width! > 600 ? 5 : 65}
              theme={"light"}
            />
          )}
        </S.Icon>

        <S.Title>Browse Github</S.Title>

        <S.SearchFieldContainer>
          <S.SearchField
            onChange={(e) => {
              setProfileQuery(e.target.value)
            }}
            value={profileQuery}
            color={palette.color1}
            ref={searchField}
          ></S.SearchField>

          {keysVisible && (
            <KeyboardIcon
              buttonKey={'c / i'}
              horizontal={'left'}
              vertical={'top'}
              left={size.width! > 600 ? -100 : -50}
              top={-5}
              theme={"light"}
            />
          )}
        </S.SearchFieldContainer>

        <S.MessageField>{messageField}</S.MessageField>

        <S.Switcher
          onClick={() => {
            if (switcherEnabled) {
              setEnableSearch(false)
              // => direction (to 70, scraper)
              mode === 'githubAPI' ? switchMode(70, 'scraper') : switchMode(0, 'githubAPI')
            }
          }}
          ref={switcherRef}
        >

          <S.Ball color={palette.color2} ref={switchBubbleRef} />

          <S.TextGithubAPI onClick={(e) => {
            e.stopPropagation();
          }}>Github API</S.TextGithubAPI>
          <S.TextScraper onClick={(e) => {
            e.stopPropagation();
          }}>Scraper</S.TextScraper>

          {keysVisible && (
            <KeyboardIcon
              buttonKey={'m'}
              vertical={'top'}
              horizontal={'left'}
              top={-5}
              right={30}
              theme={"light"}
            />
          )}
        </S.Switcher>

        <S.SearchButton
          color={palette.color1}
          onClick={() => {
            if (enableSearch) {
              setEnableSearch(false)
              if (searchField.current) {
                searchField.current.disabled = true
              }
              checkDatabase()
            }
          }}
          disabled={enableSearch ? false : true}
          ref={searchButtonRef}
          data-tip
          data-for="DisableButton"
        >
          Check
          {keysVisible && (
            <KeyboardIcon
              buttonKey={'enter'}
              vertical={'top'}
              horizontal={'right'}
              top={-5}
              left={60}
              theme={"light"}
            />
          )}
        </S.SearchButton>

        <Latest />
      </S.Midcontainer>
      {loadSpinner && (
        <S.Spinner color1={palette.color1} color2={palette.color2} ref={spinnerRef} />
      )}
    </S.SearchContainer>
  )
}

export default Search
