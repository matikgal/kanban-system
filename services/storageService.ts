
import { BoardData, Task, Column, Theme } from '../types';

const STORAGE_KEY = 'fluxboard_v4_data';
const THEME_KEY = 'fluxboard_theme_v2';

const INITIAL_DATA: BoardData = {
  columns: [
    { id: 'backlog', title: 'BACKLOG', color: 'zinc-600' },
    { id: 'todo', title: 'DO ZROBIENIA', color: 'zinc-400' },
    { id: 'in-progress', title: 'W TRAKCIE', color: 'amber-400' },
    { id: 'review', title: 'TESTY', color: 'violet-500' },
    { id: 'done', title: 'GOTOWE', color: 'emerald-400' },
  ],
  tasks: [
    {
      id: 't-1',
      columnId: 'todo',
      title: 'Analiza formy',
      description: 'Stworzyć moodboard dla nowego interfejsu użytkownika inspirowany brutalizmem i typografią szwajcarską.',
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
      priority: 'high',
      subtasks: [
        { id: 's-1', title: 'Zebrać referencje', completed: true },
        { id: 's-2', title: 'Dobór palety barw', completed: false },
        { id: 's-3', title: 'Szkice układu', completed: false },
      ],
      tags: ['Design', 'UX'],
      accentColor: '#f43f5e', // Rose
      assignees: ['MK', 'AD'],
      timeSpent: 3600,
      history: [
        { id: 'h-1', action: 'Utworzono zadanie', timestamp: Date.now() - 100000 },
        { id: 'h-2', action: 'Dodano 1h pracy', timestamp: Date.now() - 5000 }
      ],
      createdAt: Date.now(),
    },
    {
      id: 't-2',
      columnId: 'in-progress',
      title: 'Siatka modularna',
      description: 'Zdefiniować grid responsywny dla sekcji głównej. Użyć CSS Grid z obsługą subgrid.',
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
      priority: 'medium',
      subtasks: [
          { id: 's-2-1', title: 'Konfiguracja Tailwind', completed: true }
      ],
      tags: ['Dev', 'Frontend'],
      accentColor: '#eab308', // Yellow
      assignees: ['MK'],
      timeSpent: 1200,
      history: [],
      createdAt: Date.now() - 100000,
    },
    {
      id: 't-3',
      columnId: 'review',
      title: 'Optymalizacja Assets',
      description: 'Kompresja grafik i wideo do formatów webm/avif. Sprawdzenie wydajności ładowania.',
      dueDate: new Date(Date.now() - 86400000).toISOString(), // Overdue
      priority: 'high',
      subtasks: [],
      tags: ['Performance', 'Dev'],
      accentColor: '#8b5cf6', // Violet
      assignees: ['PL'],
      timeSpent: 5400,
      history: [],
      createdAt: Date.now() - 200000,
    },
    {
      id: 't-4',
      columnId: 'backlog',
      title: 'System Design',
      description: 'Opracowanie biblioteki komponentów w Figmie. Przyciski, inputy, stany.',
      dueDate: null,
      priority: 'medium',
      subtasks: [
          { id: 's-4-1', title: 'Button Primary', completed: false },
          { id: 's-4-2', title: 'Button Secondary', completed: false },
          { id: 's-4-3', title: 'Inputs', completed: false },
      ],
      tags: ['Design', 'System'],
      accentColor: '#06b6d4', // Cyan
      assignees: ['AD', 'MK'],
      timeSpent: 0,
      history: [],
      createdAt: Date.now() - 50000,
    },
    {
      id: 't-5',
      columnId: 'done',
      title: 'Briefing Klienta',
      description: 'Spotkanie wstępne, ustalenie wymagań i budżetu.',
      dueDate: new Date(Date.now() - 86400000 * 10).toISOString(),
      priority: 'low',
      subtasks: [
          { id: 's-5-1', title: 'Notatka ze spotkania', completed: true },
          { id: 's-5-2', title: 'Wysłanie oferty', completed: true }
      ],
      tags: ['Meeting', 'Biz'],
      accentColor: '#22c55e', // Green
      assignees: ['CEO'],
      timeSpent: 1800,
      history: [],
      createdAt: Date.now() - 1000000,
    },
    {
      id: 't-6',
      columnId: 'in-progress',
      title: 'API Integration',
      description: 'Podpięcie endpointów do widoku dashboardu. Obsługa błędów 4xx/5xx.',
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      priority: 'high',
      subtasks: [],
      tags: ['Backend', 'API'],
      accentColor: '#f97316', // Orange
      assignees: ['PL', 'MK'],
      timeSpent: 7200,
      history: [],
      createdAt: Date.now() - 40000,
    },
    {
      id: 't-7',
      columnId: 'backlog',
      title: 'Wdrożenie CI/CD',
      description: 'Automatyzacja deployu na środowisko testowe po merge request.',
      dueDate: new Date(Date.now() + 86400000 * 7).toISOString(),
      priority: 'medium',
      subtasks: [],
      tags: ['DevOps', 'Infra'],
      accentColor: '#3b82f6', // Blue
      assignees: ['JJ'],
      timeSpent: 0,
      history: [],
      createdAt: Date.now() - 10000,
    },
    {
      id: 't-8',
      columnId: 'review',
      title: 'Copywriting',
      description: 'Weryfikacja tekstów marketingowych na stronie głównej. Korekta językowa.',
      dueDate: new Date(Date.now() + 86400000 * 1).toISOString(),
      priority: 'low',
      subtasks: [{id: 's-8-1', title: 'Sprawdzić nagłówki', completed: true}],
      tags: ['Content', 'Mkt'],
      accentColor: '#d946ef', // Fuchsia
      assignees: ['EK', 'CEO'],
      timeSpent: 900,
      history: [],
      createdAt: Date.now() - 60000,
    }
  ],
};

export const saveBoardData = (data: BoardData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save board data', e);
  }
};

export const getBoardData = (): BoardData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load board data', e);
  }
  return INITIAL_DATA;
};

export const saveTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error('Failed to save theme', e);
  }
};

export const getTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'void' || stored === 'paper') {
      return stored as Theme;
    }
  } catch (e) {
    console.error('Failed to load theme', e);
  }
  return 'void';
};
