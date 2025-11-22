
export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface HistoryEntry {
  id: string;
  action: string;
  timestamp: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | null;
  priority: 'low' | 'medium' | 'high';
  subtasks: Subtask[];
  tags: string[]; // Text tags
  accentColor: string; // Visual color strip
  assignees: string[]; // Initials of people
  timeSpent: number; // In seconds
  history: HistoryEntry[];
  columnId: string;
  createdAt: number;
}

export interface Column {
  id: string;
  title: string;
  color: string; 
}

export interface BoardData {
  columns: Column[];
  tasks: Task[];
}

export type DragItem = {
  id: string;
  sourceColumnId: string;
};

export type Theme = 'void' | 'paper';

export interface ThemeColors {
  bg: string;
  cardBg: string;
  text: string;
  textDim: string;
  border: string;
  accent: string;
}
