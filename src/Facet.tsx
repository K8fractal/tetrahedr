import { useEffect, useRef, useState } from "react";
import { BufferAttribute, Mesh, Texture, Vector3 } from "three";
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
const uvArray = [
  1, 0.5,         0.5, 1,         0.5, 0.5, 
  0.5, 0.5,       0.5, 0.146,     1, 0.5,
  0.25, 0,   0, 0.25,   0.302,0.302, 
  0.146, 0.5,     0.5, 0.5,       0.5, 1   
];

/*const indicesOfFaces = 
[ 1, 2, 3, 
  3, 0, 1, 
  2, 1, 0, 
  0, 3, 2,];*/

function zeroArrayRange(
  startIndex: number,
  length: number,
  data: number[]
): number[] {
  return data.map((value, index) =>
    index >= startIndex && index < startIndex + length ? 0 : value
  );
}

const Facet = (props: FacetProps) => {
  const facetRef = useRef<Mesh>(null); //Initally null, will be set in the object return.
  const uvMap = new BufferAttribute(new Float32Array(uvArray), 2);

  // Use 0,0 as the uv index for selected faces
  const uvSelectedFace = [0, 6, 12, 18].map(
    (value) =>
      new BufferAttribute(
        new Float32Array(zeroArrayRange(value, 6, uvArray)),
        2
      )
  );
  // Measurements and template at https://www.desmos.com/geometry/bb66bkq2ub

  const verticesOfTetra = [
    new Vector3(0, 0, 0),
    new Vector3(0.5, 0.5, 0.5),
    new Vector3(0.5, -0.5, 0.5),
    new Vector3(0.5, 0, 0),
  ];
  const [proportionalMap] = useTexture(["textures/FacetTestTexture.png"]);

  const [selectedFace, setSelectedFace] = useState<undefined | number>(
    undefined
  );

  useEffect(() => {
    //     console.log("useEffect happened");
    // if (facetRef.current) {
    //   console.log("useEffect: " + selectedFace);
    // }

    if (selectedFace == undefined) {
      facetRef.current?.geometry.setAttribute("uv", uvMap);
    } else {
      facetRef.current?.geometry.setAttribute(
        "uv",
        uvSelectedFace[selectedFace]
      );
    }
  });

  return (
    <mesh
      {...props}
      ref={facetRef}
      onClick={(event) => console.log(event.faceIndex)}
      onContextMenu={(event) => console.log("rightclick")}
      onPointerOver={(event) => setSelectedFace(event.faceIndex)}
      onPointerMove={(event) => setSelectedFace(event.faceIndex)}
      onPointerOut={(event) => setSelectedFace(undefined)}
    >
      <IrregularTetrahedronGeometry vertices={verticesOfTetra} />
      <meshStandardMaterial color={"lightgray"} map={proportionalMap} />
    </mesh>
  );
};

export default Facet;
