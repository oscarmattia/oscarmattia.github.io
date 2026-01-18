import { useState, useEffect } from "react";

const Gallery = () => {
  // List of all image filenames in the public/pictures/ folder
  const allImages = [
    "redwoods-np.jpg",
    "trinidad-ca-2.jpg",
    "trinidad-ca.jpg",
    "yellowstone-canyon.jpg",
    "yellowstone-streaks.jpg",
    "yellowstone-streaks2.jpg",
    "yellowstone-swamp.jpg",
  ];

  const [displayedImages, setDisplayedImages] = useState<string[]>([]);

  useEffect(() => {
    // Randomly sample 6 images (or all if there are fewer than 6)
    const sampleSize = Math.min(6, allImages.length);
    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    setDisplayedImages(shuffled.slice(0, sampleSize));
  }, []);

  if (displayedImages.length === 0) {
    return (
      <section id="gallery" className="section-padding">
        <div className="container-narrow">
          <h2 className="text-2xl font-semibold mb-2">Gallery</h2>
          <p className="text-text-secondary mb-12">Film photography from my travels. I use a vintage Pentax-ME camera and mostly Pentax-M series lenses. Films vary.</p>
          <div className="text-center py-12">
            <p className="text-text-secondary">No images found. Add images to the <code className="text-accent">public/pictures/</code> folder.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="section-padding">
      <div className="container-narrow">
        <h2 className="text-2xl font-semibold mb-2">Gallery</h2>
        <p className="text-text-secondary mb-12">Film photography from my vintage Pentax-ME camera and Pentax-M series lenses.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {displayedImages.map((filename, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg bg-secondary"
            >
              <img
                src={`/pictures/${filename}`}
                alt={`Gallery image ${index + 1}`}
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
