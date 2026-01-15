import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Car360ViewerProps {
  images: string[];
  alt: string;
}

export function Car360Viewer({ images, alt }: Car360ViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStart = (x: number) => {
    setIsDragging(true);
    startX.current = x;
  };

  const handleMove = (x: number) => {
    if (!isDragging) return;
    
    const delta = x - startX.current;
    const sensitivity = 10; // Pixels per frame change
    
    if (Math.abs(delta) > sensitivity) {
      const framesToMove = Math.floor(delta / sensitivity);
      let newFrame = (currentFrame - framesToMove) % images.length;
      
      if (newFrame < 0) newFrame += images.length;
      
      setCurrentFrame(newFrame);
      startX.current = x;
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onMouseUp = () => handleEnd();
  const onMouseLeave = () => handleEnd();

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
  const onTouchEnd = () => handleEnd();

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden select-none touch-none",
        "flex items-center justify-center"
      )}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentFrame}
          src={images[currentFrame]}
          alt={`${alt} - View ${currentFrame + 1}`}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.8 }}
          transition={{ duration: 0.1 }} // Very fast transition for 360 feel
          className="w-full h-full object-contain max-h-[70vh] pointer-events-none"
          draggable={false}
        />
      </AnimatePresence>

      {/* Hint Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none opacity-50">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white">
          <span>Drag to Rotate</span>
        </div>
      </div>
    </div>
  );
}
