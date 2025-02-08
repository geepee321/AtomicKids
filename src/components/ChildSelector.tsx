import { Child } from "@/types";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

interface ChildSelectorProps {
  children?: Child[];
  activeChildId?: string;
  onSelectChild?: (id: string) => void;
}

const ChildSelector = ({
  children = [
    {
      id: "1",
      name: "Emma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      streak: 3,
      progress: 60,
      characters: [],
      activeCharacterId: "1",
    },
    {
      id: "2",
      name: "Oliver",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver",
      streak: 5,
      progress: 40,
      characters: [],
      activeCharacterId: "1",
    },
  ],
  activeChildId = "1",
  onSelectChild = () => {},
}: ChildSelectorProps) => {
  return (
    <Card className="p-4 bg-white mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <span className="font-medium">Select Child:</span>
        </div>
        <div className="flex gap-3">
          {children.map((child) => (
            <motion.div
              key={child.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectChild(child.id)}
            >
              <Card
                className={`p-2 cursor-pointer ${child.id === activeChildId ? "border-2 border-primary" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={child.avatar}
                    alt={child.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium">{child.name}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ChildSelector;
