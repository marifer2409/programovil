export type Habit = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
};

export const initialHabits: Habit[] = [
  {
    id: 'programming',
    title: 'Estudiar programación',
    description: 'Dedica un momento a aprender algo nuevo.',
    icon: '💻',
    category: 'Aprendizaje',
  },
  {
    id: 'reading',
    title: 'Leer 20 minutos',
    description: 'Unas páginas cada día hacen la diferencia.',
    icon: '📚',
    category: 'Bienestar',
  },
  {
    id: 'exercise',
    title: 'Realizar ejercicio',
    description: 'Activa el cuerpo a tu propio ritmo.',
    icon: '🏃',
    category: 'Movimiento',
  },
  {
    id: 'water',
    title: 'Beber agua',
    description: 'Recuerda mantenerte hidratado durante el día.',
    icon: '💧',
    category: 'Salud',
  },
];
