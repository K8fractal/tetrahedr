import { Quaternion, Vector3 } from "three";
import {
  adjacentCubePosition,
  adjacentFacet,
  FacetData,
} from "../facetStructure";
const SQRT1_2 = Math.SQRT1_2;
import { FaceDescription } from "../Facet";

//mport { expect } from "@jest/globals";
//import type { MatcherFunction } from "expect";

/* Extended matchers for vectors and Quaternions
 * These should be moved to another file after development */

export const toBeCloseVector3 = function (
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

export const toBeSimilarQuaternion = function (
  this: jest.MatcherContext,
  received: Quaternion,
  expected: Quaternion,
  marginOfError = 0.001
) {
  const angleDiff = received.angleTo(expected);
  const pass = angleDiff < marginOfError;
  const message = () =>
    `Expected [${received.toArray()}] to be ${
      pass ? "more" : "less"
    } than ${marginOfError} radians rotated from [${expected.toArray()}]`;
  return { pass, message };
};

interface CustomMatchers<R = unknown> {
  toBeCloseVector3(expected: Vector3, marginOfError?: number): R;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Expect extends CustomMatchers {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Matchers<R> extends CustomMatchers<R> {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}

// declare module "expect" {
//   interface AsymmetricMatchers {
//     toBeCloseVector3(expected: Vector3, marginOfError: number): void;
//   }
//   interface Matchers<R> {
//     toBeCloseVector3(expected: Vector3, marginOfError: number): R;
//   }
// }

// expect.extend({
//   toBeCloseVector3,
//   toBeSimilarQuaternion,
// });

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

const facet62: FacetData = {
  key: "62",
  position: new Vector3(0, -3, 5),
  quaternion: new Quaternion(0, SQRT1_2, SQRT1_2, 0),
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

describe("testing adjacentFacet with right isoceles side and facet 12 and 62", () => {
  test("12->62 position", () => {
    expect(
      adjacentFacet(facet12, FaceDescription.QuarterSquare).position
    ).toBeCloseVector3(facet62.position);
  });
  test("62->12 position", () => {
    expect(
      adjacentFacet(facet62, FaceDescription.QuarterSquare).position
    ).toBeCloseVector3(facet12.position);
  });
  test("12->62 quaternion", () => {
    expect(
      adjacentFacet(facet12, FaceDescription.QuarterSquare).quaternion
    ).toBeSimilarQuaternion(facet62.quaternion);
  });
  test("62->12 quaternion", () => {
    expect(
      adjacentFacet(facet62, FaceDescription.QuarterSquare).quaternion
    ).toBeSimilarQuaternion(facet12.quaternion);
  });
});
