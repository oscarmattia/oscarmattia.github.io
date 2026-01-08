import { useState } from "react";
import { X } from "lucide-react";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    alt: "Mountain landscape at sunset",
    location: "Swiss Alps",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    alt: "Starry night over mountains",
    location: "Iceland",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    alt: "Misty forest",
    location: "Pacific Northwest",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
    alt: "Autumn forest path",
    location: "Vermont",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80",
    alt: "Waterfall in tropical forest",
    location: "Costa Rica",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    alt: "Lake reflection at dawn",
    location: "New Zealand",
  },
];

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

  return (
    <section id="gallery" className="section-padding">
      <div className="container-narrow">
        <h2 className="text-2xl font-semibold mb-2">Gallery</h2>
        <p className="text-text-secondary mb-12">Photography from my travels and adventures.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative aspect-square overflow-hidden rounded-lg bg-secondary"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs text-background font-medium">{photo.location}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-2 text-background hover:text-background/80 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-background text-sm font-medium">{selectedPhoto.location}</p>
            <p className="text-background/70 text-xs mt-1">{selectedPhoto.alt}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
