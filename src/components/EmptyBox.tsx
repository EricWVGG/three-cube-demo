import React from 'react'


const EmptyBox = (props: any) => {
  return (
    <mesh {...props} scale={0.01} >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
    </mesh>
  )
}


export default EmptyBox