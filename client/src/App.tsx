// react
import { useState, useMemo } from "react"

// packages
import { Routes, Route, useLocation } from "react-router-dom";

// components
import Search from "./components/Search/Search";
import DisplayData from "./components/DisplayData/DisplayData";
import WebsiteInfo from "./components/WebsiteInfo/WebsiteInfo";
import GithubLink from "./components/GithubLink/GithubLink";
import RoutingComponent from "./components/RoutingComponent/RoutingComponent";

// styles
import * as S from "./App.styled"

// context
import { PaletteContext } from "./context/PaletteContext.js"
import { BlobContext } from "./context/BlobContext.js"
import { KeyboardNavigationContext } from "./context/KeyboardNavigationContext.js"
import { SearchContext } from "./context/SearchContext.js"



function App() {
  // palette context values
  // is localStorage is empty set defaults, it already have sth in it, set it
  // added non-null assertion operator for typescript, without we have an arror, even though with ternary operator we exclude the possibility of there being an error
  const initialPaletteState: SinglePaletteColor = "palette" in localStorage ? JSON.parse(localStorage.getItem("palette")!) : {
    color1: "#5D5c61",
    color2: "#379683",
    color3: "#7395AE",
    color4: "#557A95",
    color5: "#B1A296"
  }

  // states
  const [profileQuery, setProfileQuery] = useState<string>("")
  const [blobURLs, setBlobURLs] = useState([])
  const [keysVisible, setKeysVisible] = useState<boolean>(false)
  const [palette, setPalette] = useState<SinglePaletteColor>(initialPaletteState)
  const [paletteAnimationEnabled, setPaletteAnimationEnabled] = useState<boolean>(true)
  const [rolledOut, setRolledOut] = useState<boolean>(false)

  const visibility = useMemo(() => ({ keysVisible, setKeysVisible }), [keysVisible])

  // refs object to past forward 
  const Refs = {}

  // react router 
  const { state } = useLocation()

  return (
    <SearchContext.Provider value={{ profileQuery, setProfileQuery }}>
      <PaletteContext.Provider value={{
        palette, setPalette,
        paletteAnimationEnabled, setPaletteAnimationEnabled,
        rolledOut, setRolledOut
      }} >
        <BlobContext.Provider value={{ blobURLs, setBlobURLs }}>
          <KeyboardNavigationContext.Provider value={{ Refs, visibility }} >
            <S.AppContainer>
              <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/display" element={state == null ? <RoutingComponent path="/" /> : <DisplayData />} />
                <Route path="*" element={<RoutingComponent path="/" />} />
              </Routes>

              <WebsiteInfo />
              <GithubLink />
            </S.AppContainer>
          </KeyboardNavigationContext.Provider>
        </BlobContext.Provider>
      </PaletteContext.Provider>
    </SearchContext.Provider>
  );
}

export default App;
