# Guía del Sistema de Autenticación

## 🎯 Propósito
Este documento explica el sistema de autenticación implementado en el frontend, incluyendo login, registro y protección de rutas.

## 🔐 Funcionalidades Implementadas

### 1. **Formulario de Login/Registro Unificado**
- ✅ **Modo Login**: Email y contraseña
- ✅ **Modo Registro**: Nombre completo, email, contraseña y confirmación
- ✅ **Alternancia entre modos** con un solo clic
- ✅ **Validación de contraseñas** en registro
- ✅ **Mostrar/ocultar contraseñas** con iconos
- ✅ **Datos de prueba** visibles en modo login

### 2. **Sistema de Autenticación**
- ✅ **Context API** para estado global de autenticación
- ✅ **Persistencia en localStorage** para mantener sesión
- ✅ **Hook personalizado** `useAuth` para fácil acceso
- ✅ **Repositorio API** para comunicación con backend
- ✅ **Manejo de errores** específicos por tipo

### 3. **Protección de Rutas**
- ✅ **Componente ProtectedRoute** para rutas privadas
- ✅ **Redirección automática** a login si no autenticado
- ✅ **Pantalla de carga** durante verificación
- ✅ **Rutas públicas** (login) sin restricciones

### 4. **Interfaz de Usuario**
- ✅ **Botón de logout** en el header
- ✅ **Información del usuario** mostrada dinámicamente
- ✅ **Confirmación** antes de cerrar sesión
- ✅ **Redirección** después de login exitoso

## 🏗️ Arquitectura

### Estructura de Archivos
```
Frontend/src/core/auth/
├── infrastructure/
│   ├── adapters/
│   │   └── AuthRepositoryApi.ts      # Comunicación con API
│   ├── components/
│   │   ├── ProtectedRoute.tsx        # Protección de rutas
│   │   └── LogoutButton.tsx          # Botón de logout
│   ├── hooks/
│   │   └── useAuth.ts                # Hook de autenticación
│   └── ui/
│       ├── LoginForm.tsx             # Formulario principal
│       └── LoginPage.tsx             # Página de login
```

### Flujo de Datos
```
LoginForm → useAuth → AuthRepositoryApi → Backend API
                ↓
            Context API → localStorage → ProtectedRoute
```

## 🚀 Cómo Usar

### 1. **Login de Usuario**
```typescript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { login } = useAuth();
  
  const handleLogin = async () => {
    try {
      const user = await login({
        email: 'usuario@ejemplo.com',
        password: '123456'
      });
      console.log('Usuario logueado:', user);
    } catch (error) {
      console.error('Error en login:', error);
    }
  };
}
```

### 2. **Registro de Usuario**
```typescript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { register } = useAuth();
  
  const handleRegister = async () => {
    try {
      const user = await register({
        nombreCompleto: 'Juan Pérez',
        email: 'juan@ejemplo.com',
        password: '123456'
      });
      console.log('Usuario registrado:', user);
    } catch (error) {
      console.error('Error en registro:', error);
    }
  };
}
```

### 3. **Proteger Rutas**
```typescript
import { ProtectedRoute } from '../components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
    </Router>
  );
}
```

### 4. **Verificar Estado de Autenticación**
```typescript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { isAuthenticated, user, loading } = useAuth();
  
  if (loading) return <div>Cargando...</div>;
  
  if (!isAuthenticated) {
    return <div>Por favor inicia sesión</div>;
  }
  
  return <div>Bienvenido, {user?.nombreCompleto}</div>;
}
```

## 🎨 Componentes UI

### LoginForm
- **Props**: Ninguna (usa contexto interno)
- **Funcionalidades**:
  - Alternancia entre login y registro
  - Validación de formularios
  - Manejo de errores
  - Datos de prueba visibles

### ProtectedRoute
- **Props**: `children: ReactNode`
- **Funcionalidades**:
  - Verificación de autenticación
  - Redirección automática
  - Pantalla de carga

### LogoutButton
- **Props**: Ninguna (usa contexto interno)
- **Funcionalidades**:
  - Muestra nombre del usuario
  - Confirmación antes de logout
  - Limpieza de sesión

## 🔧 Configuración

### 1. **Proveedor de Autenticación**
```typescript
// App.tsx
import { AuthProvider } from './core/auth/infrastructure/hooks/useAuth';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
```

### 2. **Variables de Entorno**
```env
# Frontend/.env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

### 3. **Rutas Protegidas**
```typescript
// routes.tsx
businesses: {
  path: "/businesses",
  layout: ({ children }) => (
    <ProtectedRoute>{children}</ProtectedRoute>
  ),
  routes: {
    // ... rutas protegidas
  }
}
```

## 🧪 Testing

### Datos de Prueba Disponibles
```
📧 Email                    | 🔑 Contraseña | 👤 Nombre
maria@ejemplo.com          | 123456        | María González
carlos@ejemplo.com         | 123456        | Carlos Rodríguez
ana@ejemplo.com            | 123456        | Ana Martínez
```

### Flujo de Testing
1. **Acceder a login**: `http://localhost:5173/login`
2. **Usar datos de prueba** o registrar nuevo usuario
3. **Verificar redirección** a `/businesses` después del login
4. **Probar logout** desde el header
5. **Verificar protección** de rutas sin autenticación

## 🔍 Monitoreo con Logs

### Logs del Frontend
```
🔐 [FRONTEND] Intentando login con: { email: "..." }
✅ [FRONTEND] Login exitoso: { usuarioId: 1, ... }
💥 [FRONTEND] Error en login: Credenciales inválidas
```

### Logs del Backend
```
🔐 [BACKEND] POST /usuarios/login - Iniciando sesión: ...
✅ [BACKEND] Login exitoso para usuario: 1
💥 [BACKEND] Error en login: Credenciales inválidas
```

## 🎯 Próximos Pasos

### Mejoras Sugeridas
1. **JWT Tokens**: Implementar tokens JWT para sesiones más seguras
2. **Refresh Tokens**: Renovación automática de tokens
3. **Roles y Permisos**: Sistema de autorización basado en roles
4. **Recuperación de Contraseña**: Flujo de reset de contraseñas
5. **Validación Avanzada**: Validación más robusta en frontend
6. **Persistencia Mejorada**: Usar cookies en lugar de localStorage
7. **Interceptores HTTP**: Manejo automático de tokens en peticiones
8. **Modo Offline**: Funcionalidad básica sin conexión

### Seguridad
1. **HTTPS**: Usar conexiones seguras en producción
2. **Rate Limiting**: Limitar intentos de login
3. **2FA**: Autenticación de dos factores
4. **Auditoría**: Logs de eventos de autenticación
5. **Sanitización**: Limpiar datos de entrada

## 🐛 Solución de Problemas

### Error: "useAuth debe ser usado dentro de un AuthProvider"
```typescript
// Asegúrate de que el componente esté envuelto en AuthProvider
<AuthProvider>
  <MyComponent />
</AuthProvider>
```

### Error: "Credenciales inválidas"
- Verificar que el backend esté corriendo
- Confirmar que los datos de prueba estén en la base de datos
- Revisar logs del backend para más detalles

### Error: "El email ya está registrado"
- Usar un email diferente para registro
- Verificar que el email no esté en uso

### Problema: No se mantiene la sesión
- Verificar que localStorage esté habilitado
- Revisar si hay errores de JavaScript en la consola

## 📚 Recursos Adicionales

- **Documentación API**: http://localhost:3000/api/docs
- **Logs del Backend**: Terminal donde ejecutas `npm run start:dev`
- **Logs del Frontend**: F12 → Console en el navegador
- **Estado de Autenticación**: React DevTools → Context
