import React, { useRef } from 'react'
import { useThree, useFrame } from "@react-three/fiber"
import {
  WebGLCubeRenderTarget,
  RGBFormat,
  LinearMipmapLinearFilter,
  Euler,
  Quaternion,
} from "three"


export default () => {
  const mesh = useRef<THREE.Mesh>()
  const { scene, gl } = useThree()

  const cubeCamera = React.useRef<THREE.CubeCamera>()
  const renderTarget = React.useMemo(
    () => new WebGLCubeRenderTarget(256, {
      format: RGBFormat,
      generateMipmaps: true,
      minFilter: LinearMipmapLinearFilter,
    }),
    []
  )

  const rotationEuler = React.useMemo(() => new Euler(0, 0, 0), [])
  const rotationQuaternion = React.useMemo(() => new Quaternion(0, 0, 0, 0), [])

  useFrame(({ clock }) => {
    if(!mesh || !mesh.current || !cubeCamera.current) return
    cubeCamera.current.update(gl, scene)
    rotationEuler.set(
      0,
      clock.getElapsedTime(),
      0
    )
    rotationQuaternion.setFromEuler(rotationEuler)
    mesh.current.quaternion.slerp(rotationQuaternion, 0.1)
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
