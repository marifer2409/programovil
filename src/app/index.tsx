import { ScrollView, View } from 'react-native';

import { HabitCard } from '@/components/habit-card';
import { AppScreen } from '@/components/app-screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useHabits } from '@/hooks/use-habits';

export default function TodayScreen() {
  const { habits, completedCount, progress, selectedDay, todayIndex, toggleHabit } = useHabits();
  const greeting =
    selectedDay === todayIndex ? 'Hoy es un buen día para avanzar' : `Día ${selectedDay + 1} del reto`;

  return (
    <AppScreen title="Hoy" activeRoute="home">
      <ScrollView contentContainerClassName="gap-6 px-5 pb-10 pt-5">
        <View className="flex-row items-center justify-between">
          <View>
            <ThemedText className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">
              Tu espacio personal
            </ThemedText>
            <ThemedText type="subtitle" className="mt-1 text-3xl font-extrabold">
              ¡Hola! 👋
            </ThemedText>
          </View>
          <View className="rounded-full bg-teal-100 px-4 py-2 dark:bg-teal-950">
            <ThemedText className="font-bold text-teal-800 dark:text-teal-200">
              DÍA {selectedDay + 1} / 21
            </ThemedText>
          </View>
        </View>

        <ThemedText className="text-base text-slate-600 dark:text-slate-300">{greeting}</ThemedText>

        <ThemedView className="gap-4 rounded-3xl bg-teal-700 p-5">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 gap-1">
              <ThemedText className="text-sm font-semibold text-teal-100">
                Tu avance de hoy
              </ThemedText>
              <ThemedText className="text-sm text-teal-100">
                {completedCount} de {habits.length} hábitos completados
              </ThemedText>
            </View>
            <ThemedText className="text-3xl font-extrabold text-white">{progress}%</ThemedText>
          </View>
          <View className="h-3 overflow-hidden rounded-full bg-teal-900/50">
            <View
              className="h-full rounded-full bg-white"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </View>
          <ThemedText className="text-xs font-medium text-teal-100">
            {completedCount} / {habits.length} completados
          </ThemedText>
        </ThemedView>

        <View className="gap-3">
          <View className="flex-row items-end justify-between">
            <ThemedText className="text-xl font-bold">Mis hábitos</ThemedText>
            <ThemedText className="text-sm font-medium text-teal-700 dark:text-teal-300">
              {habits.length} hábitos
            </ThemedText>
          </View>
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              completed={habit.completed}
              onToggle={() => toggleHabit(habit.id)}
            />
          ))}
        </View>

        <View className="rounded-3xl bg-amber-50 p-4 dark:bg-amber-950/40">
          <ThemedText className="font-bold text-amber-900 dark:text-amber-100">
            ✨ Un paso a la vez
          </ThemedText>
          <ThemedText className="mt-1 text-sm text-amber-800 dark:text-amber-200">
            La constancia se construye con pequeñas acciones repetidas.
          </ThemedText>
        </View>
      </ScrollView>
    </AppScreen>
  );
}
