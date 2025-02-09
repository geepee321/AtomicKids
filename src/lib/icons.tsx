import { Bed, Book, Brush, Coffee, Dog, Dumbbell } from "lucide-react";

export const iconMap = {
  bed: <Bed className="h-8 w-8" />,
  book: <Book className="h-8 w-8" />,
  brush: <Brush className="h-8 w-8" />,
  coffee: <Coffee className="h-8 w-8" />,
  dog: <Dog className="h-8 w-8" />,
  dumbbell: <Dumbbell className="h-8 w-8" />,
};

export type IconName = keyof typeof iconMap;
