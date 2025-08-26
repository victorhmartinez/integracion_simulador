# Guía de Logs - Monitoreo de Peticiones y Respuestas

## 🎯 Propósito
Este documento explica los logs implementados para monitorear la comunicación entre frontend y backend.

## 📍 Ubicación de los Logs

### Frontend (Navegador - F12 → Console)
- **Cliente HTTP**: `Frontend/src/shared/infrastructure/http/api-client.ts`
- **Repositorio API**: `Frontend/src/core/businesses/infrastructure/adapters/BusinessRepositoryApi.ts`
- **Hook de Estados**: `Frontend/src/shared/infrastructure/hooks/useApiState.ts`
- **Página de Negocios**: `Frontend/src/core/businesses/infrastructure/ui/BusinessesPage.tsx`

### Backend (Terminal del servidor)
- **Controladores**: `Backend/src/mvc/controllers/business.controller.ts`
- **Servicios**: `Backend/src/mvc/services/business.service.ts`
- **Mappers**: `Backend/src/mvc/models/mappers/business.mapper.ts`

## 🔍 Tipos de Logs

### 🚀 Peticiones Salientes (Frontend)
```
🚀 [FRONTEND] Petición saliente: {
  method: "GET",
  url: "http://localhost:3000/api/v1/negocios",
  headers: {...},
  body: undefined
}
```

### 📥 Respuestas Recibidas (Frontend)
```
📥 [FRONTEND] Respuesta recibida: {
  status: 200,
  statusText: "OK",
  url: "http://localhost:3000/api/v1/negocios",
  headers: {...}
}
```

### ✅ Datos Procesados (Frontend)
```
✅ [FRONTEND] Datos recibidos: {
  endpoint: "/negocios",
  data: [...],
  timestamp: "2024-01-01T12:00:00.000Z"
}
```

### 🏢 Operaciones de Negocios (Backend)
```
🏢 [BACKEND] POST /negocios - Creando negocio con datos: {...}
✅ [BACKEND] Negocio creado exitosamente: {...}
```

### 💾 Operaciones de Base de Datos (Backend)
```
💾 [BACKEND-SERVICE] Negocio creado en base de datos: {...}
🔄 [BACKEND-SERVICE] Negocio mapeado a dominio: {...}
```

### 🔄 Mapeo de Datos (Backend)
```
🔄 [BACKEND-MAPPER] Mapeando datos de Prisma a dominio: {...}
✅ [BACKEND-MAPPER] Datos mapeados exitosamente: {...}
```

## 🐛 Logs de Error

### ❌ Errores HTTP (Frontend)
```
❌ [FRONTEND] Error HTTP: {
  status: 404,
  statusText: "Not Found",
  url: "http://localhost:3000/api/v1/negocios/999"
}
```

### 💥 Errores de Petición (Frontend)
```
💥 [FRONTEND] Error en petición API: {
  endpoint: "/negocios",
  error: "HTTP error! status: 404",
  timestamp: "2024-01-01T12:00:00.000Z"
}
```

### 💥 Errores de Backend
```
💥 [BACKEND] Error al crear negocio: Error: Validation failed
💥 [BACKEND-SERVICE] Error en base de datos: PrismaClientKnownRequestError
```

## 🔄 Flujo Completo de Logs

### 1. Carga de Negocios
```
[FRONTEND-PAGE] Iniciando carga de negocios...
[FRONTEND-PAGE] Caso de uso creado, ejecutando...
[FRONTEND-HOOK] Iniciando ejecución de función async
[FRONTEND] Solicitando todos los negocios...
[FRONTEND] Petición saliente: { method: "GET", url: "..." }
[BACKEND] GET /negocios - Solicitando todos los negocios
[BACKEND-SERVICE] Consultando todos los negocios en base de datos
[BACKEND-SERVICE] Se encontraron X negocios en base de datos: [...]
[BACKEND-MAPPER] Mapeando datos de Prisma a dominio: {...}
[BACKEND-MAPPER] Datos mapeados exitosamente: {...}
[BACKEND-SERVICE] Negocios mapeados a dominio: [...]
[BACKEND] Se encontraron X negocios: [...]
[FRONTEND] Respuesta recibida: { status: 200, ... }
[FRONTEND] Datos recibidos: { endpoint: "/negocios", data: [...] }
[FRONTEND] Respuesta del backend para obtener negocios: [...]
[FRONTEND] Negocios mapeados: [...]
[FRONTEND-HOOK] Función ejecutada exitosamente: [...]
[FRONTEND-PAGE] Carga de negocios completada: [...]
[FRONTEND-HOOK] Finalizando ejecución, estableciendo loading en false
```

### 2. Creación de Negocio
```
[FRONTEND] Creando negocio con datos: {...}
[FRONTEND] Datos mapeados para API: {...}
[FRONTEND] Petición saliente: { method: "POST", url: "...", body: {...} }
[BACKEND] POST /negocios - Creando negocio con datos: {...}
[BACKEND-SERVICE] Creando negocio en base de datos: {...}
[BACKEND-SERVICE] Negocio creado en base de datos: {...}
[BACKEND-MAPPER] Mapeando datos de Prisma a dominio: {...}
[BACKEND-MAPPER] Datos mapeados exitosamente: {...}
[BACKEND-SERVICE] Negocio mapeado a dominio: {...}
[BACKEND] Negocio creado exitosamente: {...}
[FRONTEND] Respuesta recibida: { status: 201, ... }
[FRONTEND] Datos recibidos: { endpoint: "/negocios", data: {...} }
[FRONTEND] Respuesta del backend para crear negocio: {...}
[FRONTEND] Negocio mapeado y creado: {...}
```

## 🛠️ Cómo Usar los Logs

### 1. Abrir Herramientas de Desarrollo
- **Frontend**: F12 → Console
- **Backend**: Terminal donde ejecutas `npm run start:dev`

### 2. Filtrar Logs
```javascript
// En la consola del navegador, puedes filtrar por tipo:
// Solo peticiones salientes
console.log('🚀')

// Solo respuestas
console.log('📥')

// Solo errores
console.log('💥')

// Solo operaciones de negocio
console.log('🏢')
```

### 3. Buscar Errores Específicos
```javascript
// Buscar errores de CORS
console.log('CORS')

// Buscar errores de mapeo
console.log('MAPPER')

// Buscar errores de base de datos
console.log('DATABASE')
```

## 🔧 Debugging Común

### Error de CORS
```
❌ [FRONTEND] Error HTTP: { status: 0, statusText: "" }
💥 [FRONTEND] Error en petición API: { error: "Failed to fetch" }
```

### Error de Validación
```
💥 [BACKEND] Error al crear negocio: ValidationError
💥 [FRONTEND] Error en petición API: { error: "HTTP error! status: 400" }
```

### Error de Base de Datos
```
💥 [BACKEND-SERVICE] Error en base de datos: PrismaClientKnownRequestError
💥 [BACKEND] Error al crear negocio: Database connection failed
```

## 📊 Monitoreo en Producción

Para producción, considera:
1. **Reducir verbosidad** de los logs
2. **Usar un sistema de logging** como Winston
3. **Implementar métricas** de rendimiento
4. **Configurar alertas** para errores críticos

## 🎯 Próximos Pasos

1. **Logs de Autenticación**: Agregar logs para login/logout
2. **Logs de Rendimiento**: Medir tiempos de respuesta
3. **Logs de Validación**: Detallar errores de validación
4. **Logs de Cache**: Monitorear hit/miss de cache
