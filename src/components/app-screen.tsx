import type { PropsWithChildren } from 'react';
import { router, type Href } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useDrawerControl } from '@/hooks/use-drawer-control';

type AppRoute = 'home' | 'habits' | 'progress' | 'settings';

type AppScreenProps = PropsWithChildren<{
  title: string;
  activeRoute: AppRoute;
}>;

const navigationItems: {
  id: Exclude<AppRoute, 'settings'>;
  title: string;
  icon: string;
  href: Href;
}[] = [
  { id: 'home', title: 'Hoy', icon: '☀', href: '/' },
  { id: 'habits', title: 'Hábitos', icon: '✓', href: '/habits' },
  { id: 'progress', title: 'Progreso', icon: '↗', href: '/progress' },
];

export function AppScreen({ title, activeRoute, children }: AppScreenProps) {
  const { openDrawer } = useDrawerControl();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView className="flex-1">
        <View className="flex-row items-center gap-4 border-b border-slate-200 px-5 py-3 dark:border-slate-800">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Abrir menú de navegación"
            onPress={openDrawer}
            className="h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <Text className="text-xl text-slate-900 dark:text-slate-100">☰</Text>
          </Pressable>
          <ThemedText className="text-lg font-bold">{title}</ThemedText>
        </View>

        <View className="flex-1">{children}</View>

        <View className="flex-row border-t border-slate-200 px-3 py-2 dark:border-slate-800">
          {navigationItems.map((item) => {
            const active = activeRoute === item.id;
            return (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => router.push(item.href)}
                className={`flex-1 items-center gap-1 rounded-xl py-2 ${
                  active ? 'bg-teal-50 dark:bg-teal-950' : ''
                }`}>
                <Text
                  className={`text-lg ${
                    active ? 'text-teal-700 dark:text-teal-300' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                  {item.icon}
                </Text>
                <ThemedText
                  className={`text-xs font-semibold ${
                    active ? 'text-teal-700 dark:text-teal-300' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                  {item.title}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}
