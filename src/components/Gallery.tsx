import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const MAX_GALLERY_IMAGES = 8;

const GRID_LAYOUTS = [
  { cols: 4, rows: 2 },
  { cols: 2, rows: 4 },
  { cols: 3, rows: 2 },
  { cols: 2, rows: 3 },
  { cols: 2, rows: 2 },
  { cols: 4, rows: 1 },
  { cols: 1, rows: 4 },
  { cols: 3, rows: 1 },
  { cols: 1, rows: 3 },
  { cols: 2, rows: 1 },
  { cols: 1, rows: 2 },
  { cols: 1, rows: 1 },
] as const;

function getGalleryGrid(imageCount: number) {
  const cap = Math.min(MAX_GALLERY_IMAGES, imageCount);

  for (const { cols, rows } of GRID_LAYOUTS) {
    const count = cols * rows;
    if (count <= cap) {
      return { count, cols, rows };
    }
  }

  return { count: 1, cols: 1, rows: 1 };
}

function getGridClassName(cols: number) {
  switch (cols) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2";
    case 3:
      return "grid-cols-2 sm:grid-cols-3";
    case 4:
      return "grid-cols-2 md:grid-cols-4";
    default:
      return "grid-cols-2";
  }
}

const allImages = [
  "mountain-fog.jpg",
  "redwoods-np.jpg",
  "seattle-dusk.jpg",
  "trinidad-ca-2.jpg",
  "trinidad-ca.jpg",
  "yellowstone-canyon.jpg",
  "yellowstone-streaks.jpg",
  "yellowstone-streaks2.jpg",
  "yellowstone-swamp.jpg",
];

const Gallery = () => {
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [gridCols, setGridCols] = useState(2);

  useEffect(() => {
    const { count, cols } = getGalleryGrid(allImages.length);
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);

    setDisplayedImages(shuffled.slice(0, count));
    setGridCols(cols);
  }, []);

  if (displayedImages.length === 0) {
    return (
      <section id="gallery" className="section-padding">
        <div className="container-narrow">
          <h2 className="text-2xl font-semibold mb-2">Gallery</h2>
          <p className="text-text-secondary mb-12">
            Film photography from my travels. I use a vintage Pentax-ME camera and mostly Pentax-M series lenses. Films vary.
          </p>
          <div className="text-center py-12">
            <p className="text-text-secondary">
              No images found. Add images to the <code className="text-accent">public/pictures/</code> folder.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="section-padding">
      <div className="container-narrow">
        <h2 className="text-2xl font-semibold mb-2">Gallery</h2>
        <p className="text-text-secondary mb-12">
          Film photography from my vintage Pentax-ME camera and Pentax-M series lenses.
        </p>

        <div className={cn("grid gap-3 md:gap-4", getGridClassName(gridCols))}>
          {displayedImages.map((filename) => (
            <div
              key={filename}
              className="relative aspect-square overflow-hidden rounded-lg bg-secondary"
            >
              <img
                src={`/pictures/${filename}`}
                alt={filename.replace(/[-_]/g, " ").replace(/\.\w+$/, "")}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
