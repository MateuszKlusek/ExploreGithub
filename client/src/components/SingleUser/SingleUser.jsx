import React, { useEffect, forwardRef, useContext, useRef, useLayoutEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as S from './SingleUser.styled.jsx'
import { faUserFriends, faFolder } from '@fortawesome/free-solid-svg-icons'
import gsap from 'gsap'
import axios from 'axios'
import { KeyboardNavigationContext } from '../../context/KeyboardNavigationContext.js'
import { useNavigate } from 'react-router-dom'
import hexRgb from 'hex-rgb'
import { PaletteContext } from '../../context/PaletteContext.js'
import ContentLoader from 'react-content-loader'

import { useWindowSize } from '../../hooks/useWindowSize.js'

import spinner from './spinnerAvatar.gif'

const SmallNumberLoader = () => (
  <ContentLoader
    speed={1}
    viewBox="0 0 100 20"
    backgroundColor="#ffffff99"
    foregroundColor="#d2cccc99"
  >
    <rect x="0" y="9" rx="3" ry="3" width="20" height="8" />
  </ContentLoader>
)

const GithubNameLoader = (props) => (
  <S.ContentLoaderContainer>
    <ContentLoader
      speed={1}
      width={200}
      viewBox="0 0 100 10"
      backgroundColor="#ffffff99"
      foregroundColor="#d2cccc99"
    >
      <rect x="0" y="4" rx="3" ry="3" width={props.size} height="4" />
    </ContentLoader>
  </S.ContentLoaderContainer>
)

const SingleUser = forwardRef((props, ref) => {
  const { Refs, visibility } = useContext(KeyboardNavigationContext)
  const { keysVisible, setKeysVisible } = visibility

  const { palette, setPalette } = useContext(PaletteContext)
  const size = useWindowSize()

  const GithubIconRef = useRef()

  var data = props.data

  useLayoutEffect(() => {
    if (Object.keys(data).length === 0) {
      GithubIconRef.current.src = spinner
    } else {
      getGithubAvatar()
    }
  }, [data])

  var navigate = useNavigate()

  const getGithubAvatar = async () => {
    const response = await axios({
      method: 'get',
      url: `${data.avatar_url}`,
      responseType: 'blob',
    })
    try {
      let imgUrl = URL.createObjectURL(response.data)
      GithubIconRef.current.src = imgUrl
    } catch (err) {}
  }

  return (
    <S.SingleUser
      color={hexRgb(palette.color2)}
      onClick={() => {
        setKeysVisible(false)
        gsap.globalTimeline.getChildren().forEach((t) => t.kill())
        navigate('display', { state: data })
      }}
    >
      <S.GithubUserIcon ref={GithubIconRef} />
      <S.GithubName>
        {Object.keys(data).length === 0 ? (
          <GithubNameLoader
            size={size.width > 768 ? '100px' : size.width > 425 ? '80px' : '100px'}
          />
        ) : (
          `@${data.profileURL}`
        )}
      </S.GithubName>
      <S.GitHubStats>
        <S.GitHubStat>
          <FontAwesomeIcon icon={faUserFriends} color={'white'} size="lg" />
          <S.GitHubStatNumber>
            {Object.keys(data).length === 0 ? <SmallNumberLoader /> : data.followers}
          </S.GitHubStatNumber>
          <S.GitHubStatText>followers</S.GitHubStatText>
        </S.GitHubStat>
        <S.GitHubStat>
          <FontAwesomeIcon icon={faUserFriends} color={'white'} size="lg" />
          <S.GitHubStatNumber>
            {Object.keys(data).length === 0 ? <SmallNumberLoader /> : data.following}
          </S.GitHubStatNumber>
          <S.GitHubStatText>following</S.GitHubStatText>
        </S.GitHubStat>
        <S.GitHubStat>
          <FontAwesomeIcon icon={faFolder} color={'white'} size="lg" />
          <S.GitHubStatNumber>
            {Object.keys(data).length === 0 ? <SmallNumberLoader /> : data.public_repos}
          </S.GitHubStatNumber>
          <S.GitHubStatText>repos</S.GitHubStatText>
        </S.GitHubStat>
      </S.GitHubStats>
    </S.SingleUser>
  )
})

export default SingleUser
