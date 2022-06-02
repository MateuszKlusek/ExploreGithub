// react
import React, { useContext, useState, useRef, useLayoutEffect } from 'react'

// packages
import axios from 'axios'
import dateFormat from 'dateformat'
import spinner from './spinnerAvatar.gif'

// hooks
import { useLocation } from 'react-router-dom'

// components
import PalettePicker from './../PalettePicker/PalettePicker'
import GoBack from '../GoBack/GoBack'
import KeyboardIcon from '../KeyboardIcon/KeyboardIcon'
import KeyboardNavigation from '../KeyboardNavigation/KeyboardNavigation'
import ChartBar from '../Charts/ChartBar/ChartBar'
import ChartPie from '../Charts/ChartPie/ChartPie'
import DoughnutChart from '../Charts/DoughnutChart/DoughnutChart'

// contexts
import { PaletteContext } from './../../context/PaletteContext.js'
import { KeyboardNavigationContext } from '../../context/KeyboardNavigationContext.js'

// styles
import * as S from './DisplayData.styled'
import TopRepos from '../TopRepos/TopRepos'

const DisplayData: React.FC<ISingleUserData> = (props) => {
  // get data from router (from Search component)
  // state should be an object, without nested stuff like data.data
  const { state }: any = useLocation()

  // states
  const { palette } = useContext(PaletteContext)

  const { visibility } = useContext(KeyboardNavigationContext)
  const { keysVisible } = visibility

  // refs
  const avatarRef = useRef<HTMLImageElement>(null)
  const githubURLRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (avatarRef.current) {
      avatarRef.current.src = spinner
    }
    getGithubAvatar()
  }, [])

  const getGithubAvatar = async () => {
    const response = await axios({
      method: 'get',
      url: `${state.avatar_url}`,
      responseType: 'blob',
    })
    try {
      let imgUrl = URL.createObjectURL(response.data)
      if (avatarRef.current) {
        avatarRef.current.src = imgUrl
      }
    } catch (err) { }
  }

  return (
    <S.DisplayDataContainer>
      <PalettePicker />
      {keysVisible && (
        <KeyboardIcon buttonKey={'p'} horizontal={'left'} vertical={'top'} right={40} top={30} theme={"dark"} />
      )}
      <GoBack color={palette.color3} />
      <KeyboardNavigation top={80} opacity={1} color={"white"} />

      <S.TopContainer>
        <S.GithubAvatar url={state.url} ref={avatarRef}
          onClick={() => (window.location.href = `http://github.com/${state.profileURL}`)} />
        <S.GithubURLContainer>
          <S.GithubURL
            ref={githubURLRef}
            onClick={() => (window.location.href = `http://github.com/${state.profileURL}`)}
          >
            @{state.profileURL}
          </S.GithubURL >
        </S.GithubURLContainer >
        <S.GithubJoinDate>
          <S.CalendarIcon />
          Joined {dateFormat(state.created_at, 'longDate')}
        </S.GithubJoinDate>
        <S.GithubDataContainer>
          <S.GithubData color={palette.color3}>
            <S.GithubDataNumber>{state.followers}</S.GithubDataNumber>
            <S.GithubDataText>followers</S.GithubDataText>
          </S.GithubData>
          <S.GithubData color={palette.color3}>
            <S.GithubDataNumber>{state.following}</S.GithubDataNumber>
            <S.GithubDataText>following</S.GithubDataText>
          </S.GithubData>
          <S.GithubData color={palette.color3}>
            <S.GithubDataNumber>{state.public_repos}</S.GithubDataNumber>
            <S.GithubDataText>repositories</S.GithubDataText>
          </S.GithubData>
        </S.GithubDataContainer>
      </S.TopContainer >

      <S.BottomContainer>

        <S.ChartsContainer>
          <ChartPie title={"Top Languages"} data={state} />
          <ChartBar title={"Most Starred"} data={state} />
          <DoughnutChart title={"Stars per Language"} data={state} />
        </S.ChartsContainer>
        <TopRepos data={state} />

      </S.BottomContainer>
    </S.DisplayDataContainer >
  )
}

export default DisplayData
