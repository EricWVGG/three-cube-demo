import React from 'react'
import { isClient } from '@utils'

export default () => {
  const getSize = (): {x: number, y: number} => {
    return {
      x: isClient ? window.innerWidth : 9999,
      y: isClient ? window.innerHeight : 9999
    };
  }

  const [windowSize, setWindowSize] = React.useState(getSize)

  React.useEffect(() => {
    if (!isClient) return
    const handleResize = () => setWindowSize(getSize())
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return windowSize;
}
