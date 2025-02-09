import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { iconMap, IconName } from "@/lib/icons";

interface TaskDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit: (data: { title: string; iconName: IconName }) => void;
  defaultValues?: {
    title?: string;
    iconName?: IconName;
  };
}

export function TaskDialog({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: TaskDialogProps) {
  const [title, setTitle] = useState(defaultValues.title || "");
  const [iconName, setIconName] = useState<IconName>(
    defaultValues.iconName || "book",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, iconName });
    if (onOpenChange) onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Name</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Icon</Label>
            <Select
              value={iconName}
              onValueChange={(value) => setIconName(value as IconName)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(iconMap).map(([name, icon]) => (
                  <SelectItem
                    key={name}
                    value={name}
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center gap-2">
                      {icon}
                      <span className="capitalize">{name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange?.(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
