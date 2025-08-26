# Conexión Frontend-Backend

## Configuración de la Conexión

### 1. Variables de Entorno

Crea un archivo `.env` en el directorio `Frontend/` con la siguiente configuración:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

### 2. Iniciar el Backend

```bash
cd Backend
npm install
npm run start:dev
```

El backend estará disponible en: `http://localhost:3000`

### 3. Iniciar el Frontend

```bash
cd Frontend
npm install
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## Estructura de la Conexión

### Cliente HTTP
- **Archivo**: `src/shared/infrastructure/http/api-client.ts`
- **Función**: Maneja todas las peticiones HTTP al backend
- **Configuración**: Usa variables de entorno para la URL base

### Repositorio API
- **Archivo**: `src/core/businesses/infrastructure/adapters/BusinessRepositoryApi.ts`
- **Función**: Implementa la interfaz del repositorio conectándose al backend
- **Mapeo**: Convierte entre entidades del frontend y backend

### Manejo de Estados
- **Hook**: `src/shared/infrastructure/hooks/useApiState.ts`
- **Función**: Maneja estados de carga, error y datos
- **Uso**: Simplifica el manejo de peticiones API en componentes

## Endpoints del Backend

### Negocios
- `GET /api/v1/negocios` - Obtener todos los negocios
- `POST /api/v1/negocios` - Crear un nuevo negocio
- `GET /api/v1/negocios/:id` - Obtener negocio por ID
- `GET /api/v1/negocios/usuario/:usuarioId` - Obtener negocios por usuario
- `PUT /api/v1/negocios/:id` - Actualizar negocio
- `DELETE /api/v1/negocios/:id` - Eliminar negocio

## Configuración CORS

El backend está configurado para permitir peticiones desde:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Backend)
- `http://127.0.0.1:5173` (Vite dev server alternativo)

## Solución de Problemas

### Error de CORS
Si ves errores de CORS, verifica que:
1. El backend esté ejecutándose en el puerto 3000
2. El frontend esté ejecutándose en el puerto 5173
3. La URL en `.env` sea correcta

### Error de Conexión
Si no se puede conectar al backend:
1. Verifica que el backend esté ejecutándose
2. Revisa los logs del backend para errores
3. Verifica que la base de datos esté configurada correctamente

### Error de Mapeo de Datos
Si hay problemas con el mapeo de datos:
1. Verifica que las interfaces coincidan entre frontend y backend
2. Revisa la consola del navegador para errores
3. Verifica que el backend devuelva los datos en el formato esperado

## Próximos Pasos

1. **Autenticación**: Implementar sistema de login/logout
2. **Validación**: Agregar validación de formularios
3. **Cache**: Implementar cache de datos
4. **Optimización**: Agregar paginación y filtros
5. **Testing**: Agregar tests unitarios y de integración
