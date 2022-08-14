import { useRef, useState } from 'react'
import { Mesh } from 'three'
import { MeshProps, useFrame } from '@react-three/fiber'

const Cube = (props: MeshProps) => {
    const cubeRef= useRef<Mesh>(null); //Initally null, will be set in the object return.

    const [paused, click] = useState(true); 

    //by the time this gets called, cubeRef will point to the mesh object.
    useFrame((state,delta) => (cubeRef.current!.rotation.x = paused? 0:0))

    return (
        <mesh
        {...props}
        ref = {cubeRef} 
        onClick={(event)=>click(!paused)}
        >
            <boxGeometry args = {[1,1,1]}/>
            <meshStandardMaterial color='green' transparent={true} opacity={0.5}/>
        </mesh>
    )

};

export default Cube;