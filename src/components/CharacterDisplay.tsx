import React from "react";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { Star, Trophy } from "lucide-react";

interface Character {
  id: string;
  name: string;
  image: string;
  isUnlocked: boolean;
}

interface CharacterDisplayProps {
  characters?: Character[];
  activeCharacterId?: string;
  onSelectCharacter?: (id: string) => void;
}

const CharacterDisplay = ({
  characters = [
    {
      id: "1",
      name: "Happy Star",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=star",
      isUnlocked: true,
    },
    {
      id: "2",
      name: "Super Hero",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=hero",
      isUnlocked: true,
    },
    {
      id: "3",
      name: "Mystery Friend",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=mystery",
      isUnlocked: false,
    },
  ],
  activeCharacterId = "1",
  onSelectCharacter = () => {},
}: CharacterDisplayProps) => {
  return (
    <Card className="w-[300px] h-[400px] p-6 bg-white overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Characters
          </h2>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">
              {characters.filter((c) => c.isUnlocked).length}/
              {characters.length}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {characters.map((character) => (
            <motion.div
              key={character.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative cursor-pointer ${!character.isUnlocked ? "opacity-50" : ""}`}
              onClick={() =>
                character.isUnlocked && onSelectCharacter(character.id)
              }
            >
              <Card
                className={`p-3 ${character.id === activeCharacterId ? "border-2 border-primary" : ""}`}
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
                    <p className="text-sm text-gray-500">
                      {character.isUnlocked ? "Unlocked" : "Locked"}
                    </p>
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
