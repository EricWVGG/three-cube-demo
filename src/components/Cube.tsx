import React, { useEffect, useRef } from 'react'
import { Euler, Quaternion } from "three"
import { isClient, useWindowSize } from '@utils'
import { throttle } from 'lodash'


export default () => {
  const windowSize = useWindowSize()
  const mesh = useRef<THREE.Mesh>()

  const rotationEuler = React.useMemo(() => new Euler(0, 0, 0), [])
  const rotationQuaternion = React.useMemo(() => new Quaternion(0, 0, 0, 0), [])

  useEffect(() => {
    if( !isClient ) return
    const updateMousePosition = throttle((e: MouseEvent) => {
      rotationEuler.set(
        (e.clientY / windowSize.y) - 0.5,
        (e.clientX / windowSize.x) - 0.5,
        0
      )
      rotationQuaternion.setFromEuler(rotationEuler)
      mesh.current?.quaternion.slerp(rotationQuaternion, 0.1)
    }, 5)
    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [mesh, rotationQuaternion, rotationEuler, windowSize])

  return (
    <>
      <mesh
        visible
        ref={mesh}
        position={[0, 0, -5]} 
      >
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshBasicMaterial attach="material" color="blue" />
      </mesh>
    </>
  )
}
