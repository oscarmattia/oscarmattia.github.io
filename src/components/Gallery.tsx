import { useState, useEffect } from "react";
import { X, Loader2, ExternalLink, Instagram } from "lucide-react";

interface Photo {
  id: string;
  src: string;
  alt: string;
  location?: string;
  permalink?: string;
}

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchInstagramPhotos = async () => {
      try {
        setLoading(true);
        // Using Instagram Basic Display API endpoint
        // Note: This requires an access token. For production, set up Instagram Basic Display API
        // and use environment variables for the access token
        const accessToken = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
        
        if (!accessToken) {
          // If no token, try to use a public approach (may not work due to CORS/authentication)
          // For now, we'll show a message to set up the API
          setError("Instagram access token not configured. See setup instructions in code comments.");
          setLoading(false);
          return;
        }

        // Fetch media from Instagram Basic Display API
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}&limit=12`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Instagram photos");
        }

        const data = await response.json();
        
        // Filter for images only (exclude videos)
        const imagePosts = data.data
          ?.filter((item: any) => item.media_type === "IMAGE")
          .slice(0, 12)
          .map((item: any) => ({
            id: item.id,
            src: item.media_url,
            alt: item.caption?.substring(0, 100) || "Instagram photo",
            location: item.caption?.substring(0, 50) || undefined,
            permalink: item.permalink,
          })) || [];

        setPhotos(imagePosts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching Instagram photos:", err);
        // On error, you could fall back to a static list of images
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPhotos();
  }, []);

  return (
    <section id="gallery" className="section-padding">
      <div className="container-narrow">
        <h2 className="text-2xl font-semibold mb-2">Gallery</h2>
        <p className="text-text-secondary mb-12">Photography from my travels and adventures.</p>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-accent animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-text-secondary mb-4">{error}</p>
            <a
              href="https://www.instagram.com/oscarmattia/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
            >
              View on Instagram
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        ) : photos.length > 0 ? (
          <>
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
                  {photo.location && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-xs text-background font-medium">{photo.location}</p>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href="https://www.instagram.com/oscarmattia/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
              >
                View more on Instagram
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-secondary mb-4">No photos found</p>
            <a
              href="https://www.instagram.com/oscarmattia/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
            >
              View on Instagram
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        )}
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
            {selectedPhoto.location && (
              <p className="text-background text-sm font-medium">{selectedPhoto.location}</p>
            )}
            <p className="text-background/70 text-xs mt-1">{selectedPhoto.alt}</p>
            {selectedPhoto.permalink && (
              <a
                href={selectedPhoto.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-background/90 hover:text-background text-xs mt-2 underline underline-offset-2"
                onClick={(e) => e.stopPropagation()}
              >
                View on Instagram
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
