import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

interface TaskCalendarProps {
  completedDates?: string[];
}

export function TaskCalendar({ completedDates = [] }: TaskCalendarProps) {
  const modifiers = {
    completed: (date: Date) => {
      const dateStr = formatInTimeZone(date, "Australia/Sydney", "yyyy-MM-dd");
      return completedDates.includes(dateStr);
    },
  };

  const modifiersStyles = {
    completed: {
      backgroundColor: "hsl(var(--success))",
      color: "white",
      borderRadius: "100%",
    },
  };

  return (
    <Card className="p-6 bg-white">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">History</h2>
      </div>
      <Calendar
        mode="multiple"
        selected={completedDates.map((date) => new Date(date))}
        className="rounded-md"
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        disabled={(date) => date > new Date()}
      />
    </Card>
  );
}
