import React from "react";
import { Progress } from "./ui/progress";
import { motion } from "framer-motion";
import { Flame, Trophy } from "lucide-react";

interface ProgressHeaderProps {
  progress?: number;
  streak?: number;
  todayTasks?: number;
  completedTasks?: number;
}

const ProgressHeader = ({
  progress = 45,
  streak = 3,
  todayTasks = 8,
  completedTasks = 4,
}: ProgressHeaderProps) => {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy className="h-8 w-8 text-yellow-500" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">Today's Progress</h2>
              <p className="text-gray-600">
                {completedTasks} of {todayTasks} tasks completed
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-full">
            <Flame className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-orange-600">
              {streak} Day Streak!
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Daily Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3 bg-gray-100" />
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;
