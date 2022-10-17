/* eslint-disable @typescript-eslint/no-namespace */
import { Quaternion, Vector3 } from "three";
import { adjacentCubePosition, FacetData } from "../facetStructure";
const SQRT1_2 = Math.SQRT1_2;
import { expect } from "@jest/globals";
import { type } from "os";
//import type { MatcherFunction } from "expect";

/* Extended matchers for vectors and Quaternions
 * These should be moved to another file after development */

const toBeCloseVector3 = function (
  this: jest.MatcherContext,
  received: Vector3,
  expected: Vector3,
  marginOfError = 0.001
) {
  // Type testing goes here, somehow?
  const diff = new Vector3();
  diff.subVectors(received, expected);
  const pass = diff.length() < marginOfError;
  const message = () =>
    `Expected [${received.toArray()}] to be ${
      pass ? "further" : "closer"
    } than ${marginOfError} ${pass ? "from" : "to"} [${expected.toArray()}]`;
  return { pass, message };
};

expect.extend({
  toBeCloseVector3,
});

declare module "expect" {
  interface AsymmetricMatchers {
    toBeCloseVector3(expected: Vector3, marginOfError: number): void;
  }
  interface Matchers<R> {
    toBeCloseVector3(expected: Vector3, marginOfError: number): R;
  }
}
/* End of matchers work */

const baseFacet: FacetData = {
  key: "base_",
  position: new Vector3(0, 1, 0),
  quaternion: new Quaternion(SQRT1_2, -SQRT1_2, 0, 0),
};

const facet12: FacetData = {
  key: "12",
  position: new Vector3(-1, -3, 5),
  quaternion: new Quaternion(SQRT1_2, 0, 0, -SQRT1_2),
};

describe("testing adjacentCubePosition", () => {
  test("works on 12", () => {
    expect(adjacentCubePosition(facet12)).toBeCloseVector3(
      new Vector3(0, -3, 5)
    );
  });
  test("base facet adjacent to origin cube", () => {
    expect(adjacentCubePosition(baseFacet)).toBeCloseVector3(
      new Vector3(0, 0, 0)
    );
  });
});
