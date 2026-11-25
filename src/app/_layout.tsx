import '@/global.css';

import { DarkTheme, DefaultTheme, Stack, ThemeProvider, router, type Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { Drawer } from 'react-native-drawer-layout';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState } from 'react';

import { AppDrawerContent } from '@/components/app-drawer-content';
import { Colors } from '@/constants/theme';
import { DrawerControlProvider } from '@/hooks/use-drawer-control';
import { HabitsProvider } from '@/hooks/use-habits';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const navigateFromDrawer = (href: Href) => {
    setDrawerOpen(false);
    router.push(href);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <HabitsProvider>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Drawer
            open={drawerOpen}
            onOpen={() => setDrawerOpen(true)}
            onClose={() => setDrawerOpen(false)}
            renderDrawerContent={() => <AppDrawerContent onNavigate={navigateFromDrawer} />}
            drawerStyle={{ width: 300, backgroundColor: colors.background }}>
            <DrawerControlProvider openDrawer={() => setDrawerOpen(true)}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="habits" />
                <Stack.Screen name="progress" />
                <Stack.Screen name="settings" />
              </Stack>
            </DrawerControlProvider>
          </Drawer>
        </HabitsProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
