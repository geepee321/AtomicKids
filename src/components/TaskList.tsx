import React, { useState } from "react";
import { Task } from "@/types";
import TaskCard from "./TaskCard";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Plus, Trash2 } from "lucide-react";
import { TaskDialog } from "./TaskDialog";
import { IconName } from "@/lib/icons";

interface TaskListProps {
  tasks?: Task[];
  onTaskComplete?: (taskId: string, completed: boolean) => void;
  onAddTask?: (data: { title: string; iconName: IconName }) => void;
  onDeleteTask?: (taskId: string) => void;
  isParentMode?: boolean;
}

const TaskList = ({
  tasks = [],
  onTaskComplete = () => {},
  onAddTask = () => {},
  onDeleteTask = () => {},
  isParentMode = false,
}: TaskListProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tasks</h2>
        {isParentMode && (
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="relative group"
            onClick={(e) => e.stopPropagation()}
          >
            <TaskCard
              icon={task.icon}
              title={task.title}
              isCompleted={task.is_completed}
              onComplete={(completed) => onTaskComplete(task.id, completed)}
            />
            {isParentMode && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onDeleteTask(task.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <TaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={onAddTask}
      />
    </div>
  );
};

export default TaskList;
