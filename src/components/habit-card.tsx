import { Pressable, View } from 'react-native';

import type { Habit } from '@/data/habits';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type HabitCardProps = {
  habit: Habit;
  completed: boolean;
  onToggle: () => void;
};

export function HabitCard({ habit, completed, onToggle }: HabitCardProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: completed }}
      accessibilityLabel={`${habit.title}, ${completed ? 'completado' : 'pendiente'}`}
      onPress={onToggle}>
      <ThemedView
        className={`flex-row items-center gap-4 rounded-3xl border p-4 ${
          completed
            ? 'border-teal-200 bg-teal-50 dark:border-teal-900 dark:bg-teal-950/50'
            : 'border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900'
        }`}>
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
          <ThemedText className="text-2xl">{habit.icon}</ThemedText>
        </View>
        <View className="flex-1 gap-1">
          <ThemedText className="font-bold">{habit.title}</ThemedText>
          <ThemedText className="text-xs text-slate-600 dark:text-slate-300">
            {habit.description}
          </ThemedText>
          <ThemedText className="text-xs font-semibold text-teal-700 dark:text-teal-300">
            {habit.category}
          </ThemedText>
        </View>
        <View
          className={`h-7 w-7 items-center justify-center rounded-full border-2 ${
            completed ? 'border-teal-700 bg-teal-700' : 'border-slate-300 dark:border-slate-600'
          }`}>
          {completed && <ThemedText className="text-sm font-extrabold text-white">✓</ThemedText>}
        </View>
      </ThemedView>
    </Pressable>
  );
}
