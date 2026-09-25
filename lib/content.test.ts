import { describe, expect, it } from "vitest";
import { experienceYears } from "./content";

describe("experienceYears", () => {
  it("is 0 before the first anniversary", () => {
    expect(experienceYears(new Date(2025, 4, 31))).toBe(0);
  });

  it("counts whole years since June 2024", () => {
    expect(experienceYears(new Date(2025, 5, 1))).toBe(1);
    expect(experienceYears(new Date(2026, 8, 25))).toBe(2);
  });

  it("never goes negative for dates before the start", () => {
    expect(experienceYears(new Date(2020, 0, 1))).toBe(0);
  });
});
