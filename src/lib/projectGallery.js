// Installation photo galleries, one entry per folder in public/projects/.
// CRA can't list the public/ directory at runtime, so when you add a new
// folder or photo, add it here too. The first file is used as the thumbnail.

const FOLDERS = [
  { name: "Holycross College", files: ["1.JPG", "2.JPG", "3.JPG", "4.png", "5.png", "6.png", "7.png", "8.png"] },
  { name: "Holycross School", files: ["1.JPG", "2.JPG", "3.JPG", "4.JPG", "5.JPG", "6.png", "7.png", "8.png", "9.png", "10.png"] },
  { name: "ONGC Panchabati road", files: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"] },
  { name: "Chittaranjan", files: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png"] },
  { name: "Dharmanagar", files: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.png", "7.png", "8.png"] },
  { name: "Shiv Palli, Badharghat", files: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png"] },
  { name: "Arundhuti Nagar", files: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png"] },
  { name: "Dhaleshwar", files: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"] },
  { name: "Udaipur Brahmabari", files: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"] },
];

const slugify = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const imageUrl = (folder, file) =>
  `${process.env.PUBLIC_URL}/projects/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;

export const PROJECT_GALLERY = FOLDERS.map(({ name, files }) => {
  const images = files.map((file) => imageUrl(name, file));
  return { id: slugify(name), title: name, cover: images[0], images };
});

export const getProjectById = (id) => PROJECT_GALLERY.find((p) => p.id === id);
