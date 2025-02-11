import { TaskCalendar } from "./TaskCalendar";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { LoadingSpinner } from "./LoadingSpinner";
import { Child } from "@/types";

export default function History() {
  const { childId } = useParams();
  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChild = async () => {
      if (!childId) return;

      try {
        const { data, error } = await supabase
          .from("children")
          .select("*")
          .eq("id", childId)
          .single();

        if (error) throw error;
        setChild(data);
      } catch (error) {
        console.error("Error fetching child:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChild();
  }, [childId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (!child) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-500">Child not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-primary">
              {child.name}'s History
            </h1>
          </div>
        </div>

        <TaskCalendar completedDates={child.completed_dates || []} />
      </div>
    </div>
  );
}
