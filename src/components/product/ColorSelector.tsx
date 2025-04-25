
"use client";
import React from "react";

interface ColorOption {
  color: string;
  value: string;
}

interface ColorSelectorProps {
  colors: ColorOption[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onColorChange,
}) => {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-normal text-lg text-black opacity-50">Color</span>
      <div className="flex gap-4">
        {colors.map((color) => (
          <button
            key={color.value}
            className={`w-[50px] h-[50px] border rounded-[50%] border-solid border-[#0D0D0D] transition-all duration-300 hover:scale-110 ${
              selectedColor === color.value
                ? "ring-2 ring-offset-2 ring-[#0D0D0D] scale-105"
                : ""
            }`}
            style={{ backgroundColor: color.color }}
            onClick={() => onColorChange(color.value)}
            aria-label={`Select ${color.value} color`}
          />
        ))}
      </div>
    </div>
  );
};
