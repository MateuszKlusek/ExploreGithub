interface SinglePaletteColor {
  color1: string
  color2: string
  color3: string
  color4: string
  color5: string
}

interface IWindowSize {
  size: {
    width: number | undefined
    height: number | undefined
  }
}

interface RoutingComponentProps {
  path: string
}

interface GithubPointsProps {
  limitOfRequests: string
  remainingNumberOfRequests: string
}

// SingleUser
interface GithubNameLoaderProps {
  size: string
}
