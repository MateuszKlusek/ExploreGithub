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

interface ISingleUserData {
  data?: any
}

interface KeyboardIconProps {
  buttonKey: string
  horizontal: 'left' | 'right'
  vertical: 'top' | 'bottom'
  shape?: string
  size?: string
  right?: number
  left?: number
  top?: number
  bottom?: number
  theme: string
}

interface GoBackProps {
  color: string
}

interface KeyboardNavigationProps {
  top: number
  opacity: number
  color: string
}

interface Ishape_straight {
  right?: string
  left?: string
}

interface ChartProps {
  title: string
  data: any
}

interface TopReposProps {
  data: any
}

interface TopReposSingleRepoProps {
  data: any
}
