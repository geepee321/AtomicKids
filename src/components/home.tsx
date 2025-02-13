import React, { useState, useEffect } from "react";
import { format, isToday, parseISO } from "date-fns";
import { getTimezoneOffset } from "date-fns-tz";
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
import { CelebrationOverlay } from "./CelebrationOverlay";
import { Child, Task, Character } from "@/types";
import { supabase } from "@/lib/supabase";
import { iconMap } from "@/lib/icons";

const Home = () => {
  const [isParentMode, setIsParentMode] = useState(false);
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChildId, setActiveChildId] = useState<string>();

  const activeChild = children.find((child) => child.id === activeChildId);

  const checkAndResetTasks = async () => {
    if (!activeChildId) return;

    try {
      // Get the current time in Sydney
      const now = new Date();
      const sydneyOffset = getTimezoneOffset("Australia/Sydney");
      const sydneyTime = new Date(now.getTime() + sydneyOffset);
      const todayInSydney = format(sydneyTime, "yyyy-MM-dd");

      // Get the last task update time
      const { data: tasks } = await supabase
        .from("tasks")
        .select("updated_at")
        .eq("child_id", activeChildId)
        .eq("is_completed", true)
        .order("updated_at", { ascending: false })
        .limit(1);

      // If there are completed tasks and they were completed on a different day
      if (
        tasks?.[0] &&
        format(parseISO(tasks[0].updated_at), "yyyy-MM-dd") !== todayInSydney
      ) {
        // Reset all tasks for this child
        const { error } = await supabase
          .from("tasks")
          .update({ is_completed: false })
          .eq("child_id", activeChildId);

        if (error) throw error;
      }
    } catch (error) {
      console.error("Error checking/resetting tasks:", error);
    }
  };

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

  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [minutesUntilDeparture, setMinutesUntilDeparture] = useState<number>();

  const checkTaskCompletion = async () => {
    console.log("Checking task completion...");
    if (!activeChildId) return;

    try {
      // Get fresh task data to check completion status
      const { data: freshTasks, error: tasksError } = await supabase
        .from("tasks")
        .select("is_completed")
        .eq("child_id", activeChildId);
      if (tasksError) throw tasksError;

      console.log("Fresh tasks:", freshTasks);
      const allTasksCompleted =
        freshTasks?.length > 0 && freshTasks.every((task) => task.is_completed);
      console.log("All tasks completed?", allTasksCompleted);

      if (allTasksCompleted) {
        // Get current time in Sydney
        const now = new Date();
        const sydneyOffset = getTimezoneOffset("Australia/Sydney");
        const sydneyTime = new Date(now.getTime() + sydneyOffset);
        const dayOfWeek = format(sydneyTime, "EEEE");

        // Get schedule for today
        const { data: schedule, error: scheduleError } = await supabase
          .from("weeklyschedule")
          .select("*")
          .eq("child_id", activeChildId)
          .eq("day_of_week", dayOfWeek)
          .single();
        if (scheduleError) throw scheduleError;

        console.log("Schedule for today:", schedule);
        if (schedule) {
          const departureTime = new Date(
            `${format(sydneyTime, "yyyy-MM-dd")}T${schedule.time_leave_house}`,
          );
          const minutesLeft = Math.floor(
            (departureTime.getTime() - sydneyTime.getTime()) / 60000,
          );

          console.log("Minutes until departure:", minutesLeft);
          if (minutesLeft > 0) {
            setMinutesUntilDeparture(minutesLeft);
            setShowCompletionDialog(true);
          }
        }
      }
    } catch (error) {
      console.error("Error checking task completion:", error);
    }
  };

  const [showTaskCompletionCelebration, setShowTaskCompletionCelebration] =
    useState(false);

  const handleTaskComplete = async (taskId: string, completed: boolean) => {
    if (!activeChildId) return;

    try {
      // Update task completion status
      const { error: updateError } = await supabase
        .from("tasks")
        .update({ is_completed: completed })
        .eq("id", taskId);

      if (updateError) throw updateError;

      // Show celebration only when completing a task
      if (completed) {
        setShowTaskCompletionCelebration(true);
      }

      // Update local state immediately for better UX
      setChildren((prev) =>
        prev.map((child) => {
          if (child.id === activeChildId) {
            return {
              ...child,
              tasks: child.tasks?.map((task) =>
                task.id === taskId
                  ? { ...task, is_completed: completed }
                  : task,
              ),
            };
          }
          return child;
        }),
      );

      // Fetch fresh data in the background
      fetchInitialData().then(() => {
        // Check if all tasks are completed
        const activeChild = children.find((c) => c.id === activeChildId);
        const allCompleted = activeChild?.tasks?.every((t) => t.is_completed);
        if (allCompleted) {
          setShowCompletionDialog(true);
        }
      });
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
    const loadData = async () => {
      await checkAndResetTasks();
      await fetchInitialData();
    };
    loadData();
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
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">
            Atomic Kids ⚛️🚸
          </h1>
        </div>

        <ChildSelector
          children={children}
          activeChildId={activeChildId}
          onSelectChild={setActiveChildId}
        />

        <div className="grid grid-cols-1 gap-6 mt-6">
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

          <div>
            <CharacterDisplay
              characters={activeChild?.characters || []}
              activeCharacterId={activeChild?.active_character_id || undefined}
              onSelectCharacter={handleCharacterSelect}
            />
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="mt-4 flex gap-4">
          <ParentModeToggle
            isParentMode={isParentMode}
            onToggle={setIsParentMode}
          />
          {activeChild?.completed_dates && (
            <Link to={`/history/${activeChild.id}`}>
              <Button variant="outline" size="sm">
                <CalendarDays className="h-4 w-4 mr-2" />
                View History
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Task Completion Celebration */}
      <CelebrationOverlay
        show={showTaskCompletionCelebration}
        onComplete={() => setShowTaskCompletionCelebration(false)}
      />

      {/* All Tasks Completion Dialog */}
      <CelebrationOverlay
        show={showCompletionDialog}
        onComplete={() => setShowCompletionDialog(false)}
        message={
          minutesUntilDeparture
            ? `You have finished all your morning tasks. You have ${minutesUntilDeparture} mins until you need to leave the house.`
            : undefined
        }
      />
    </motion.div>
  );
};

export default Home;
