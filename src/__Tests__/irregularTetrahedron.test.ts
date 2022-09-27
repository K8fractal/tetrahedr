import {
  computeFullVertexArray,
  computeNormals,
  flattenVector3Array,
  normalFromVertices,
} from "../irregularTetrahedron";
import { Vector3 } from "three";

//Useful points for testing
const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
const origin = new Vector3(0, 0, 0);

describe("testing math functions in irregularTetrahedron", () => {
  test("compute full vertex array", () => {
    expect(
      computeFullVertexArray(
        [new Vector3(0, 0, 0), new Vector3(1, 1, 1)],
        [0, 0, 1]
      )
    ).toStrictEqual([
      new Vector3(0, 0, 0),
      new Vector3(0, 0, 0),
      new Vector3(1, 1, 1),
    ]);
    expect(computeFullVertexArray([x, y, z], [1, 2, 0, 2, 1, 0])).toStrictEqual(
      [y, z, x, z, y, x]
    );
    expect(computeFullVertexArray([new Vector3(1, 2, 3)], [])).toStrictEqual(
      []
    );
    expect(() => computeFullVertexArray([], [0, 1, 3, 4])).toThrow();
  });

  test("testing normal from vertices", () => {
    expect(normalFromVertices(x, origin, y)).toStrictEqual(z);
    expect(
      normalFromVertices(new Vector3(0, 0, 4), origin, y, true)
    ).toStrictEqual(new Vector3(-1, 0, 0));
    expect(
      normalFromVertices(new Vector3(0, 0, 4), origin, y, false)
    ).toStrictEqual(new Vector3(-4, 0, 0));
    expect(
      normalFromVertices(
        new Vector3(0, 0, 4),
        new Vector3(0, 0, 4),
        new Vector3(0, 0, 4),
        true
      )
    ).toStrictEqual(new Vector3(0, 0, 0));
    expect(
      normalFromVertices(
        new Vector3(1, 2, 4),
        new Vector3(-1, -1, -1),
        new Vector3(5, -3, 0),
        false
      )
    ).toStrictEqual(new Vector3(13, 28, -22));
  });

  test("testing flatten Vector3 array", () => {
    expect(flattenVector3Array([x])).toStrictEqual([1, 0, 0]);
    expect(
      flattenVector3Array([
        new Vector3(1, 2, 3),
        new Vector3(4, 5, 6),
        new Vector3(7, 8, 9),
      ])
    ).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test("testing compute normals", () => {
    expect(computeNormals([z, y, origin])).toStrictEqual([x, x, x]);
  });
});
