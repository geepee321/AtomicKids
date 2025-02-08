import React from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

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
    <Card className="w-60 h-45 p-6 bg-white cursor-pointer hover:shadow-lg transition-shadow">
      <motion.div
        className="flex flex-col items-center space-y-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          {icon}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isCompleted ? 1 : 0 }}
            className="absolute -top-1 -right-1"
          >
            <div className="h-4 w-4 bg-green-500 rounded-full" />
          </motion.div>
        </div>

        <h3 className="text-lg font-semibold text-center">{title}</h3>

        <Checkbox
          checked={isCompleted}
          onCheckedChange={(checked) => {
            onComplete(checked as boolean);
            if (checked) {
              // Placeholder for confetti animation
              console.log("Confetti animation would play here");
            }
          }}
          className="h-6 w-6"
        />
      </motion.div>
    </Card>
  );
};

export default TaskCard;
