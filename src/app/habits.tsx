import { ScrollView, View } from 'react-native';

import { HabitCard } from '@/components/habit-card';
import { AppScreen } from '@/components/app-screen';
import { ThemedText } from '@/components/themed-text';
import { useHabits } from '@/hooks/use-habits';

export default function HabitsScreen() {
  const { habits, selectedDay, todayIndex, toggleHabit } = useHabits();

  return (
    <AppScreen title="Hábitos" activeRoute="habits">
      <ScrollView contentContainerClassName="gap-5 px-5 pb-10 pt-6">
        <View className="gap-2">
          <ThemedText className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">
            Día {selectedDay + 1} de 21
          </ThemedText>
          <ThemedText type="subtitle" className="text-3xl font-extrabold">
            Hábitos diarios
          </ThemedText>
          <ThemedText className="text-base text-slate-600 dark:text-slate-300">
            Marca cada actividad cuando la hayas completado.
          </ThemedText>
        </View>
        {selectedDay < todayIndex && (
          <View className="rounded-2xl bg-sky-50 p-4 dark:bg-sky-950/50">
            <ThemedText className="text-sm text-sky-900 dark:text-sky-100">
              Estás revisando un día anterior. Puedes actualizar su registro.
            </ThemedText>
          </View>
        )}
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            completed={habit.completed}
            onToggle={() => toggleHabit(habit.id)}
          />
        ))}
      </ScrollView>
    </AppScreen>
  );
}
