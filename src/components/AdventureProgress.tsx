import React from "react";
import { motion } from "framer-motion";
import { TreePine } from "lucide-react";

interface AdventureProgressProps {
  progress: number;
}

const AdventureProgress = ({ progress = 0 }: AdventureProgressProps) => {
  // Convert progress (0-100) to path progress (0-1)
  const pathProgress = Math.min(Math.max(progress / 100, 0), 1);

  return (
    <div className="relative h-24 w-full overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 flex justify-between px-8 opacity-60">
        {[...Array(6)].map((_, i) => (
          <TreePine
            key={i}
            className="h-8 w-8 text-green-600 transform -translate-y-2"
            style={{
              transform: `translateY(${Math.sin(i * 2) * 8}px) scale(${0.8 + Math.sin(i * 3) * 0.2})`,
            }}
          />
        ))}
      </div>

      {/* Path */}
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        {/* Background path */}
        <path
          d="M0,50 C250,20 350,80 500,50 C650,20 750,80 1000,50"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Progress path */}
        <motion.path
          d="M0,50 C250,20 350,80 500,50 C650,20 750,80 1000,50"
          fill="none"
          stroke="#22C55E"
          strokeWidth="6"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: pathProgress }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default AdventureProgress;
