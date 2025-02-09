import React, { useState, useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import TaskList from "./TaskList";
import { ParentModeToggle } from "./ParentModeToggle";
import ProgressHeader from "./ProgressHeader";
import CharacterDisplay from "./CharacterDisplay";
import ChildSelector from "./ChildSelector";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { Button } from "./ui/button";
import { Child, Task, Character } from "@/types";
import { supabase } from "@/lib/supabase";
import { iconMap } from "@/lib/icons";

const Home = () => {
  const [isParentMode, setIsParentMode] = useState(false);
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChildId, setActiveChildId] = useState<string>();

  const activeChild = children.find((child) => child.id === activeChildId);

  const fetchInitialData = async () => {
    try {
      const { data: childrenData, error: childrenError } = await supabase.from(
        "children",
      ).select(`
          *,
          tasks (*),
          characters (*)
        `);

      if (childrenError) throw childrenError;

      const childrenWithIcons = childrenData?.map((child) => ({
        ...child,
        tasks: child.tasks
          ?.map((task) => ({
            ...task,
            icon: iconMap[task.icon_name],
          }))
          .sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime(),
          ),
      }));

      setChildren(childrenWithIcons || []);
      if (!activeChildId && childrenWithIcons?.[0]) {
        setActiveChildId(childrenWithIcons[0].id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskComplete = async (taskId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .update({ is_completed: completed })
        .eq("id", taskId);
      if (error) throw error;

      // Update progress immediately
      const updatedChildren = children.map((child) => {
        if (child.id === activeChildId) {
          const updatedTasks = child.tasks?.map((task) =>
            task.id === taskId ? { ...task, is_completed: completed } : task,
          );
          const completedCount =
            updatedTasks?.filter((t) => t.is_completed).length || 0;
          const totalTasks = updatedTasks?.length || 0;
          const newProgress =
            totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

          return {
            ...child,
            tasks: updatedTasks,
            progress: newProgress,
          };
        }
        return child;
      });
      setChildren(updatedChildren);

      // Update progress in database
      const activeChild = updatedChildren.find((c) => c.id === activeChildId);
      if (activeChild) {
        await supabase
          .from("children")
          .update({ progress: activeChild.progress })
          .eq("id", activeChildId);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCharacterSelect = async (characterId: string) => {
    if (!activeChildId) return;
    try {
      const { error } = await supabase
        .from("children")
        .update({ active_character_id: characterId })
        .eq("id", activeChildId);
      if (error) throw error;
      await fetchInitialData();
    } catch (error) {
      console.error("Error updating character:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          Atomic Kids
        </h1>
        <div className="flex justify-end mb-4">
          <ParentModeToggle
            isParentMode={isParentMode}
            onToggle={setIsParentMode}
          />
        </div>

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
                activeChild?.tasks?.filter((t) => t.is_completed).length || 0
              }
              avatar={activeChild?.avatar}
              completedDates={activeChild?.completed_dates}
            />
            <TaskList
              tasks={activeChild?.tasks || []}
              isParentMode={isParentMode}
              onTaskComplete={handleTaskComplete}
              onAddTask={async (data) => {
                if (!activeChildId) return;
                try {
                  const { error } = await supabase.from("tasks").insert({
                    child_id: activeChildId,
                    title: data.title,
                    icon_name: data.iconName,
                    is_completed: false,
                  });
                  if (error) throw error;
                  await fetchInitialData();
                } catch (error) {
                  console.error("Error adding task:", error);
                }
              }}
              onDeleteTask={async (taskId) => {
                try {
                  const { error } = await supabase
                    .from("tasks")
                    .delete()
                    .eq("id", taskId);
                  if (error) throw error;
                  await fetchInitialData();
                } catch (error) {
                  console.error("Error deleting task:", error);
                }
              }}
            />
          </div>

          <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
            <CharacterDisplay
              characters={activeChild?.characters || []}
              activeCharacterId={activeChild?.active_character_id || undefined}
              onSelectCharacter={handleCharacterSelect}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
