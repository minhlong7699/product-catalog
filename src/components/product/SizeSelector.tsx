import React from "react";

interface SizeOption {
  label: string;
  value: string;
}

interface SizeSelectorProps {
  sizes: SizeOption[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSizeChange,
}) => {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-normal text-lg text-black opacity-50">Size</span>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <button
            key={size.value}
            className={`w-[45px] h-[45px] border font-semibold text-base text-[#0D0D0D] border-solid border-[#0D0D0D] transition-all duration-300 hover:bg-gray-100 ${
              selectedSize === size.value
                ? "bg-[#0D0D0D] text-white transform scale-105"
                : ""
            }`}
            onClick={() => onSizeChange(size.value)}
            aria-label={`Select size ${size.label}`}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
};
