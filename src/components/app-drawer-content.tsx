import type { Href } from 'expo-router';
import { View } from 'react-native';

import { MenuItem } from '@/components/menu-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type AppDrawerContentProps = {
  onNavigate: (href: Href) => void;
};

const menuItems: { icon: string; title: string; description: string; href: Href }[] = [
  { icon: '☀️', title: 'Hoy', description: 'Tu día, paso a paso', href: '/' },
  { icon: '✓', title: 'Hábitos', description: 'Marca tus actividades', href: '/habits' },
  { icon: '↗', title: 'Progreso', description: 'Revisa tus 21 días', href: '/progress' },
  { icon: '🌱', title: 'Perfil y ajustes', description: 'Tu perfil y preferencias', href: '/settings' },
];

export function AppDrawerContent({ onNavigate }: AppDrawerContentProps) {
  return (
    <ThemedView className="flex-1 gap-5 p-5">
      <View className="gap-1 pb-2 pt-8">
        <ThemedText className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">
          Reto personal
        </ThemedText>
        <ThemedText className="text-2xl font-extrabold">21 días 🌿</ThemedText>
      </View>
      {menuItems.map((item) => (
        <MenuItem
          key={item.title}
          icon={item.icon}
          title={item.title}
          description={item.description}
          onPress={() => onNavigate(item.href)}
        />
      ))}
    </ThemedView>
  );
}
