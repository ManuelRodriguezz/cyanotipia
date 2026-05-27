# 🌊 Cyanotipia Development Workflow

Este documento define el estándar de ingeniería para el proyecto Cyanotipia, asegurando que el código en `main` sea siempre estable y profesional.

## 🏛️ Estructura de Ramas

| Rama | Propósito | Estabilidad |
| :--- | :--- | :--- |
| `main` | Producción / Despliegue final | 100% Estable |
| `development` | Integración de features | Estable para pruebas |
| `feature/*` | Nuevas funcionalidades / Mejoras | En desarrollo |

## 🚀 Ciclo de Vida de una Funcionalidad

### 1. Preparación
Antes de empezar, asegurate de tener lo último de la rama de integración.
```bash
git checkout development
git pull origin development
```

### 2. Creación de la Rama
Usamos nombres descriptivos con el prefijo `feature/`.
```bash
git checkout -b feature/seccion-conjuntos-premium
```

### 3. Desarrollo y Commits
Realizá commits pequeños y atómicos.
```bash
git add .
git commit -m "feat: implementar componente Conjuntos con framer-motion y selector de talles"
```

### 4. Sincronización y Push
Subí tus cambios para activar los **Preview Deployments** de Vercel.
```bash
git push origin feature/seccion-conjuntos-premium
```

### 5. Pull Request (PR)
- Abrí un PR desde GitHub de `feature/...` hacia `development`.
- Revisá la URL de Preview que genera Vercel para asegurar que todo se ve perfecto en mobile y desktop.
- Una vez aprobado, fusioná a `development`.

### 6. Despliegue a Producción
Cuando `development` esté listo para el público:
```bash
git checkout main
git merge development
git push origin main
```

---
**Regla de Oro:** Nunca hagas commits directos a `main`. Usa siempre el flujo de PRs para mantener la calidad.
