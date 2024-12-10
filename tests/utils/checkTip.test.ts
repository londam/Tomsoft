import { describe, it, expect } from "vitest";
import checkTip from "../../src/utils/checkTip"; // Adjust the import to match the actual path of checkTip

describe("checkTip function", () => {
  // Test for valid 'placanja' type
  it("should return correct array for 'placanja' tip", () => {
    const result = checkTip("placanja");
    expect(result).toEqual(["obracun_placanja", "vrste_placanja_uid", "Plaćanja"]);
  });

  // Test for valid 'artikli' type
  it("should return correct array for 'artikli' tip", () => {
    const result = checkTip("artikli");
    expect(result).toEqual(["obracun_artikli", "artikl_uid", "Artikli"]);
  });

  // Test for invalid input
  it("should throw an error for invalid tip", () => {
    expect(() => checkTip("invalidTip")).toThrowError("Wrong type of 'tip obracuna'");
  });
});
