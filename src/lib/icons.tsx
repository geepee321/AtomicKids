import {
  BedDouble,
  Book,
  Brush,
  Coffee,
  Dog,
  Dumbbell,
  Shirt,
  Laugh,
  Soup,
  NotebookPen,
} from "lucide-react";

export const iconMap = {
  "bed-double": <BedDouble className="h-8 w-8" />,
  book: <Book className="h-8 w-8" />,
  brush: <Brush className="h-8 w-8" />,
  coffee: <Coffee className="h-8 w-8" />,
  dog: <Dog className="h-8 w-8" />,
  dumbbell: <Dumbbell className="h-8 w-8" />,
  shirt: <Shirt className="h-8 w-8" />,
  laugh: <Laugh className="h-8 w-8" />,
  soup: <Soup className="h-8 w-8" />,
  "notebook-pen": <NotebookPen className="h-8 w-8" />,
};

export type IconName = keyof typeof iconMap;
