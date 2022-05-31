import React, { useState, useEffect } from 'react'
import ContentLoader from 'react-content-loader'
import axios from 'axios'
import ReactTooltip from 'react-tooltip'

// styles
import * as S from './GithubPoints.styled'

const MyLoader = () => (
  <S.ContentLoadedContainer>
    <ContentLoader
      speed={1}
      viewBox="0 0 100 17"
      backgroundColor="#ffffff8f"
      foregroundColor="#d2cccc9d"
    // height={25}
    >
      <rect x="0" y="5" rx="3" ry="3" width="50" height="8" />
    </ContentLoader>
  </S.ContentLoadedContainer>
)

const ResultOfLimitFetching: React.FC<GithubPointsProps> = (props) => (
  <S.RequestPointsValue>
    {props.remainingNumberOfRequests} / {props.limitOfRequests}
  </S.RequestPointsValue>
)

function GithubPoints() {
  const [limitOfRequests, setLimitOfRequests] = useState('')
  const [remainingNumberOfRequests, setRemainingNumberOfRequests] = useState('')
  const [loadingLimit, setLoadingLimit] = useState(false)

  const howManyRequestsLeft = async () => {
    setLoadingLimit(true)
    try {
      const response = await axios('https://api.github.com/rate_limit')
      setLimitOfRequests(response.data.rate.limit)
      setRemainingNumberOfRequests(response.data.rate.remaining)
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingLimit(false)
    }
  }

  useEffect(() => {
    howManyRequestsLeft()
  }, [])

  return (
    <S.RequestPointsContainer data-tip data-for="githubTip">
      <ReactTooltip id="githubTip" place="top" effect="solid">
        Default limit for each user <br />
        Single look-up costs usually 2-4 API points.
        <br />
        API points refresh every hour
      </ReactTooltip>
      {loadingLimit ? (
        <MyLoader />
      ) : (
        <ResultOfLimitFetching
          limitOfRequests={limitOfRequests}
          remainingNumberOfRequests={remainingNumberOfRequests}
        />
      )}
      <S.RequestPointsText>REQUEST POINTS LEFT</S.RequestPointsText>
    </S.RequestPointsContainer>
  )
}

export default GithubPoints
