import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function PropertyGallery({ images, propertyName }) {
  const [activeImage, setActiveImage] = useState(0);

  function showPrevious() {
    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  }

  function showNext() {
    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  }

  return (
    <div className="w-full">
      {/* Main image */}
      <div className="group relative h-[300px] overflow-hidden bg-gray-100 md:h-[500px]">
        <img
          key={activeImage}
          src={images[activeImage].src}
          alt={`${propertyName} - ${images[activeImage].label}`}
          className="h-full w-full object-cover transition-opacity duration-300"
        />

        <div className="absolute bottom-5 left-5 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
          {images[activeImage].label}
        </div>

        {/* Previous button */}
        <button
          onClick={showPrevious}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#174C3C] shadow-md transition hover:bg-white"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next button */}
        <button
          onClick={showNext}
          aria-label="Next image"
          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#174C3C] shadow-md transition hover:bg-white"
        >
          <ChevronRight size={24} />
        </button>

        {/* Image counter */}
        <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-4 py-2 text-xs font-semibold text-white">
          {activeImage + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnail images */}
      <div className="flex gap-3 overflow-x-auto bg-white p-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            aria-label={`View image ${index + 1}`}
            className={`h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
              activeImage === index
                ? "border-[#174C3C]"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={image.src}
              alt={`${propertyName} - ${image.label}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default PropertyGallery;
