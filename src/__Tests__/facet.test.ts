import { overwriteArrayRange } from "../Facet";

describe("testing overwriteArrayRange", () => {
  test("default value works", () => {
    expect(overwriteArrayRange(0, 2, [1, 2, 3, 4, 5])).toStrictEqual([
      0, 0, 3, 4, 5,
    ]);
  });
  test("overwrite with 1", () => {
    expect(
      overwriteArrayRange(4, 2, [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8], 1)
    ).toStrictEqual([0.1, 0.2, 0.3, 0.4, 1, 1, 0.7, 0.8]);
  });
  test("out of range error at end", () => {
    expect(() => overwriteArrayRange(1, 2, [3, 4])).toThrow();
  });
  test("out of range error at start", () => {
    expect(() => overwriteArrayRange(3, 2, [1, 1])).toThrow();
  });
  test("start index must be non-negative", () => {
    expect(() => overwriteArrayRange(-2, 3, [2, 2, 2, 2])).toThrow();
  });
  test("length must be non-negative", () => {
    expect(() => overwriteArrayRange(3, -1, [2, 2, 2, 2])).toThrow();
  });
  test("start index must be a whole number", () => {
    expect(() => overwriteArrayRange(0.5, 3, [2, 2, 2, 2])).toThrow();
  });
  test("length must be a whole number", () => {
    expect(() => overwriteArrayRange(0, 2.5, [2, 2, 2, 2])).toThrow();
  });
});
