import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CelebrationOverlayProps {
  show: boolean;
  onComplete?: () => void;
  message?: string;
}

export function CelebrationOverlay({
  show,
  onComplete,
  message,
}: CelebrationOverlayProps) {
  const [gifUrl, setGifUrl] = useState<string>();

  useEffect(() => {
    console.log("CelebrationOverlay show state:", show);
    if (show) {
      fetch(
        "https://api.giphy.com/v1/gifs/random?api_key=fgUc6JXoNLhz9vJnqkLq1h8r7NGY73JL&tag=congrats&rating=g",
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Got celebration GIF");
          setGifUrl(data.data.images.original.url);
        });

      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        onComplete?.();
      }, 10000);

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
          <div className="text-center space-y-4">
            <motion.img
              src={gifUrl}
              alt="Celebration"
              className="max-w-[300px] max-h-[300px] rounded-lg"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            />
            {message && (
              <motion.p
                className="text-white text-xl font-semibold px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {message}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
