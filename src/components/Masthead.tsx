import React, { Suspense, useState } from 'react'
import styled from 'styled-components'
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, AdaptiveDpr } from '@react-three/drei'

import { SkyBox, EmptyBox, Cube, MirrorCube, RotatingCube } from '@components'


const Masthead = () => {
  const [demoModel, setDemoModel] = useState<'mirror' | 'flat' | 'rotatingMirror'>('mirror')
  return (
    <>
      <button onClick={() => setDemoModel('mirror')} >toggle Mirror model</button>
      <button onClick={() => setDemoModel('flat')} >toggle Flat model</button>
      <button onClick={() => setDemoModel('rotatingMirror')} >toggle Rotating Mirror model</button>
      <Wrapper>
        {typeof window !== 'undefined' && (<Canvas
            dpr={1}
            className="canvas" 
            style={{height: '56.25vw'}}
            mode="concurrent"
          >
            <PerspectiveCamera makeDefault fov={65} aspect={.5625} />
            <AdaptiveDpr pixelated />
            <Suspense fallback={<EmptyBox />} > 
              <Suspense fallback={<EmptyBox />} > 
                <SkyBox />
                <Suspense fallback={<EmptyBox />} >
                  {demoModel === 'mirror' && <MirrorCube />}
                  {demoModel === 'flat' && <Cube />}
                  {demoModel === 'rotatingMirror' && <RotatingCube />}
                </Suspense>
              </Suspense>
            </Suspense>
          </Canvas>
        )}
      </Wrapper>
    </>
  )
}


const Wrapper = styled.header`
  position: relative;
  canvas {
    width: 100%;
    height: 100vw;
    @media only screen and (min-width: 768px) {
      height: 56.25vw;      
    }
  }
`


export default Masthead