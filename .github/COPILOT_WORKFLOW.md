# Guía de Workflow con GitHub Copilot — teatro-mvp

Este proyecto usa cuatro customizaciones de Copilot que trabajan en conjunto para implementar features de forma ordenada, consistente y sin errores.

---

## Archivos y su rol

| Archivo | Tipo | Cuándo se activa |
|--------|------|-----------------|
| `agents/planner.agent.md` | Agente | Manual (`@planner`) o vía `/feature` |
| `agents/executor.agent.md` | Agente | Manual (`@executor`) |
| `instructions/conventions.instructions.md` | Instructions | Automático al editar `src/**` |
| `prompts/feature.prompt.md` | Prompt | Manual con `/feature` |

---

## Flujo de trabajo recomendado

### Opción A — Flujo completo con `/feature` (recomendado)

```
/feature Agregar sistema de reseñas con calificación de estrellas
```

1. El prompt `/feature` delega automáticamente al agente `planner`
2. El `planner` investiga el codebase exhaustivamente y produce un plan detallado
3. **Revisás y aprobás el plan**
4. Invocás `@executor` con el plan aprobado para que lo implemente

### Opción B — Planner directo

```
@planner Quiero agregar un filtro por precio en la página de home
```

El agente investiga los archivos relevantes y produce el plan de implementación.

### Opción C — Ejecución de plan existente

Si ya tenés un plan aprobado (del planner o propio):

```
@executor Implementar el siguiente plan: [pegás el plan]
```

---

## Agente: `planner`

**¿Qué hace?**  
Actúa como un senior software engineer de solo lectura. Lee todos los archivos relevantes, traza el flujo de datos y produce un plan de implementación estructurado en español. **Nunca escribe ni edita código.**

**Output del plan:**
1. Resumen del cambio
2. Tabla de archivos afectados (path, acción, razón)
3. Tipos y datos nuevos o modificados
4. Cambios en detalle por archivo (con referencias a líneas específicas)
5. Orden de implementación seguro
6. Riesgos y consideraciones
7. Criterios de aceptación

**Herramientas disponibles:** `read`, `search`, `agent`, `todo`, `web`  
**No tiene acceso a:** `edit`, `execute` — no puede tocar el código

**Prompts de ejemplo:**
```
@planner Agregar una página de búsqueda con filtros por género y precio
@planner Refactorizar AppContext para separar el estado de notificaciones
@planner Implementar un sistema de reseñas donde los usuarios califiquen obras
@planner Agregar soporte para obras con múltiples funciones en el mismo día
```

---

## Agente: `executor`

**¿Qué hace?**  
Recibe un plan aprobado y lo ejecuta paso a paso, escribiendo código production-ready que sigue las convenciones del proyecto. Siempre lee los archivos antes de editarlos y sigue el orden del plan.

**Flujo interno:**
1. Parsea el plan e identifica todos los archivos y cambios
2. Crea una lista de tareas (todo list) con cada paso
3. Ejecuta en orden: tipos → datos → context → componentes → páginas → rutas
4. Verifica cada cambio leyendo el archivo tras editarlo
5. Reporta un resumen final con lo hecho y cómo testar

**Herramientas disponibles:** `read`, `search`, `edit`, `execute`, `todo`, `agent`

**Prompts de ejemplo:**
```
@executor Implementar el plan aprobado de sistema de reseñas
@executor [pegás el plan completo del planner]
```

---

## Instructions: `conventions.instructions.md`

**¿Qué hace?**  
Se carga **automáticamente** cada vez que Copilot trabaja con archivos dentro de `src/`. No necesitás invocarlo manualmente — está siempre activo cuando relevante.

Documenta todas las convenciones del proyecto:
- Patrón de componentes (exports, props, destructuring, variantes)
- TypeScript (type vs interface, PascalCase, prop interfaces)
- Orden de imports con alias `@/`
- State management (actions, reducer, context value)
- Tailwind con colores `teatro-*`
- Naming de mock data, hooks, utilidades y páginas

**Efecto:** Tanto el agente `planner` como el `executor` (y el chat normal) seguirán estas convenciones automáticamente al generar código para este proyecto.

---

## Prompt: `/feature`

**¿Qué hace?**  
Shortcut que invoca directamente al agente `planner` con una estructura de plan predefinida. Es equivalente a `@planner` pero más simple de recordar.

**Cómo usarlo:**  
En el chat de Copilot, escribí `/` y seleccioná `feature` de la lista, luego describí lo que querés:

```
/feature Agregar wishlist de obras con notificaciones de cambio de precio
/feature Implementar modo offline con caché de datos en localStorage
/feature Crear página de onboarding para nuevos usuarios con quiz de preferencias
```

---

## Resumen visual del flujo

```
Usuario describe un feature
        │
        ▼
   /feature  ──►  @planner  ──►  Investiga codebase
                                         │
                                         ▼
                              Plan detallado en español
                                         │
                              ┌──────────┘
                              │  Usuario revisa y aprueba
                              └──────────┐
                                         ▼
                    @executor  ──►  Implementa el plan
                                         │
                                         ▼
                              Resumen + cómo testear
```

---

## Tips

- **Siempre revisá el plan del planner antes de ejecutar.** El executor implementa exactamente lo que el plan dice.
- **Si el plan tiene dudas o decisiones pendientes**, resuélvelas con el planner antes de pasar al executor.
- **Para cambios pequeños** (un solo archivo, ajuste menor), podés ir directo al `@executor` sin pasar por el planner.
- **Las conventions se aplican al chat normal también** — si le pedís a Copilot que genere código para `src/`, seguirá las convenciones automáticamente.
- **El planner puede hacer varias iteraciones** antes de que apruebes — es normal pedirle que ajuste partes del plan.
