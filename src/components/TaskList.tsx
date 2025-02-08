import React from "react";
import TaskCard from "./TaskCard";
import { motion } from "framer-motion";
import { Bed, Coffee, Book, Brush, Dog, Dumbbell } from "lucide-react";

interface Task {
  id: string;
  title: string;
  icon: React.ReactNode;
  isCompleted: boolean;
}

interface TaskListProps {
  tasks?: Task[];
  onTaskComplete?: (taskId: string, completed: boolean) => void;
}

const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Make Bed",
    icon: <Bed className="h-8 w-8" />,
    isCompleted: false,
  },
  {
    id: "2",
    title: "Breakfast",
    icon: <Coffee className="h-8 w-8" />,
    isCompleted: false,
  },
  {
    id: "3",
    title: "Homework",
    icon: <Book className="h-8 w-8" />,
    isCompleted: false,
  },
  {
    id: "4",
    title: "Brush Teeth",
    icon: <Brush className="h-8 w-8" />,
    isCompleted: false,
  },
  {
    id: "5",
    title: "Walk Dog",
    icon: <Dog className="h-8 w-8" />,
    isCompleted: false,
  },
  {
    id: "6",
    title: "Exercise",
    icon: <Dumbbell className="h-8 w-8" />,
    isCompleted: false,
  },
];

const TaskList = ({
  tasks = defaultTasks,
  onTaskComplete = () => {},
}: TaskListProps) => {
  return (
    <motion.div
      className="w-full min-h-[600px] bg-slate-50 p-8 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TaskCard
              title={task.title}
              icon={task.icon}
              isCompleted={task.isCompleted}
              onComplete={(completed) => onTaskComplete(task.id, completed)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TaskList;
