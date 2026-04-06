/**
 * Legacy chunk: English project list for the vendor bundle.
 * Edit in `src/data/legacy/projects-en.ts`.
 */
import { a, b, c, d, e, f } from "./legacy-thumbnails.js";
import { legacyProjectsEn } from "../data/legacy/projects-en.js";

const thumbs = [a, b, c, d, e, f] as const;

const u = legacyProjectsEn.map((row, ix) => ({
  ...row,
  thumbnail: thumbs[ix],
}));

export default u;
