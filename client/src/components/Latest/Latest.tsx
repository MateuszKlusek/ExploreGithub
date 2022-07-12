// react
import {
  useState,
  useEffect,
  memo,
} from 'react'

// packages
import axios from 'axios'

// components
import SingleUser from '../SingleUser/SingleUser'

// styles
import * as S from './Latest.styled'

// helpers
import { axiosURL } from '../../config/axios'

const Latest = memo((props) => {
  // styles
  const [latestThree, setLatestThree] = useState<ISingleUserData[]>([{}, {}, {}])

  // refs
  useEffect(() => {
    getLatestThree()
  }, [])


  const getLatestThree = async () => {
    console.log(`${axiosURL}/getLatestThree`);
    const response = await axios({
      method: 'get',
      url: `${axiosURL}/getLatestThree`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    setLatestThree(response.data.data)
  }

  return (
    <S.LatestContainer>
      <S.LatestTitle> Latest profiles </S.LatestTitle>
      <S.SingleUsersContainer>
        <SingleUser data={latestThree[0]} />
        <SingleUser data={latestThree[1]} />
        <SingleUser data={latestThree[2]} />
      </S.SingleUsersContainer>
    </S.LatestContainer>
  )
})

export default Latest
