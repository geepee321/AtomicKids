import React from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { motion } from "framer-motion";
import { CheckCircle2, Check } from "lucide-react";

interface TaskCardProps {
  icon?: React.ReactNode;
  title?: string;
  isCompleted?: boolean;
  onComplete?: (completed: boolean) => void;
}

const TaskCard = ({
  icon = <CheckCircle2 className="h-8 w-8 text-primary" />,
  title = "Sample Task",
  isCompleted = false,
  onComplete = () => {},
}: TaskCardProps) => {
  return (
    <Card
      className={`w-full h-[180px] p-6 cursor-pointer hover:shadow-lg transition-all ${isCompleted ? "bg-green-500" : "bg-white"}`}
      onClick={() => onComplete(!isCompleted)}
    >
      <motion.div
        className="flex flex-col items-center space-y-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          {React.cloneElement(icon as React.ReactElement, {
            className: `h-8 w-8 ${isCompleted ? "text-white" : "text-primary"}`,
          })}
        </div>

        <h3
          className={`text-lg font-semibold text-center line-clamp-2 ${isCompleted ? "text-white" : ""}`}
        >
          {title}
        </h3>

        <div
          className={`h-6 w-6 rounded-sm ${isCompleted ? "bg-white" : "border-2 border-primary"}`}
        >
          {isCompleted && <Check className="h-full w-full text-black p-0.5" />}
        </div>
      </motion.div>
    </Card>
  );
};

export default TaskCard;
