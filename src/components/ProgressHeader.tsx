import React from "react";
import AdventureProgress from "./AdventureProgress";
import { Button } from "./ui/button";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

interface ProgressHeaderProps {
  progress: number;
  streak: number;
  todayTasks: number;
  completedTasks: number;
  avatar?: string;
  completedDates?: string[];
}

const ProgressHeader = ({
  progress = 0,
  streak = 0,
  todayTasks = 0,
  completedTasks = 0,
  avatar,
  completedDates = [],
}: ProgressHeaderProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Today's Tasks</h3>
          <p className="text-2xl font-bold">
            {completedTasks} out of {todayTasks}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Streak</h3>
          <p className="text-2xl font-bold text-orange-500">{streak} days</p>
        </div>
      </div>
      <AdventureProgress progress={progress} />
    </div>
  );
};

export default ProgressHeader;
