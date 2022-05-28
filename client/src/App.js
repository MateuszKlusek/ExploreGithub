// react
import { useState, useMemo } from "react"

// packages
import { Routes, Route, useLocation } from "react-router-dom";

// components
import Search from "./components/Search/Search.jsx";
import DisplayData from "./components/DisplayData/DisplayData.jsx";
import RoutingComponent from "./components/RoutingComponent/RoutingComponent.jsx";
import WebsiteInfo from "./components/WebsiteInfo/WebsiteInfo.jsx";
import GithubLink from "./components/GithubLink/GithubLink.jsx";

// styles
import * as S from "./App.styled"

// context
import { PaletteContext } from "./context/PaletteContext.js"
import { BlobContext } from "./context/BlobContext.js"
import { KeyboardNavigationContext } from "./context/KeyboardNavigationContext.js"
import { SearchContext } from "./context/SearchContext.js"



function App() {

  const { state } = useLocation()
  const [profileQuery, setProfileQuery] = useState("")

  // palette context values
  // is localStorage is empty set defaults, it already have sth in it, set it
  const initialPaletteState = "palette" in localStorage ? JSON.parse(localStorage.getItem("palette")) : {
    color1: "#5D5c61",
    color2: "#379683",
    color3: "#7395AE",
    color4: "#557A95",
    color5: "#B1A296"
  }

  const [palette, setPalette] = useState(initialPaletteState)
  const [paletteAnimationEnabled, setPaletteAnimationEnabled] = useState(true)
  const [rolledOut, setRolledOut] = useState(false)


  const [blobURLs, setBlobURLs] = useState([])

  const Refs = {}
  const [keysVisible, setKeysVisible] = useState(false)
  const visibility = useMemo(() => ({ keysVisible, setKeysVisible }), [keysVisible])

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
