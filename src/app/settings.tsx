import { useColorScheme } from 'nativewind';
import { ScrollView, View } from 'react-native';

import { MenuItem } from '@/components/menu-item';
import { AppScreen } from '@/components/app-screen';
import { ThemedText } from '@/components/themed-text';
import { useHabits } from '@/hooks/use-habits';

export default function SettingsScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { startDate, todayIndex, overallProgress } = useHabits();
  const isDark = colorScheme === 'dark';

  return (
    <AppScreen title="Perfil y ajustes" activeRoute="settings">
      <ScrollView contentContainerClassName="gap-6 px-5 pb-10 pt-6">
        <View className="gap-2">
          <ThemedText className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">
            Personaliza tu experiencia
          </ThemedText>
          <ThemedText type="subtitle" className="text-3xl font-extrabold">
            Perfil y ajustes
          </ThemedText>
        </View>

        <View className="items-center gap-3 rounded-3xl bg-teal-50 p-6 dark:bg-teal-950/50">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-teal-700">
            <ThemedText className="text-3xl text-white">🌱</ThemedText>
          </View>
          <ThemedText className="text-xl font-bold">Mi reto personal</ThemedText>
          <ThemedText className="text-sm text-slate-600 dark:text-slate-300">
            En camino: día {todayIndex + 1} de 21
          </ThemedText>
        </View>

        <View className="gap-3">
          <ThemedText className="text-lg font-bold">Preferencias</ThemedText>
          <MenuItem
            icon={isDark ? '🌙' : '☀️'}
            title="Modo de apariencia"
            description={isDark ? 'Oscuro' : 'Claro'}
            actionLabel="Cambiar"
            onPress={() => setColorScheme(isDark ? 'light' : 'dark')}
          />
        </View>

        <View className="gap-3">
          <ThemedText className="text-lg font-bold">Este reto</ThemedText>
          <MenuItem
            icon="📅"
            title="Fecha de inicio"
            description={startDate.toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          />
          <MenuItem
            icon="🎯"
            title="Constancia global"
            description={`${overallProgress}% de cumplimiento`}
          />
        </View>

        <ThemedText className="text-center text-xs text-slate-500 dark:text-slate-400">
          Reto 21 Días · Tus datos se guardan en memoria mientras la app está abierta.
        </ThemedText>
      </ScrollView>
    </AppScreen>
  );
}
