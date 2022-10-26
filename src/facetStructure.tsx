import { useState } from "react";
import { Quaternion, Vector3 } from "three";
import Facet, { FaceDescription, FacetVisuals, nextVisual } from "./Facet";

export interface FacetData {
  key: string;
  quaternion: Quaternion;
  position: Vector3;
  visual?: FacetVisuals;
}

export function adjacentCubePosition(startingFacet: FacetData): Vector3 {
  const newPosition = new Vector3(1, 0, 0)
    .applyQuaternion(startingFacet.quaternion)
    .add(startingFacet.position);
  //console.log(newPosition);
  return newPosition;
}

export function adjacentFacet(
  startingFacet: FacetData,
  faceNumber: number | undefined
): FacetData {
  const result = {
    key: startingFacet.key,
    position: startingFacet.position.clone(),
    quaternion: startingFacet.quaternion.clone(),
    visual: startingFacet.visual,
  };
  const SQRT1_2 = Math.SQRT1_2;

  switch (faceNumber) {
    case FaceDescription.NearEquilateral:
      result.key += "e";
      result.quaternion = startingFacet.quaternion
        .clone()
        .multiply(new Quaternion(SQRT1_2, 0, SQRT1_2, 0));
      break;
    case FaceDescription.LeftSide:
      result.key += "l";
      result.quaternion.multiply(new Quaternion(SQRT1_2, 0, 0, -SQRT1_2));
      break;
    case FaceDescription.RightSide:
      result.key += "r";
      result.quaternion.multiply(new Quaternion(SQRT1_2, 0, 0, SQRT1_2));
      break;
    case FaceDescription.QuarterSquare:
      result.key += "q";
      result.position = adjacentCubePosition(startingFacet);
      result.quaternion.multiply(new Quaternion(0, 0, 1, 0));
      break;
    default: // should never happen
      result.key += "_d_";
      result.position.x += 1;
  }
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FacetStructure = (props: Record<string, never>) => {
  const SQRT1_2 = Math.SQRT1_2;

  const baseFacet: FacetData = {
    key: "base_",
    position: new Vector3(0, 1, 0),
    quaternion: new Quaternion(SQRT1_2, -SQRT1_2, 0, 0),
    visual: FacetVisuals.TextureTest,
  };

  const [facets, setFacets] = useState([baseFacet]);

  return (
    <group>
      {facets.map((current: FacetData, index) => (
        <Facet
          onClick={(event) => (
            event.stopPropagation(),
            setFacets([...facets, adjacentFacet(current, event.faceIndex)])
          )}
          onContextMenu={(event) => {
            event.stopPropagation();

            current.visual = nextVisual(current.visual);
            setFacets([...facets]); //update the state
            // console.log(
            //   `right click on ${current.key} face ${event.faceIndex}. visual is now ${current.visual}`
            // );
          }}
          position={current.position}
          quaternion={current.quaternion}
          key={current.key ?? `facet${index}`}
          facetKey={current.key ?? `facet${index}`}
          visual={current.visual ?? FacetVisuals.TextureUV}
        />
      ))}
    </group>
  );
};
