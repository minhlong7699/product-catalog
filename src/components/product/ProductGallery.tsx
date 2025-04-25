"use client";

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-[600px] w-full p-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="aspect-square bg-[#C4C4C4] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
          role="img"
          aria-label={`Product image ${index + 1}`}
        />
      ))}
    </div>
  );
};
