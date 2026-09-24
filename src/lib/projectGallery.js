// Installation photo galleries, one per folder in public/projects/.
//
// The folder and photo list comes from src/lib/imageManifest.json, which
// `npm run images` generates — so after adding a folder or photo, just run
// that command. The first photo in each folder is used as the thumbnail.
import { MANIFEST_PROJECTS } from "@/lib/images";

// Display order (by folder name). Folders not listed here appear after
// these, alphabetically.
const ORDER = [
  "Holycross College",
  "Holycross School",
  "ONGC Panchabati road",
  "Chittaranjan",
  "Dharmanagar",
  "Shiv Palli, Badharghat",
  "Arundhuti Nagar",
  "Dhaleshwar",
  "Udaipur Brahmabari",
];

const rank = (title) => {
  const i = ORDER.indexOf(title);
  return i === -1 ? ORDER.length : i;
};

// `images` / `cover` are public paths such as "/projects/Dhaleshwar/1.png";
// pass them to <ProgressiveImage src=…> which resolves the optimized files.
export const PROJECT_GALLERY = [...MANIFEST_PROJECTS]
  .sort((a, b) => rank(a.title) - rank(b.title) || a.title.localeCompare(b.title))
  .map((p) => ({ ...p, cover: p.images[0] }));

export const getProjectById = (id) => PROJECT_GALLERY.find((p) => p.id === id);
