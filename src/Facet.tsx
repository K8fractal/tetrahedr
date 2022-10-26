import { useEffect, useRef, useState } from "react";
import { BufferAttribute, Color, Mesh, Vector3 } from "three";
import { MeshProps } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { IrregularTetrahedronGeometry } from "./irregularTetrahedron";

interface FacetProps extends MeshProps {
  visual?: FacetVisuals;
  facetKey: string;
}

export enum FaceDescription {
  QuarterSquare = 0,
  NearEquilateral = 2,
  RightSide = 3,
  LeftSide = 1,
}

// prettier-ignore
const uvArray = [
  1, 0.5,         0.5, 1,         0.5, 0.5, 
  0.5, 0.5,       0.5, 0.146,     1, 0.5,
  0.25, 0,        0, 0.25,        0.302,0.302, 
  0.146, 0.5,     0.5, 0.5,       0.5, 1   
];

export enum FacetVisuals {
  TextureTest,
  // TextureEdgeHighlight,
  // ColorBlack,
  TextureUV,
}

interface VisualDetails {
  uvArray: number[];
  textureSource: string;
  color: Color;
}

export function nextVisual(visual?: FacetVisuals): FacetVisuals | undefined {
  console.log(`Swapping visual from ${visual}`);
  switch (visual) {
    case FacetVisuals.TextureTest:
      return FacetVisuals.TextureUV;
    case FacetVisuals.TextureUV:
      return FacetVisuals.TextureTest;
  }
}

function getVisualDetails(key: FacetVisuals): VisualDetails {
  switch (key) {
    case FacetVisuals.TextureUV:
      return {
        uvArray,
        textureSource: "textures/CustomUVChecker_byValle_1K.png",
        color: new Color("white"),
      };
    case FacetVisuals.TextureTest:
    default:
      return {
        uvArray,
        textureSource: "textures/FacetTestTexture.png",
        color: new Color("lightgray"),
      };
  }
}

export function arrayWithOverwrittenRange(
  startIndex: number,
  length: number,
  data: number[],
  replace = 0
): number[] {
  if (startIndex + length > data.length) {
    throw new RangeError("attempt to overwrite non-existant data");
  }
  if (startIndex < 0 || startIndex % 1 != 0) {
    throw new TypeError("startIndex must be a non-negative integer");
  }
  if (length < 0 || length % 1 != 0) {
    throw new TypeError("length must be a non-negative integer");
  }
  return [...data].fill(replace, startIndex, startIndex + length);
  // return data.map((value, index) =>
  //   index >= startIndex && index < startIndex + length ? replace : value
  // );
}

const Facet = (props: FacetProps) => {
  const facetRef = useRef<Mesh>(null); //Initally null, will be set in the object return.
  const verticesOfTetra = [
    new Vector3(0, 0, 0),
    new Vector3(0.5, 0.5, 0.5),
    new Vector3(0.5, -0.5, 0.5),
    new Vector3(0.5, 0, 0),
  ];
  const visuals = getVisualDetails(props.visual ?? FacetVisuals.TextureTest);

  const uvMap = new BufferAttribute(new Float32Array(visuals.uvArray), 2);
  // Use 0,0 as the uv index for selected faces
  const uvSelectedFace = [0, 6, 12, 18].map(
    (value) =>
      new BufferAttribute(
        new Float32Array(arrayWithOverwrittenRange(value, 6, visuals.uvArray)),
        2
      )
  );
  // Measurements and template at https://www.desmos.com/geometry/bb66bkq2ub
  const [TextureMap] = useTexture([visuals.textureSource]);

  const [selectedFace, setSelectedFace] = useState<undefined | number>(
    undefined
  );

  useEffect(() => {
    if (selectedFace == undefined) {
      facetRef.current?.geometry.setAttribute("uv", uvMap);
    } else {
      facetRef.current?.geometry.setAttribute(
        "uv",
        uvSelectedFace[selectedFace]
      );
    }
  });
  console.log(`rendering ${props.facetKey}`);
  return (
    <mesh
      {...props}
      ref={facetRef}
      // onClick={(event) => console.log(event.faceIndex)}
      // onContextMenu={(event) => console.log("rightclick")}
      onPointerOver={(event) => (
        event.stopPropagation(), setSelectedFace(event.faceIndex)
      )}
      onPointerMove={(event) => (
        event.stopPropagation(), setSelectedFace(event.faceIndex)
      )}
      onPointerOut={(event) => (
        event.stopPropagation(), setSelectedFace(undefined)
      )}
    >
      <IrregularTetrahedronGeometry vertices={verticesOfTetra} />
      <meshStandardMaterial color={visuals.color} map={TextureMap} />
    </mesh>
  );
};

export default Facet;
