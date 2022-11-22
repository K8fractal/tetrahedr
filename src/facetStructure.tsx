import { ThreeEvent } from "@react-three/fiber";
import { Quaternion, Vector3 } from "three";
import Facet, { FaceDescription } from "./Facet";
import { useModeStore } from "./modeStore";
import { usePaletteStore } from "./paletteStore";
import { useStructureStore } from "./structureStore";

export interface FacetData {
  key: string;
  quaternion: Quaternion;
  position: Vector3;
  visualIndex: number; //index into palette
}

export function adjacentCubePosition(startingFacet: FacetData): Vector3 {
  const newPosition = new Vector3(1, 0, 0)
    .applyQuaternion(startingFacet.quaternion)
    .add(startingFacet.position);
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
    visualIndex: startingFacet.visualIndex,
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
      result.key += "_unexpectedDefault_";
      result.position.x += 1;
  }
  return result;
}

const baseFacet: FacetData = {
  key: "base_",
  position: new Vector3(0, 1, 0),
  //to prevent flicker on andriod, slight offset from Quaternion(SQRT1_2, -SQRT1_2, 0, 0)
  quaternion: new Quaternion(
    0.7070360811132631,
    -0.7070360811132631,
    0.009999000149975004,
    0.009999000149975004
  ),
  visualIndex: 0,
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FacetStructure = (props: Record<string, never>) => {
  const facets = useStructureStore((state) => state.structure);
  const setFacets = useStructureStore((state) => state.setStructure);
  const paintFacet = useStructureStore((state) => state.paintFacet);
  const nextVisual = usePaletteStore((state) => state.nextPaletteIndex);

  if (facets.length == 0) {
    setFacets([baseFacet]);
  }
  //const [facets, setFacets] = useState([baseFacet]);

  const mode = useModeStore((state) => state.mode);

  const handleClick = (
    event: ThreeEvent<MouseEvent>,
    facet: FacetData,
    facetIndex: number
  ): void => {
    switch (mode) {
      case "add":
        // eslint-disable-next-line no-case-declarations
        const newFacet = adjacentFacet(facet, event.faceIndex);
        if (facets.some((facet) => facet.key === newFacet.key)) {
          //duplicate key
          console.log("can't add, try zooming out");
          return;
        }
        setFacets([...facets, newFacet]);
        return;
      case "remove":
        setFacets([
          ...facets.slice(0, facetIndex),
          ...facets.slice(facetIndex + 1),
        ]);
    }
  };

  return (
    <group>
      {facets.map((current: FacetData, index) => (
        <Facet
          onClick={(event) => (
            event.stopPropagation(), handleClick(event, current, index)
          )}
          onContextMenu={(event) => {
            event.stopPropagation();
            paintFacet(index, nextVisual(current.visualIndex));
            console.log(nextVisual(current.visualIndex));
          }}
          // onContextMenu={(event) => {
          //   event.stopPropagation();
          //   current.visual = nextVisual(current.visual);
          //   setFacets([...facets]); //update the state
          //   // console.log(
          //   //   `right click on ${current.key} face ${event.faceIndex}. visual is now ${current.visual}`
          //   // );
          // }}
          position={current.position}
          quaternion={current.quaternion}
          key={current.key ?? `facet${index}`}
          facetKey={current.key ?? `facet${index}`}
          visualIndex={current.visualIndex ?? 0}
        />
      ))}
    </group>
  );
};
