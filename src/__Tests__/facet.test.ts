import { arrayWithOverwrittenRange } from "../Facet";

describe("testing overwriteArrayRange", () => {
  test("default value works", () => {
    expect(arrayWithOverwrittenRange(0, 2, [1, 2, 3, 4, 5])).toStrictEqual([
      0, 0, 3, 4, 5,
    ]);
  });
  test("overwrite with 1", () => {
    expect(
      arrayWithOverwrittenRange(
        4,
        2,
        [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
        1
      )
    ).toStrictEqual([0.1, 0.2, 0.3, 0.4, 1, 1, 0.7, 0.8]);
  });
  test("out of range error at end", () => {
    expect(() => arrayWithOverwrittenRange(1, 2, [3, 4])).toThrow();
  });
  test("out of range error at start", () => {
    expect(() => arrayWithOverwrittenRange(3, 2, [1, 1])).toThrow();
  });
  test("start index must be non-negative", () => {
    expect(() => arrayWithOverwrittenRange(-2, 3, [2, 2, 2, 2])).toThrow();
  });
  test("length must be non-negative", () => {
    expect(() => arrayWithOverwrittenRange(3, -1, [2, 2, 2, 2])).toThrow();
  });
  test("start index must be a whole number", () => {
    expect(() => arrayWithOverwrittenRange(0.5, 3, [2, 2, 2, 2])).toThrow();
  });
  test("length must be a whole number", () => {
    expect(() => arrayWithOverwrittenRange(0, 2.5, [2, 2, 2, 2])).toThrow();
  });

  test("replacing with xy pair", () => {
    expect(
      arrayWithOverwrittenRange(0, 4, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, 11)
    ).toStrictEqual([10, 11, 10, 11, 4, 5, 6, 7, 8, 9]);
  });
});
