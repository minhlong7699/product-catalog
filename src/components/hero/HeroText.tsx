"use client";

import { Button } from "@/components/ui/button";
import React from "react";

interface HeroProps {
  title: string;
  description: string;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  bgColor?: string;
  align?: "left" | "center" | "right";
  titleColor?: string;
  descriptionColor?: string;
}

export const HeroText: React.FC<HeroProps> = ({
  title,
  description,
  showButton = true,
  buttonText = "Shop All",
  onButtonClick,
  bgColor = "transparent",
  align = "center",
  titleColor = "black",
  descriptionColor = "#979797",
}) => {
  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <section
      className={`flex flex-col max-md:mt-10 px-8 py-10 ${alignmentClasses[align]}`}
      style={{ backgroundColor: bgColor }}
    >
      <h1
        className="text-[56px] font-semibold leading-none tracking-[-2.4px] max-md:text-[40px]"
        style={{ color: titleColor }}
      >
        {title}
      </h1>
      <p
        className="text-xl font-normal leading-7 tracking-[-0.4px] mt-[19px] max-w-[600px]"
        style={{ color: descriptionColor }}
      >
        {description}
      </p>

      {showButton && (
        <Button
          variant="ghost"
          onClick={onButtonClick}
          className="bg-white border-black border-1 mt-[60px] w-[195px] text-base text-[#0D0D0D] font-semibold tracking-[-0.4px] transition-colors"
          
        >
          {buttonText}
        </Button>
      )}
    </section>
  );
};
