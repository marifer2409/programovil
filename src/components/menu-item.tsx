import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type MenuItemProps = {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onPress?: () => void;
};

export function MenuItem({
  icon,
  title,
  description,
  actionLabel,
  onPress,
}: MenuItemProps) {
  const content = (
    <ThemedView className="flex-row items-center gap-3 rounded-2xl bg-white p-4 dark:bg-slate-900">
      <ThemedText className="text-xl">{icon}</ThemedText>
      <View className="flex-1 gap-1">
        <ThemedText className="font-semibold">{title}</ThemedText>
        <ThemedText className="text-xs text-slate-600 dark:text-slate-300">
          {description}
        </ThemedText>
      </View>
      {actionLabel && (
        <ThemedText className="text-xs font-bold text-teal-700 dark:text-teal-300">
          {actionLabel}
        </ThemedText>
      )}
    </ThemedView>
  );

  return onPress ? (
    <Pressable accessibilityRole="button" onPress={onPress}>
      {content}
    </Pressable>
  ) : (
    content
  );
}
