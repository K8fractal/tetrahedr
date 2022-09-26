import { useEffect, useRef, useState } from "react";
import THREE, { BufferAttribute, BufferGeometry, Mesh, Texture } from "three";
import { MeshProps } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

interface FacetProps extends MeshProps {
  texture?: Texture;
}

const Facet = (props: FacetProps) => {
  const facetRef = useRef<Mesh>(null); //Initally null, will be set in the object return.
  const uvMap = new BufferAttribute(
    new Float32Array([
      0, 0.5, 0.427, 0.427, 0.354, 0.854 /* equilateralish face*/, 0.5, 0, 0,
      0.5, 0.427, 0.427, 0, 0.5, 0.5, 0, 0,
      0 /* Right Isosceles Triangle Face*/, 0.427, 0.427, 0.854, 0.354, 0.5,
      0 /*equilateralish face*/,
    ]),
    2
  );
  // Measurements and template at https://www.desmos.com/geometry/bb66bkq2ub

  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);

  const x = 345; // This number doesn't seem to matter as long as it's positive

  const verticesOfTetra = [0, 0, 0, 1, 1, 1, 1, -1, 1, x, 0, 0];

  const indicesOfFaces = [2, 1, 0, 0, 3, 2, 1, 2, 3, 3, 0, 1];
  const [proportionalMap] = useTexture(["textures/uv.png"]);

  useEffect(() => {
    //     console.log("useEffect happened");
    //   if(tetraRef.current){ console.log("Reference Exists")}

    //For a proportional texture
    facetRef.current?.geometry.setAttribute("uv", uvMap);
  });
  console.log(verticesOfTetra);

  return (
    <mesh
      {...props}
      ref={facetRef}
      onClick={(event) =>
        /*click(!paused)*/ setRotationX(rotationX + Math.PI / 2)
      }
      onContextMenu={(event) => setRotationY(rotationY + Math.PI / 2)}
      rotation={[rotationX, rotationY, 0]}
    >
      <polyhedronGeometry
        args={[verticesOfTetra, indicesOfFaces, Math.sqrt(3) / 2, 0]}
      />
      <meshStandardMaterial color={"white"} map={proportionalMap} />
    </mesh>
  );
};

export default Facet;
