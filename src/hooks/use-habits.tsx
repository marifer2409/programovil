import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

import { initialHabits, type Habit } from '@/data/habits';

type DayProgress = {
  dayIndex: number;
  completed: number;
  progress: number;
};

type HabitsContextValue = {
  habits: (Habit & { completed: boolean })[];
  days: DayProgress[];
  completedCount: number;
  progress: number;
  overallCompleted: number;
  overallTotal: number;
  overallProgress: number;
  selectedDay: number;
  todayIndex: number;
  startDate: Date;
  selectDay: (day: number) => void;
  toggleHabit: (habitId: string) => void;
};

const HabitsContext = createContext<HabitsContextValue | null>(null);

function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, amount: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

export function HabitsProvider({ children }: PropsWithChildren) {
  const [startDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  });
  const [records, setRecords] = useState<Record<string, Record<string, boolean>>>({});
  const [selectedDay, setSelectedDay] = useState(0);
  const elapsedDays = Math.floor(
    (new Date().setHours(0, 0, 0, 0) - startDate.getTime()) / (24 * 60 * 60 * 1000),
  );
  const todayIndex = Math.min(20, Math.max(0, elapsedDays));
  const selectedDateKey = dateKey(addDays(startDate, selectedDay));

  const habits = useMemo(
    () =>
      initialHabits.map((habit) => ({
        ...habit,
        completed: records[selectedDateKey]?.[habit.id] ?? false,
      })),
    [records, selectedDateKey],
  );
  const completedCount = habits.filter((habit) => habit.completed).length;
  const progress = Math.round((completedCount / initialHabits.length) * 100);

  const days = useMemo(
    () =>
      Array.from({ length: 21 }, (_, dayIndex) => {
        const record = records[dateKey(addDays(startDate, dayIndex))] ?? {};
        const completed = initialHabits.filter((habit) => record[habit.id]).length;
        return {
          dayIndex,
          completed,
          progress: Math.round((completed / initialHabits.length) * 100),
        };
      }),
    [records, startDate],
  );
  const overallTotal = (todayIndex + 1) * initialHabits.length;
  const overallCompleted = days
    .filter((day) => day.dayIndex <= todayIndex)
    .reduce((sum, day) => sum + day.completed, 0);
  const overallProgress = Math.round((overallCompleted / overallTotal) * 100);

  const value = useMemo<HabitsContextValue>(
    () => ({
      habits,
      days,
      completedCount,
      progress,
      overallCompleted,
      overallTotal,
      overallProgress,
      selectedDay,
      todayIndex,
      startDate,
      selectDay: (day) => setSelectedDay(Math.min(todayIndex, Math.max(0, day))),
      toggleHabit: (habitId) => {
        if (!initialHabits.some((habit) => habit.id === habitId)) {
          throw new Error(`Hábito desconocido: ${habitId}`);
        }
        setRecords((current) => ({
          ...current,
          [selectedDateKey]: {
            ...current[selectedDateKey],
            [habitId]: !current[selectedDateKey]?.[habitId],
          },
        }));
      },
    }),
    [
      habits,
      days,
      completedCount,
      progress,
      overallCompleted,
      overallTotal,
      overallProgress,
      selectedDay,
      todayIndex,
      startDate,
      selectedDateKey,
    ],
  );

  return <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>;
}

export function useHabits(): HabitsContextValue {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error('useHabits debe utilizarse dentro de HabitsProvider.');
  }
  return context;
}
