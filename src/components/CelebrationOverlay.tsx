import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CelebrationOverlayProps {
  show: boolean;
  onComplete?: () => void;
}

export function CelebrationOverlay({
  show,
  onComplete,
}: CelebrationOverlayProps) {
  const [gifUrl, setGifUrl] = useState<string>();

  useEffect(() => {
    if (show) {
      fetch(
        "https://api.giphy.com/v1/gifs/random?api_key=fgUc6JXoNLhz9vJnqkLq1h8r7NGY73JL&tag=congrats&rating=g",
      )
        .then((response) => response.json())
        .then((data) => setGifUrl(data.data.images.original.url));

      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && gifUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
          onClick={onComplete}
        >
          <motion.img
            src={gifUrl}
            alt="Celebration"
            className="max-w-[300px] max-h-[300px] rounded-lg"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
