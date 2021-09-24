import React, { useEffect, useRef, } from 'react'
import { useThree, useFrame } from "@react-three/fiber"
import {
  WebGLCubeRenderTarget,
  RGBFormat,
  LinearMipmapLinearFilter,
  Euler,
  Quaternion,
} from "three"
import { isClient, useWindowSize } from '@utils'
import { throttle } from 'lodash'


export default () => {
  const windowSize = useWindowSize()
  const mesh = useRef<THREE.Mesh>()

  const { scene, gl } = useThree()
  
  const cubeCamera = React.useRef<THREE.CubeCamera>()
    
  const renderTarget = React.useMemo(
    () => new WebGLCubeRenderTarget(256, {
        format: RGBFormat,
        generateMipmaps: true,
        minFilter: LinearMipmapLinearFilter,
      })
  , [])
  
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

  useFrame(() => {
    if(!mesh || !mesh.current || !cubeCamera.current) return
    cubeCamera.current.update(gl, scene)
    // https://tympanus.net/codrops/2020/09/30/creating-mirrors-in-react-three-fiber-and-three-js/
  })

  return (
    <>
      <cubeCamera 
        name="cubeCamera" 
        ref={cubeCamera} 
        args={[1, 1, renderTarget]} 
      />
      <mesh
        visible
        ref={mesh}
        position={[0, 0, -5]} 
      >
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshBasicMaterial 
          attach="material"
          envMap={cubeCamera.current?.renderTarget.texture}
        />
      </mesh>
    </>
  )
}
