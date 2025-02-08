import React, { useState } from "react";
import TaskList from "./TaskList";
import ProgressHeader from "./ProgressHeader";
import CharacterDisplay from "./CharacterDisplay";
import ChildSelector from "./ChildSelector";
import { motion } from "framer-motion";
import { Child } from "@/types";

interface HomeProps {
  initialChildren?: Child[];
}

const defaultChildren: Child[] = [
  {
    id: "1",
    name: "Emma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    streak: 3,
    progress: 60,
    characters: [
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
    ],
    activeCharacterId: "1",
  },
  {
    id: "2",
    name: "Oliver",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver",
    streak: 5,
    progress: 40,
    characters: [
      {
        id: "1",
        name: "Happy Star",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=star",
        isUnlocked: true,
      },
    ],
    activeCharacterId: "1",
  },
];

const Home = ({ initialChildren = defaultChildren }: HomeProps) => {
  const [children, setChildren] = useState(initialChildren);
  const [activeChildId, setActiveChildId] = useState(children[0]?.id);

  const activeChild = children.find((child) => child.id === activeChildId);

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    setChildren((prevChildren) => {
      return prevChildren.map((child) => {
        if (child.id === activeChildId) {
          const updatedTasks =
            child.tasks?.map((task) =>
              task.id === taskId ? { ...task, isCompleted: completed } : task,
            ) || [];

          const completedCount = updatedTasks.filter(
            (t) => t.isCompleted,
          ).length;
          const newProgress = Math.round(
            (completedCount / updatedTasks.length) * 100,
          );

          return {
            ...child,
            tasks: updatedTasks,
            progress: newProgress,
            streak: newProgress === 100 ? child.streak + 1 : child.streak,
          };
        }
        return child;
      });
    });
  };

  const handleCharacterSelect = (characterId: string) => {
    setChildren((prevChildren) => {
      return prevChildren.map((child) => {
        if (child.id === activeChildId) {
          return { ...child, activeCharacterId: characterId };
        }
        return child;
      });
    });
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          Daily Task Adventure
        </h1>

        <ChildSelector
          children={children}
          activeChildId={activeChildId}
          onSelectChild={setActiveChildId}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <ProgressHeader
              progress={activeChild?.progress || 0}
              streak={activeChild?.streak || 0}
              todayTasks={activeChild?.tasks?.length || 0}
              completedTasks={
                activeChild?.tasks?.filter((t) => t.isCompleted).length || 0
              }
            />
            <TaskList
              tasks={activeChild?.tasks || []}
              onTaskComplete={handleTaskComplete}
            />
          </div>

          <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
            <CharacterDisplay
              characters={activeChild?.characters || []}
              activeCharacterId={activeChild?.activeCharacterId}
              onSelectCharacter={handleCharacterSelect}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
