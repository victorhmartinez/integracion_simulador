# Guía de Solución de Problemas - Sistema de Autenticación

## 🚨 Error: "AuthRepositoryApi is not defined"

### Problema
```
Uncaught (in promise) ReferenceError: AuthRepositoryApi is not defined
    at handleRegister (LoginForm.tsx:68:28)
```

### Posibles Causas

#### 1. **Cache del Navegador**
El navegador está cacheando una versión anterior del código.

**Solución:**
```bash
# Opción 1: Script automático
cd Frontend
chmod +x scripts/clear-cache.sh
./scripts/clear-cache.sh

# Opción 2: Manual
# 1. Detener el servidor (Ctrl+C)
# 2. Limpiar cache
rm -rf node_modules/.vite
# 3. Reiniciar
npm run dev
```

**En el navegador:**
1. Abrir DevTools (F12)
2. Ir a pestaña "Application" o "Aplicación"
3. En "Storage", hacer clic en "Clear site data"
4. Recargar página (Ctrl+Shift+R)

#### 2. **Problema de Importaciones**
Las importaciones no se están resolviendo correctamente.

**Verificar archivos:**
```typescript
// ✅ Correcto en useAuth.tsx
import { AuthRepositoryApi, type User, type LoginRequest, type RegisterRequest } from '../adapters/AuthRepositoryApi';

// ✅ Correcto en LoginForm.tsx
import { useAuth } from '../hooks/useAuth';
```

#### 3. **Archivo No Encontrado**
El archivo `AuthRepositoryApi.ts` no existe o tiene problemas.

**Verificar estructura:**
```
Frontend/src/core/auth/infrastructure/
├── adapters/
│   └── AuthRepositoryApi.ts  ✅ Debe existir
├── hooks/
│   └── useAuth.tsx           ✅ Debe existir
└── ui/
    └── LoginForm.tsx         ✅ Debe existir
```

### 🔧 Pasos de Solución

#### Paso 1: Limpiar Cache
```bash
# Linux/Mac
cd Frontend
./scripts/clear-cache.sh

# Windows
cd Frontend
scripts\clear-cache.bat
```

#### Paso 2: Verificar Archivos
```bash
# Verificar que los archivos existen
ls -la src/core/auth/infrastructure/adapters/AuthRepositoryApi.ts
ls -la src/core/auth/infrastructure/hooks/useAuth.tsx
ls -la src/core/auth/infrastructure/ui/LoginForm.tsx
```

#### Paso 3: Verificar Importaciones
Asegúrate de que las importaciones estén correctas:

**En `useAuth.tsx`:**
```typescript
import { AuthRepositoryApi, type User, type LoginRequest, type RegisterRequest } from '../adapters/AuthRepositoryApi';
```

**En `LoginForm.tsx`:**
```typescript
import { useAuth } from '../hooks/useAuth';
```

#### Paso 4: Reiniciar Servidor
```bash
# Detener servidor
Ctrl+C

# Limpiar cache de Vite
rm -rf node_modules/.vite

# Reiniciar
npm run dev
```

#### Paso 5: Verificar en Navegador
1. Abrir DevTools (F12)
2. Ir a pestaña "Console"
3. Buscar logs de inicialización:
   ```
   🔧 [FRONTEND] AuthRepositoryApi cargado correctamente
   🔧 [FRONTEND] AuthProvider inicializando...
   🔧 [FRONTEND] AuthRepositoryApi instanciado
   ```

### 🐛 Debugging Adicional

#### Verificar Logs en Consola
Los archivos incluyen logs detallados. Busca estos mensajes:

```
✅ Correcto:
🔧 [FRONTEND] AuthRepositoryApi cargado correctamente
🔧 [FRONTEND] AuthProvider inicializando...
🔧 [FRONTEND] AuthRepositoryApi instanciado

❌ Problema:
ReferenceError: AuthRepositoryApi is not defined
```

#### Verificar Network Tab
1. Abrir DevTools → Network
2. Recargar página
3. Verificar que no hay errores 404 en archivos .ts/.tsx

#### Verificar Sources Tab
1. Abrir DevTools → Sources
2. Buscar archivo `AuthRepositoryApi.ts`
3. Verificar que el contenido es correcto

### 🔄 Solución Rápida

Si el problema persiste, ejecuta estos comandos en orden:

```bash
# 1. Detener servidor
Ctrl+C

# 2. Limpiar todo
rm -rf node_modules package-lock.json
rm -rf .vite dist

# 3. Reinstalar
npm install

# 4. Reiniciar
npm run dev

# 5. En navegador: Ctrl+Shift+R
```

### 📞 Si el Problema Persiste

1. **Verificar versión de Node.js**: `node --version` (recomendado: 18+)
2. **Verificar versión de npm**: `npm --version`
3. **Verificar dependencias**: `npm list react react-dom`
4. **Verificar TypeScript**: `npx tsc --version`

### 🎯 Prevención

Para evitar este problema en el futuro:

1. **Siempre usar Ctrl+Shift+R** después de cambios importantes
2. **Limpiar cache regularmente** con los scripts proporcionados
3. **Verificar importaciones** antes de hacer commit
4. **Usar TypeScript strict mode** para detectar errores temprano

### 📚 Recursos Adicionales

- **Documentación Vite**: https://vitejs.dev/guide/troubleshooting.html
- **React DevTools**: Para verificar el estado de los componentes
- **TypeScript Playground**: Para probar código TypeScript
