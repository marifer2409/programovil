import { Pressable, ScrollView, View } from 'react-native';

import { AppScreen } from '@/components/app-screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useHabits } from '@/hooks/use-habits';

type ProgressSummaryProps = {
  title: string;
  completed: number;
  total: number;
  progress: number;
  subtitle: string;
  compact?: boolean;
};

function ProgressSummary({
  title,
  completed,
  total,
  progress,
  subtitle,
  compact = false,
}: ProgressSummaryProps) {
  return (
    <ThemedView className={`gap-4 rounded-3xl bg-teal-700 ${compact ? 'p-4' : 'p-5'}`}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1 gap-1">
          <ThemedText className="text-sm font-semibold text-teal-100">{title}</ThemedText>
          <ThemedText className="text-sm text-teal-100">{subtitle}</ThemedText>
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
        {completed} / {total} completados
      </ThemedText>
    </ThemedView>
  );
}

export default function ProgressScreen() {
  const {
    habits,
    days,
    overallCompleted,
    overallTotal,
    overallProgress,
    completedCount,
    progress,
    selectedDay,
    selectDay,
    todayIndex,
  } = useHabits();

  return (
    <AppScreen title="Progreso" activeRoute="progress">
      <ScrollView contentContainerClassName="gap-6 px-5 pb-10 pt-6">
        <View className="gap-2">
          <ThemedText className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">
            Cada día cuenta
          </ThemedText>
          <ThemedText type="subtitle" className="text-3xl font-extrabold">
            Tu progreso
          </ThemedText>
          <ThemedText className="text-base text-slate-600 dark:text-slate-300">
            Revisa tu avance y vuelve a cualquier día del reto.
          </ThemedText>
        </View>

        <ProgressSummary
          title="Avance del reto"
          completed={overallCompleted}
          total={overallTotal}
          progress={overallProgress}
          subtitle={`${overallProgress}% de constancia en el reto`}
        />

        <View className="gap-3 rounded-3xl bg-white p-5 dark:bg-slate-900">
          <ThemedText className="text-lg font-bold">Tus 21 días</ThemedText>
          <ThemedText className="text-sm text-slate-600 dark:text-slate-300">
            Toca un día para consultar o actualizar sus hábitos.
          </ThemedText>
          <View className="flex-row flex-wrap gap-2">
            {days.map((day) => {
              const isSelected = selectedDay === day.dayIndex;
              const isFuture = day.dayIndex > todayIndex;
              return (
                <Pressable
                  key={day.dayIndex}
                  onPress={() => {
                    if (!isFuture) selectDay(day.dayIndex);
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected, disabled: isFuture }}
                  className={`h-11 w-11 items-center justify-center rounded-2xl ${
                    isSelected
                      ? 'bg-teal-700'
                      : day.progress === 100
                        ? 'bg-teal-100 dark:bg-teal-950'
                        : isFuture
                          ? 'bg-slate-100 opacity-40 dark:bg-slate-800'
                          : 'bg-slate-100 dark:bg-slate-800'
                  }`}>
                  <ThemedText
                    className={`text-sm font-bold ${
                      isSelected
                        ? 'text-white'
                        : day.progress === 100
                          ? 'text-teal-800 dark:text-teal-200'
                          : 'text-slate-700 dark:text-slate-200'
                    }`}>
                    {day.dayIndex + 1}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View className="gap-3">
          <ThemedText className="text-lg font-bold">Resumen del día {selectedDay + 1}</ThemedText>
          <ProgressSummary
            title="Hábitos del día"
            completed={completedCount}
            total={habits.length}
            progress={progress}
            subtitle={`${completedCount} de ${habits.length} actividades`}
            compact
          />
        </View>
      </ScrollView>
    </AppScreen>
  );
}
