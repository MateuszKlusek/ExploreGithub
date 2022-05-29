import {
  useState,
  useEffect,
  useContext,
  useRef,
  memo,
} from 'react'


import axios from 'axios'

// components
import SingleUser from '../SingleUser/SingleUser'

// styles
import * as S from './Latest.styled'

// context
import { PaletteContext } from '../../context/PaletteContext.js'
import { BlobContext } from '../../context/BlobContext.js'
import { SearchContext } from '../../context/SearchContext.js'
import { KeyboardNavigationContext } from '../../context/KeyboardNavigationContext.js'

// helpers
import { axiosURL } from '../../config/axios.js'

const Latest = memo((props) => {
  const [latestThree, setLatestThree] = useState<ISingleUserData[]>([{}, {}, {}])
  const [githubAvatarsLoaded, setGithubAvatarsLoaded] = useState(false)

  const { profileQuery, setProfileQuery } = useContext(SearchContext)
  const SingleUserRef = useRef([])

  const { palette, setPalette, paletteAnimationEnabled, setPaletteAnimationEnabled } =
    useContext(PaletteContext)
  const { blobURLs, setBlobURLs } = useContext(BlobContext)
  const { Refs, visibility } = useContext(KeyboardNavigationContext)
  const { keysVisible, setKeysVisible } = visibility

  useEffect(() => {
    getLatestThree()
  }, [])

  // useDebugValue({ latestThree: latestThree ?? 'loading...' })
  // check if the github icons are loaded
  // useEffect(()=>{
  //     const interval = setInterval(() => {
  //         var resources = window.performance.getEntries()
  //         var counter = 0
  //         for (var a of resources){
  //             if (a.name.startsWith("https://avatars")){
  //                 console.log(a.name);
  //                 counter +=1
  //             }
  //         }
  //         if (counter ===3){
  //             clearInterval(interval)
  //             console.log("loaded all 3 avatars");
  //         }

  //     }, 100);

  //     return () => clearInterval(interval);
  // },[])

  //   useLayoutEffect(() => {
  //     if (initialRender.current) {
  //       initialRender.current = false
  //     } else {
  //       for (var i = 0; i < 3; i++) {
  //         if (blobURLs[i] !== undefined) {
  //           SingleUserRef.current[i].src = blobURLs[i]
  //         } else {
  //           SingleUserRef.current[i].src = spinner
  //         }
  //       }
  //     }
  //   }, [palette, keysVisible, paletteAnimationEnabled, profileQuery])

  const initialRender = useRef(true)
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
      console.log(latestThree)
    }
  }, [latestThree])

  const getLatestThree = async () => {
    const response = await axios({
      method: 'get',
      url: `${axiosURL}/getLatestThree`,
    })
    setLatestThree(response.data.data)
    // after the component is rendered, get avatars
    getGithubAvatarUrl(response.data.data)
  }

  const getGithubAvatarUrl = async (data: any) => {
    // for (var i = 0; i < 3; i++) {
    //   SingleUserRef.current[i].src = spinner
    // }

    for (var idx in data) {
      const response = await axios({
        method: 'get',
        url: `${data[idx].avatar_url}`,
        responseType: 'blob',
      })

      let imgUrl = URL.createObjectURL(response.data)
      var temp = blobURLs
      temp.push(imgUrl)
      setBlobURLs(temp)
      SingleUserRef.current[idx].src = imgUrl
    }
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
