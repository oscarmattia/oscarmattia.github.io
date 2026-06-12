import { useState, useEffect } from "react";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
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

function pickRandomGalleryImages() {
  const { count, cols } = getGalleryGrid(allImages.length);
  const shuffled = [...allImages].sort(() => Math.random() - 0.5);

  return {
    images: shuffled.slice(0, count),
    cols,
  };
}

const Gallery = () => {
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [gridCols, setGridCols] = useState(2);

  const shuffleGallery = () => {
    const { images, cols } = pickRandomGalleryImages();
    setDisplayedImages(images);
    setGridCols(cols);
  };

  useEffect(() => {
    shuffleGallery();
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

        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={shuffleGallery}
            aria-label="Shuffle gallery photos"
            className="border-border px-6 font-medium hover:bg-secondary hover:text-foreground"
          >
            <Shuffle />
            Shuffle
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
