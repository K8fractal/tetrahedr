import { BufferGeometryProps, MeshProps } from "@react-three/fiber";
import { Vector3 } from "three";

interface TetrahedronProps extends MeshProps {
  vertices?: Vector3[];
  color?: string;
}

interface TetrahedronGeometryProps extends BufferGeometryProps {
  vertices: Vector3[];
}

export const IrregularTetrahedronGeometry = (
  props: TetrahedronGeometryProps
) => {
  const indicesOfFaces = [2, 1, 0, 0, 3, 2, 1, 2, 3, 3, 0, 1];

  const vertices = computeFullVertexArray(props.vertices, indicesOfFaces);

  const verticesForBuffer = new Float32Array(flattenVector3Array(vertices));
  const normalsForBuffer = new Float32Array(
    flattenVector3Array(computeNormals(vertices))
  );

  return (
    <bufferGeometry attach="geometry">
      <bufferAttribute
        attach="attributes-position"
        array={verticesForBuffer}
        itemSize={3}
        count={12}
      />

      <bufferAttribute
        attach="attributes-normal"
        array={normalsForBuffer}
        itemSize={3}
        count={12}
      />
    </bufferGeometry>
  );
};

export const IrregularTetrahedron = (props: TetrahedronProps) => {
  //const verticesOfTetra = [0, 0, 0,   1, 1, 1,    1, -1, 1,   1, 0, 0];

  const verticesOfTetra = props.vertices
    ? props.vertices
    : [
        new Vector3(0, 0, 0),
        new Vector3(1, 1, 1),
        new Vector3(1, -1, 1),
        new Vector3(1, 0, 0),
      ];
  const indicesOfFaces = [2, 1, 0, 0, 3, 2, 1, 2, 3, 3, 0, 1];

  const vertices = computeFullVertexArray(verticesOfTetra, indicesOfFaces);

  const verticesForBuffer = new Float32Array(flattenVector3Array(vertices));
  const normalsForBuffer = new Float32Array(
    flattenVector3Array(computeNormals(vertices))
  );

  return (
    <mesh {...props}>
      <IrregularTetrahedronGeometry vertices={verticesOfTetra} />
      <meshStandardMaterial color={props.color ? props.color : "green"} />
    </mesh>
  );
};

export function computeFullVertexArray(
  vertices: Vector3[],
  indicesOfFaces: number[]
): Vector3[] {
  if (indicesOfFaces.length === 0) {
    return [];
  }
  if (Math.max(...indicesOfFaces) >= vertices.length) {
    throw new Error("Indices must be in the vertices array.");
  }
  const verticesArray = indicesOfFaces.map((vertexIndex) => {
    return vertices[vertexIndex];
  });
  return verticesArray;
}

export function computeNormals(fullVertices: Vector3[]): Vector3[] {
  if (fullVertices.length % 3 != 0) {
    throw new Error(
      `Faces must be triangles to compute normals. A length of ${fullVertices.length} does not divide into triangles.`
    );
  }
  const normalsArray: Vector3[] = [];
  for (let i = 0; i < fullVertices.length; i += 3) {
    const faceNormal = normalFromVertices(
      fullVertices[i],
      fullVertices[i + 1],
      fullVertices[i + 2]
    );
    normalsArray.push(faceNormal);
    normalsArray.push(faceNormal);
    normalsArray.push(faceNormal);
  }
  return normalsArray;
}

// a, b, and c represent corners of a triangle face in clockwise order.
// This function returns a perpendicular vector.
export function normalFromVertices(
  a: Vector3,
  b: Vector3,
  c: Vector3,
  normalize = false
): Vector3 {
  // addScaledVector changes the inputs. Use clone to prevent this.
  const normal = a
    .clone()
    .addScaledVector(b, -1)
    .cross(c.clone().addScaledVector(b, -1));
  if (normalize) {
    return normal.normalize();
  } else {
    return normal;
  }
}

export function flattenVector3Array(vectors: Vector3[]): number[] {
  const result = vectors.flatMap((value) => {
    return [value.x, value.y, value.z];
  });
  return result;
}
