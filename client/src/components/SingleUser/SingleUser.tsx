// @ts-nocheck
// react
import { useContext, useRef, useEffect } from 'react'

// styles
import * as S from './SingleUser.styled'

// assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faFolder } from '@fortawesome/free-solid-svg-icons'
import spinner from './spinnerAvatar.gif'

// packages
import gsap from 'gsap'
import axios from 'axios'
import ContentLoader from 'react-content-loader'
import hexRgb from 'hex-rgb'
import { useNavigate } from 'react-router-dom'

// context
import { KeyboardNavigationContext } from '../../context/KeyboardNavigationContext.js'
import { PaletteContext } from '../../context/PaletteContext.js'

// hooks
import { useWindowSize } from '../../hooks/useWindowSize'

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

const GithubNameLoader: React.FC<GithubNameLoaderProps> = ({ size }) => (
  <S.ContentLoaderContainer>
    <ContentLoader
      speed={1}
      width={200}
      viewBox="0 0 100 10"
      backgroundColor="#ffffff99"
      foregroundColor="#d2cccc99"
    >
      <rect x="0" y="4" rx="3" ry="3" width={size} height="4" />
    </ContentLoader>
  </S.ContentLoaderContainer>
)

const SingleUser: React.FC<ISingleUserData> = ({ data }) => {

  // states
  const { palette } = useContext(PaletteContext)
  const { visibility } = useContext(KeyboardNavigationContext)
  const { setKeysVisible } = visibility

  const size = useWindowSize()
  var navigate = useNavigate()

  // refs 
  const GithubIconRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (Object.keys(data).length === 0) {
      if (GithubIconRef && GithubIconRef.current) {
        GithubIconRef.current.src = spinner
      }
    } else {
      getGithubAvatar()
    }
  }, [data])


  // handles getting the avatar url from the github and swaping icon spinner src with imgUrl
  const getGithubAvatar = async () => {
    const response = await axios({
      method: 'get',
      url: `${data.avatar_url}`,
      responseType: 'blob',
    })
    try {
      let imgUrl = URL.createObjectURL(response.data)
      if (GithubIconRef && GithubIconRef.current) {
        GithubIconRef.current.src = imgUrl
      }
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <S.SingleUser
      red={hexRgb(palette.color2).red}
      green={hexRgb(palette.color2).green}
      blue={hexRgb(palette.color2).blue}
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
            size={size.width! > 768 ? '100px' : size.width! > 425 ? '80px' : '100px'}
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
    </S.SingleUser >
  )
}

export default SingleUser
