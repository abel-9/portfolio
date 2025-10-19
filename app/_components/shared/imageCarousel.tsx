"use client";
import Image from "next/image";
import Button from "./button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useAnimation, motion } from "framer-motion";

interface ImageCarouselProps {
  images: string[];
  autoPlay?: boolean;
}
export default function ImageCarousel({
  images,
  autoPlay = true,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const controller = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoPlay) {
        setCurrentIndex((val) => (val + 1) % images.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [autoPlay, images.length]);

  useEffect(() => {
    controller.start({
      translateX: -currentIndex * 100 + "%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5,
      },
    });
  }, [currentIndex, controller]);

  return (
    <div className="relative w-full">
      <div className="w-full aspect-video flex overflow-hidden">
        {images.map((src, index) => (
          <motion.div
            animate={controller}
            key={index}
            className="w-full aspect-video"
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              width={800}
              height={450}
              className="w-full aspect-video object-cover overflow-clip object-top"
            />
          </motion.div>
        ))}
      </div>
      {!autoPlay && (
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2">
          <Button
            variant="outline"
            size="rounded"
            className="flex items-center justify-center"
            disabled={currentIndex === 0}
            onClick={() => {
              setCurrentIndex(
                (val) => (val - 1 + images.length) % images.length
              );
            }}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="rounded"
            className="flex items-center justify-center"
            disabled={currentIndex === images.length - 1}
            onClick={() => {
              setCurrentIndex((val) => (val + 1) % images.length);
            }}
          >
            <ArrowRight />
          </Button>
        </div>
      )}

      <Indicators currentIndex={currentIndex} total={images.length} />
    </div>
  );
}

function Indicators({
  currentIndex,
  total,
}: {
  currentIndex: number;
  total: number;
}) {
  return (
    <div className="flex justify-center p-1">
      {Array.from({ length: total }).map((_, index) => (
        <motion.span
          initial={{ width: index === currentIndex ? 20 : 5, height: 5 }}
          animate={{
            width: index === currentIndex ? 20 : 5,
            height: 5,
            transition: { duration: 0.5 },
          }}
          key={index}
          className={`rounded-full mx-1 ${
            index === currentIndex
              ? "bg-accent w-10 h-2"
              : "bg-text-muted w-2 h-2"
          }`}
        />
      ))}
    </div>
  );
}
