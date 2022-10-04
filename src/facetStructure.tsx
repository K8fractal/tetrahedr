import { useState } from "react";
import { Quaternion, Vector3 } from "three";
import Facet from "./Facet";

interface FacetData {
  key?: string;
  quaternion: Quaternion;
  position: Vector3;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FacetStructure = (props: Record<string, never>) => {
  const SQRT1_2 = Math.SQRT1_2;

  const baseFacet: FacetData = {
    key: "base",
    position: new Vector3(0, 1, 0),
    quaternion: new Quaternion(SQRT1_2, -SQRT1_2, 0, 0),
  };

  const newFacet: FacetData = {
    key: "new",
    position: new Vector3(1, 1, 0),
    quaternion: new Quaternion(SQRT1_2, -SQRT1_2, 0, 0),
  };
  const [facets, setFacets] = useState([baseFacet]);

  return (
    <group>
      {facets.map((data: FacetData, index) => (
        <Facet
          //onClick={(event) => setFacets([...facets, newFacet])}
          onContextMenu={(event) => console.log("rightclick")}
          position={data.position}
          quaternion={data.quaternion}
          key={data.key ? data.key : `facet${index}`}
        />
      ))}
    </group>
  );
};
