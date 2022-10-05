import { useState } from "react";
import { Quaternion, Vector3 } from "three";
import Facet, { FaceDescription } from "./Facet";

interface FacetData {
  key: string;
  quaternion: Quaternion;
  position: Vector3;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FacetStructure = (props: Record<string, never>) => {
  const SQRT1_2 = Math.SQRT1_2;

  const baseFacet: FacetData = {
    key: "base_",
    position: new Vector3(0, 1, 0),
    quaternion: new Quaternion(SQRT1_2, -SQRT1_2, 0, 0),
  };

  const newFacet: FacetData = {
    key: "new",
    position: new Vector3(1, 1, 0),
    quaternion: new Quaternion(SQRT1_2, -SQRT1_2, 0, 0),
  };
  const [facets, setFacets] = useState([baseFacet]);

  function adjacentFacet(
    startingFacet: FacetData,
    faceNumber: number | undefined
  ): FacetData {
    let result = {
      key: startingFacet.key + "d_",
      position: new Vector3(
        startingFacet.position.x + 1,
        startingFacet.position.y,
        startingFacet.position.z
      ),
      quaternion: startingFacet.quaternion,
    };
    switch (faceNumber) {
      case FaceDescription.NearEquilateral:
        result = {
          key: startingFacet.key + "e",
          position: startingFacet.position,
          quaternion: startingFacet.quaternion
            .clone()
            .multiply(new Quaternion(SQRT1_2, 0, SQRT1_2, 0)),
        };
        //console.log("NearEquilater: " + result.quaternion.toArray());
        return result;
      case FaceDescription.LeftSide:
        result = {
          key: startingFacet.key + "l",
          position: startingFacet.position,
          quaternion: startingFacet.quaternion
            .clone()
            .multiply(new Quaternion(SQRT1_2, 0, 0, -SQRT1_2)),
        };
        return result;
      case FaceDescription.RightSide:
        result = {
          key: startingFacet.key + "r",
          position: startingFacet.position,
          quaternion: startingFacet.quaternion
            .clone()
            .multiply(new Quaternion(SQRT1_2, 0, 0, SQRT1_2)),
        };
        return result;
      case FaceDescription.HalfSquare:
      default:
        return result;
    }
  }

  return (
    <group>
      {facets.map((current: FacetData, index) => (
        <Facet
          onClick={(event) => (
            event.stopPropagation(),
            setFacets([...facets, adjacentFacet(current, event.faceIndex)])
          )}
          onContextMenu={(event) => console.log(event.faceIndex)}
          position={current.position}
          quaternion={current.quaternion}
          key={current.key ? current.key : `facet${index}`}
        />
      ))}
    </group>
  );
};
