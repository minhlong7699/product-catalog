"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { SizeSelector } from "./SizeSelector";
import { ColorSelector } from "./ColorSelector";
import { QuantitySelector } from "./QuantitySelector";

const colors = [
    { color: "#DF9167", value: "brown" },
    { color: "#000000", value: "black" },
  ];
  
  const sizes = [
    { label: "XS", value: "xs" },
    { label: "S", value: "s" },
    { label: "M", value: "m" },
    { label: "L", value: "l" },
    { label: "XL", value: "xl" },
    { label: "XXL", value: "xxl" },
    { label: "3XL", value: "3xl" },
  ];

interface ProductState {
  color: string;
  size: string;
  quantity: number;
}

interface ProductInfoProps {
  product: {
    title: string;
    price: number;
    description: string;
    images: string[];
  };
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [productState, setProductState] = useState<ProductState>({
    color: colors[0].value,
    size: "",
    quantity: 2,
  });

  const handleColorChange = (color: string) => {
    setProductState((prev) => ({ ...prev, color }));
    toast.success(`Selected color: ${color}`);
  };

  const handleSizeChange = (size: string) => {
    setProductState((prev) => ({ ...prev, size }));
    toast.success(`Selected size: ${size.toUpperCase()}`);
  };

  const handleQuantityChange = (quantity: number) => {
    setProductState((prev) => ({ ...prev, quantity }));
  };

  const handleAddToCart = () => {
    if (!productState.size) {
      toast.error("Please select a size!");
      return;
    }
    console.log("Adding to cart:", productState);
    toast.success("Added to cart successfully!");
  };

  return (
    <div className="flex-1 max-md:w-full">
      <h1 className="font-bold text-4xl text-black leading-[44px] mb-2.5 max-md:text-[28px] max-sm:text-2xl">
        {product.title}
      </h1>
      <div className="font-normal text-lg text-black leading-[26px] mb-5 max-md:text-base max-sm:text-sm">
        ${product.price}
      </div>
      <p className="font-normal text-lg text-black leading-[26px] mb-5 max-md:text-base max-sm:text-sm">
        {product.description}
      </p>

      <div className="space-y-6 mb-8">
        <ColorSelector
          colors={colors}
          selectedColor={productState.color}
          onColorChange={handleColorChange}
        />
        <SizeSelector
          sizes={sizes}
          selectedSize={productState.size}
          onSizeChange={handleSizeChange}
        />
      </div>

      <div className="flex items-center gap-4 mb-5 max-md:flex-col max-md:items-stretch">
        <div className="w-[150px] max-md:w-full">
          <QuantitySelector
            quantity={productState.quantity}
            onQuantityChange={handleQuantityChange}
          />
        </div>
        <button
          className="flex-1 h-[50px] bg-[#0D0D0D] text-white font-semibold text-base cursor-pointer border-[none] hover:bg-[#2d2d2d] transition-colors max-md:w-full"
          onClick={handleAddToCart}
        >
          Add to Cart - ${productState.quantity * product.price}
        </button>
      </div>

      <div className="flex gap-5 font-normal text-sm text-black opacity-50 max-md:flex-col max-md:items-center max-sm:text-xs">
        <span>Free standard shipping</span>
        <button className="underline hover:text-gray-600 transition-colors">
          Free Returns
        </button>
      </div>
    </div>
  );
};
