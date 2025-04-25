"use client"
import { useRouter } from "next/navigation";
import { HeroText } from "@/components/hero/HeroText";


export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/collection");
  };

  return (
    <HeroText
      title="Our latest arrivals"
      description="Create screens directly in Method or add your images from Sketch or Figma. You can even sync designs from your cloud storage!"
      showButton={true}
      buttonText="Shop Now"
      bgColor="white"
      align="center"
      titleColor="black"
      onButtonClick={handleButtonClick}
    />
  );
}
