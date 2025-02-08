export interface Child {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  progress: number;
  characters: Character[];
  activeCharacterId: string;
}

export interface Character {
  id: string;
  name: string;
  image: string;
  isUnlocked: boolean;
}

export interface Task {
  id: string;
  title: string;
  icon: React.ReactNode;
  isCompleted: boolean;
}
