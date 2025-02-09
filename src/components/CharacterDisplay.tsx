import React from "react";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { Star, Trophy } from "lucide-react";

import { Character } from "@/types";

interface CharacterDisplayProps {
  characters?: Character[];
  activeCharacterId?: string;
  onSelectCharacter?: (id: string) => void;
}

const CharacterDisplay = ({
  characters = [],

  activeCharacterId = "1",
  onSelectCharacter = () => {},
}: CharacterDisplayProps) => {
  return (
    <Card className="w-full h-[400px] p-6 bg-white overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Characters
          </h2>
          <div className="flex items-center gap-1"></div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide px-1 pt-1">
          {characters.map((character) => (
            <motion.div
              key={character.id}
              whileHover={{ y: 0 }}
              whileTap={{ scale: 0.98 }}
              className={`relative cursor-pointer ${!character.is_unlocked ? "opacity-50" : ""}`}
              onClick={() =>
                character.is_unlocked && onSelectCharacter(character.id)
              }
            >
              <Card
                className={`p-3 transition-all hover:shadow-lg ${character.id === activeCharacterId ? "border-2 border-primary" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{character.name}</h3>
                    {!character.is_unlocked && (
                      <p className="text-sm text-gray-500">
                        Unlocks at {character.streak_requirement} day streak
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CharacterDisplay;
