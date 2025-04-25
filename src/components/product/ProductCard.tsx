"use client";
import Link from "next/link";

interface ProductCardProps {
  _id: string;
  title: string;
  price: number;
  size?: string;
  imageUrl: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  _id,
  title,
  price,
  size,
  imageUrl,
}) => {
  return (
    <Link
      href={`/product/${_id}`}
      className="flex min-w-60 flex-col items-stretch w-[265px] pb-[11px]"
    >
      <div
        className="bg-[rgba(196,196,196,1)] flex shrink-0 h-[265px] aspect-[1]"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="flex items-stretch gap-5 justify-between mt-3">
        <h3 className="font-bold text-[17px] tracking-[-0.4px]">{title}</h3>
        {size && <span className="font-normal">{size}</span>}
      </div>
      <div className="font-normal mt-3.5">${price}</div>
    </Link>
  );
};