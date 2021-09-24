import { useThree } from '@react-three/fiber'
import { useCubeTexture } from '@react-three/drei'
import { sRGBEncoding } from 'three'


// note to self: 6th element is the back of the cube

const SkyBox = () => {
  const { scene } = useThree()
  const envMap = useCubeTexture([
    'cats.png',
    'cats.png',
    'cats.png',
    'cats.png',
    'cats.png',
    'cats.png',
  ], { path: 'images/' })  
  envMap.encoding = sRGBEncoding
  
  scene.background = envMap    
  return null
}

export default SkyBox


useCubeTexture.preload([
  "cats.png",
  "cats.png",
  "cats.png",
  "cats.png",
  "cats.png",
  "cats.png",
], { path: 'images/' })
