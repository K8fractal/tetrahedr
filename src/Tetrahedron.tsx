import { useEffect, useRef, useState } from 'react'
import { BufferAttribute, Mesh, PolyhedronBufferGeometry } from 'three'
import { MeshProps, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei';

const Tetrahedron = (props: MeshProps) => {
    const tetraRef= useRef<Mesh>(null); //Initally null, will be set in the object return.

    const [paused, click] = useState(true); 
    const [rotationX, setRotationX] = useState(0);
    const [rotationY, setRotationY] = useState(0);

    //by the time this gets called, cubeRef will point to the mesh object.
    //useFrame((state,delta) => (cubeRef.current!.rotation.x = paused? 0:Math.PI/2))

    const verticesOfTetra = [
        0,0,0,      1,1,1,      1,-1,1,      1,1,-1,
      ];
    
    const indicesOfFaces = [
        2,1,0,    0,3,2,
        1,2,3,    3,0,1,
    ];

   // const [colorMap]= useTexture(['textures/ceramic_32_basecolor-1K.png']);
    const [colorMap]= useTexture(['textures/test.png']);

 /*   const textureProps = useTexture({
        map: 'textures/ceramic_32_basecolor-1K.png',
        normalMap: 'textures/ceramic_32_normal-1K.png',
        roughnessMap: 'textures/ceramic_32_roughness-1K.png',
        aoMap: 'textures/ceramic_32_ambientocclusion-1K.png',
      })*/

      useEffect(()=> {
    //     console.log("useEffect happened");
    //   if(tetraRef.current){ console.log("Reference Exists")}
      tetraRef.current?.geometry.setAttribute("uv",new BufferAttribute(new Float32Array(
        [0.5, 0.5,     0, 1,      0, 0.5, /*equilateralish face*/
        0.5, 0.5,      0, 0.5,      0.5, 0,
        0,0,      0, 0.5,      0.5 , 0, /* Right Isosceles Triangle Face*/
        0.5, 0.5,          1, 0,      0.5, 0 /*equilateralish face*/])
        ,2))
     
      });
      
    return (
        <mesh
        {...props}
        ref = {tetraRef} 
        onClick={(event)=>/*click(!paused)*/setRotationX(rotationX+Math.PI/2)}
        onContextMenu = {(event)=>setRotationY(rotationY+Math.PI/2)}
        rotation = {[rotationX,rotationY,0]}
        >
             <polyhedronGeometry args = {[verticesOfTetra, indicesOfFaces,Math.sqrt(3)/2,0]} /> 
            <meshStandardMaterial color={'white'} map={colorMap}/>
        </mesh>
    )

};

export default Tetrahedron;