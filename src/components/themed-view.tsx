import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
  className?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  type,
  className,
  ...otherProps
}: ThemedViewProps) {
  const theme = useTheme();

  const themedColor = type ? theme[type] : lightColor || darkColor ? theme.background : undefined;

  return (
    <View
      className={`bg-slate-50 dark:bg-slate-950 ${className ?? ''}`}
      style={[themedColor ? { backgroundColor: themedColor } : undefined, style]}
      {...otherProps}
    />
  );
}
