import { useEffect, useRef, useState } from "react";
import THREE, {
  BufferAttribute,
  BufferGeometry,
  Mesh,
  Texture,
  Vector3,
} from "three";
import { MeshProps } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { IrregularTetrahedronGeometry } from "./irregularTetrahedron";

interface FacetProps extends MeshProps {
  texture?: Texture;
}

// prettier-ignore
const uvArrayStash = [
  0, 0.5,         0.427, 0.427,   0.354, 0.854, 
  0.5, 0,         0, 0.5,         0.427, 0.427, 
  0, 0.5,         0.5, 0,         0, 0, 
  0.5, 0,         0.854, 0.354,   0.427, 0.427,   
];

// prettier-ignore
const uvArrayTest = [
  1, 0.5,         0.5, 1,         0.5, 0.5, 
  0.5, 0.5,       0.5, 0.146,     1, 0.5,
  0.25, 0,   0, 0.25,   0.302,0.302, // This one needs to be fixed
  0.146, 0.5,     0.5, 0.5,       0.5, 1   
]

/*const indicesOfFaces = 
[ 1, 2, 3, 
  3, 0, 1, 
  2, 1, 0, 
  0, 3, 2,];*/

const Facet = (props: FacetProps) => {
  const facetRef = useRef<Mesh>(null); //Initally null, will be set in the object return.
  const uvMap = new BufferAttribute(new Float32Array(uvArrayTest), 2);
  // Measurements and template at https://www.desmos.com/geometry/bb66bkq2ub

  const verticesOfTetra = [
    new Vector3(0, 0, 0),
    new Vector3(0.5, 0.5, 0.5),
    new Vector3(0.5, -0.5, 0.5),
    new Vector3(0.5, 0, 0),
  ];
  const [proportionalMap] = useTexture(["textures/FacetTestTexture.png"]);

  useEffect(() => {
    //     console.log("useEffect happened");
    //   if(tetraRef.current){ console.log("Reference Exists")}

    //For a proportional texture
    facetRef.current?.geometry.setAttribute("uv", uvMap);
  });

  return (
    <mesh
      {...props}
      ref={facetRef}
      onClick={(event) => console.log("leftclick")}
      onContextMenu={(event) => console.log("rightclick")}
      onPointerOver={(e) => console.log("over")}
      onPointerOut={(e) => console.log("out")}
    >
      <IrregularTetrahedronGeometry vertices={verticesOfTetra} />
      <meshStandardMaterial color={"lightgray"} map={proportionalMap} />
    </mesh>
  );
};

export default Facet;
