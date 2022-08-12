import { useRef, useState } from 'react'
import { Mesh } from 'three'
import { MeshProps, useFrame } from '@react-three/fiber'

const Tetrahedron = (props: MeshProps) => {
    const cubeRef= useRef<Mesh>(null); //Initally null, will be set in the object return.

    const [paused, click] = useState(false); 

    //by the time this gets called, cubeRef will point to the mesh object.
    useFrame((state,delta) => (cubeRef.current!.rotation.x += paused? 0:0.01))

    const verticesOfTetra = [
        0,0,0,      1,1,1,      1,0,1,      1,1,0,
      ];
    
    const indicesOfFaces = [
        2,1,0,    0,3,2,
        1,2,3,    3,0,1,
    ];

    return (
        <mesh
        {...props}
        ref = {cubeRef} 
        onClick={(event)=>click(!paused)}>
            <polyhedronGeometry args = {[verticesOfTetra, indicesOfFaces,1,0]}/>
            <meshStandardMaterial color='grey'/>
        </mesh>
    )

};

export default Tetrahedron;