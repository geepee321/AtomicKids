import { TaskCalendar } from "./TaskCalendar";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function History() {
  const location = useLocation();
  const completedDates = location.state?.completedDates || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-primary">Task History</h1>
        </div>

        <TaskCalendar completedDates={completedDates} />
      </div>
    </div>
  );
}
