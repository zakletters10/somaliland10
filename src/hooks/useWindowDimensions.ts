'use client'

import { useState, useEffect } from 'react'

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 1200,
    height: 800
  })

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Set initial dimensions
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export default useWindowDimensions 