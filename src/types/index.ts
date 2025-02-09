import { Database } from "./supabase";

export interface Child {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  progress: number;
  tasks?: Task[];
  characters: Character[];
  active_character_id: string | null;
  created_at?: string;
  last_streak_date?: string;
  completed_dates?: string[];
}

export interface Character {
  id: string;
  child_id: string;
  name: string;
  image: string;
  is_unlocked: boolean;
  streak_requirement: number;
  created_at?: string;
}

export interface Task {
  id: string;
  child_id: string;
  title: string;
  icon_name: string;
  icon?: React.ReactNode;
  is_completed: boolean;
  created_at?: string;
}

export type DbChild = Database["public"]["Tables"]["children"]["Row"];
export type DbTask = Database["public"]["Tables"]["tasks"]["Row"];
export type DbCharacter = Database["public"]["Tables"]["characters"]["Row"];
