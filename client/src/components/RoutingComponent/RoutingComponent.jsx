/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function RoutingComponent(props) {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(props.path)
  }, [])

  return <></>
}

export default RoutingComponent
