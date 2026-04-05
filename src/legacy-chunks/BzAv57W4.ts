/**
 * Legacy chunk: English project list (`BzAv57W4.js`).
 * Edit in `src/data/legacy/projects-en.ts`.
 */
import { a, b, c, d, e, f } from "./DABWVKfi.js";
import { legacyProjectsEn } from "../data/legacy/projects-en.js";

const thumbs = [a, b, c, d, e, f] as const;

const u = legacyProjectsEn.map((row, ix) => ({
  ...row,
  thumbnail: thumbs[ix],
}));

export default u;
