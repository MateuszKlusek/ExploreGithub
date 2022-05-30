// react
import { useEffect } from 'react'

// packages
import { useNavigate } from 'react-router-dom'



const RoutingComponent: React.FC<RoutingComponentProps> = (props) => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(props.path)
  }, [])

  return <></>
}

export default RoutingComponent
