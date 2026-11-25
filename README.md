# Reto 21 Días

Aplicación móvil en Expo y TypeScript para crear constancia con cuatro hábitos diarios. El avance y las marcas se mantienen en memoria mientras la aplicación está abierta; no se usan API ni base de datos.

## Funcionalidades

- Inicio con hábitos del día y porcentaje de avance.
- Hábitos predefinidos: estudiar programación, leer 20 minutos, hacer ejercicio y beber agua.
- Marcar y desmarcar hábitos por cada día del reto.
- Progreso de los 21 días y selección de días anteriores.
- Menú lateral, pestañas de Hoy/Hábitos/Progreso y sección Perfil y ajustes.
- Tema claro y oscuro, con componentes reutilizables y NativeWind.

## Requisitos

- Node.js LTS y npm.
- Expo Go para desarrollo o un APK de Android para instalación.
- Para distribuir un APK, una cuenta de Expo y EAS CLI.

## Ejecutar localmente

Desde esta carpeta (`Reto21Dias`):

```bash
npm install
npm start
```

Pulsa `a` en la terminal para abrir Android, o escanea el QR con Expo Go. Para validar el proyecto:

```bash
npm run typecheck
npm run lint
```

## APK de prueba (EAS)

El perfil `preview` de `eas.json` genera un APK Android para distribución interna:

```bash
npx eas-cli@latest login
npx eas-cli@latest build:configure
npx eas-cli@latest build --platform android --profile preview
```

Al finalizar, EAS entrega una página de build con el enlace de descarga y un QR. Publica ese enlace/QR aquí para completar la distribución:

**APK preview:** pendiente de generar en EAS Build.

No se incluye un enlace de descarga ficticio: el APK requiere una compilación desde una cuenta EAS.

## Arquitectura

```text
src/
  app/
    _layout.tsx                   Stack principal y menú Drawer
    index.tsx                     Inicio / Hoy
    habits.tsx                    Hábitos
    progress.tsx                  Progreso
    settings.tsx                  Perfil y ajustes
  components/                   Pantallas comunes y componentes tipados
  data/habits.ts                Hábitos iniciales tipados
  hooks/use-habits.tsx          Estado y cálculos del reto
```

`HabitsProvider` comparte el estado durante la sesión y `useHabits` expone las marcas, el día seleccionado y los porcentajes. Stack mantiene las rutas en `app/`, Drawer ofrece el menú lateral y la barra inferior navega entre Hoy, Hábitos y Progreso. NativeWind configura clases Tailwind en iOS, Android y web; el selector de ajustes cambia el tema sin depender del tema del sistema.

## Evidencias

Añade aquí capturas del Inicio, Hábitos, Progreso y ambos temas, y el enlace/QR del APK después de completar la compilación. Para la sustentación, muestra el árbol de rutas, `useHabits`, los componentes tipados y el resultado del build.
