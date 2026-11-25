import { createContext, useContext, type PropsWithChildren } from 'react';

type DrawerControlValue = {
  openDrawer: () => void;
};

const DrawerControlContext = createContext<DrawerControlValue | null>(null);

type DrawerControlProviderProps = PropsWithChildren<DrawerControlValue>;

export function DrawerControlProvider({ children, openDrawer }: DrawerControlProviderProps) {
  return (
    <DrawerControlContext.Provider value={{ openDrawer }}>
      {children}
    </DrawerControlContext.Provider>
  );
}

export function useDrawerControl(): DrawerControlValue {
  const context = useContext(DrawerControlContext);
  if (!context) {
    throw new Error('useDrawerControl debe utilizarse dentro de DrawerControlProvider.');
  }
  return context;
}
