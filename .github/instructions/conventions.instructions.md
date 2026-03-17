---
description: "Use when writing or modifying React components, TypeScript types, hooks, utilities, context, pages, or styles in teatro-mvp. Covers naming conventions, component patterns, import order, Tailwind usage, and state management patterns."
applyTo: "src/**"
---

# Convenciones de Código — teatro-mvp

## Componentes React

- **Default export** siempre: `export default function ComponentName({ ... }: ComponentNameProps)`
- **Props en interface separada** antes del componente, no inline:
  ```tsx
  interface PlayCardProps {
    play: Play;
    compact?: boolean;
  }
  export default function PlayCard({ play, compact = false }: PlayCardProps) { ... }
  ```
- **Destructuring directo** en parámetros con valores por defecto para opcionales
- **Variantes de estilo** con `Record<string, string>`:
  ```tsx
  const variantClasses: Record<string, string> = {
    primary: 'bg-teatro-gold text-teatro-bg',
    secondary: 'border border-teatro-gold text-teatro-gold',
  };
  ```

## TypeScript

- `export type` para uniones: `export type Genre = 'comedia' | 'drama' | 'musical';`
- `export interface` para objetos complejos: `export interface Play { ... }`
- PascalCase para tipos/interfaces: `User`, `PlayCard`, `NewsArticle`
- Props: `ComponentNameProps` (ej: `ButtonProps`, `CardProps`)
- Un archivo por entidad en `src/types/`, barrel export en `index.ts`
- Usar `import type { ... }` para importaciones de tipos

## Orden de Imports

```tsx
// 1. React y librerías externas
import { useState, useEffect } from 'react';
// 2. Router
import { useParams, Link } from 'react-router-dom';
// 3. Types (con import type)
import type { Play, User } from '@/types';
// 4. Lib, hooks, context
import { formatPrice } from '@/lib/formatters';
import { useAppContext } from '@/context/AppContext';
// 5. Componentes
import Button from '@/components/ui/Button';
```

- Siempre usar alias `@/` (nunca rutas relativas con `../`)

## State Management (Context + useReducer)

- Actions como discriminated union: `{ type: 'SCREAMING_SNAKE_CASE'; payloadProp: type }`
- Reducer con `switch`/`case`, cada caso envuelto en `{ }`
- Context value extiende state + dispatch + helpers:
  ```tsx
  interface AppContextValue extends AppState {
    dispatch: React.Dispatch<AppAction>;
    toggleFavorite: (playId: string) => void;
  }
  ```

## Tailwind CSS

- Clases utilitarias de Tailwind directamente en `className`
- Colores custom del tema: `teatro-bg`, `teatro-surface`, `teatro-gold`, `teatro-burgundy`
- Fuentes: `font-display` (Playfair Display), `font-body` (Inter)
- Clases condicionales con template literals: `` `base-classes ${condition ? 'active' : ''}` ``
- Prop `className` passthrough con default `''`

## Mock Data

- Prefijo `mock` + nombre en camelCase: `mockPlays`, `mockCurrentUser`, `mockNews`
- Tipado explícito: `export const mockPlays: Play[] = [...]`
- IDs con formato `entity-XX`: `'play-01'`, `'notification-01'`

## Utilidades (`src/lib/`)

- **Named exports** (nunca default): `export function formatPrice(...)`
- Funciones pequeñas y enfocadas, una responsabilidad cada una

## Hooks (`src/hooks/`)

- Named exports con prefijo `use`: `export function useLocalStorage<T>(...)`
- Retorno tipo tuple cuando imita `useState`: `[value, setValue]`

## Páginas (`src/pages/`)

- Sufijo `Page`: `HomePage`, `ProfilePage`, `PlayDetailPage`
- Default export
- Rutas definidas en `src/App.tsx` con `createBrowserRouter`
