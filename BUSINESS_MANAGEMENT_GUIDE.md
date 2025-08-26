# Guía de Gestión de Negocios

## 🏢 **Funcionalidad Completa de Negocios**

### **Descripción**
El sistema permite a los usuarios autenticados crear, gestionar y visualizar sus negocios registrados.

### **Flujo de Usuario**

#### **1. Inicio de Sesión**
```
📧 Email: maria@ejemplo.com
🔑 Contraseña: 123456
```

#### **2. Acceso a Mis Negocios**
- Después del login, el usuario es redirigido a `/businesses`
- Se muestra la lista de negocios del usuario autenticado
- Si no hay negocios, se muestra un mensaje informativo

#### **3. Agregar Nuevo Negocio**
- **Botón**: "Añadir Negocio" en la parte inferior derecha
- **Ruta**: `/businesses/new`
- **Formulario incluye**:
  - Nombre del negocio
  - Tipo de negocio (texto libre)
  - Ubicación
  - Icono representativo (selector visual)
  - Color del tema (selector visual)

#### **4. Guardar y Verificar**
- Al guardar, el negocio se crea en la base de datos
- El usuario es redirigido automáticamente a la lista
- El nuevo negocio aparece en la lista con sus datos

### **Componentes del Sistema**

#### **Frontend**
- **`BusinessesPage`**: Página principal que muestra la lista
- **`BusinessForm`**: Formulario para crear/editar negocios
- **`BusinessList`**: Componente que renderiza la lista
- **`BusinessCard`**: Tarjeta individual de cada negocio
- **`GetBusinessesByUser`**: Caso de uso para obtener negocios por usuario

#### **Backend**
- **`BusinessController`**: Endpoints REST para gestión de negocios
- **`BusinessService`**: Lógica de negocio
- **`BusinessMapper`**: Mapeo entre entidades y DTOs
- **Base de datos**: Tabla `Negocios` con relación a `Usuarios`

### **Endpoints de la API**

#### **Crear Negocio**
```http
POST /api/v1/negocios
Content-Type: application/json

{
  "usuarioId": 1,
  "tipoNegocio": "Restaurante",
  "nombreNegocio": "Mi Restaurante",
  "ubicacion": "Centro Comercial",
  "idTamano": 1
}
```

#### **Obtener Negocios del Usuario**
```http
GET /api/v1/negocios/usuario/{usuarioId}
```

#### **Obtener Todos los Negocios**
```http
GET /api/v1/negocios
```

#### **Obtener Negocio por ID**
```http
GET /api/v1/negocios/{id}
```

### **Estructura de Datos**

#### **Frontend (Business Entity)**
```typescript
interface Business {
  id: number;
  userId: number;
  businessType: string;
  name: string;
  location: string;
  sizeId: number;
  createdAt: Date | null;
  icon: string;
  color: string;
  progress: number;
  completedModules: number;
  totalModules: number;
}
```

#### **Backend (Negocio Entity)**
```typescript
interface Negocio {
  negocioId: number;
  usuarioId: number;
  tipoNegocio: string;
  nombreNegocio: string;
  ubicacion: string;
  idTamano: number;
  fechaCreacion: string;
}
```

### **Mapeo de Datos**

#### **Frontend → Backend**
- `name` → `nombreNegocio`
- `businessType` → `tipoNegocio`
- `location` → `ubicacion`
- `sizeId` → `idTamano`
- `userId` → `usuarioId`

#### **Backend → Frontend**
- `nombreNegocio` → `name`
- `tipoNegocio` → `businessType`
- `ubicacion` → `location`
- `idTamano` → `sizeId`
- `usuarioId` → `userId`
- `fechaCreacion` → `createdAt`

### **Características Adicionales**

#### **Iconos Automáticos**
El sistema asigna automáticamente iconos basados en el tipo de negocio:
- Restaurante: `fas fa-utensils`
- Cafetería: `fas fa-coffee`
- Tienda: `fas fa-store`
- Herramientas: `fas fa-tools`
- Salud: `fas fa-heartbeat`
- etc.

#### **Colores Automáticos**
Se asignan colores de tema automáticamente:
- Restaurante: `primary-500`
- Cafetería: `accent-500`
- Tienda: `secondary-500`
- etc.

#### **Progreso de Aprendizaje**
Cada negocio muestra:
- Progreso general (%)
- Módulos completados vs total
- Barra de progreso visual

### **Seguridad y Autenticación**

#### **Protección de Rutas**
- Todas las rutas de negocios están protegidas con `ProtectedRoute`
- Requiere autenticación previa
- Redirige a `/login` si no está autenticado

#### **Filtrado por Usuario**
- Los usuarios solo ven sus propios negocios
- El backend filtra por `usuarioId`
- No hay acceso cruzado entre usuarios

### **Logging y Debugging**

#### **Logs del Frontend**
```
🔧 [FRONTEND] Creando negocio: {...}
✅ [FRONTEND] Negocio creado exitosamente
🔍 [FRONTEND] Buscando negocios del usuario ID: 1
```

#### **Logs del Backend**
```
🏢 [BACKEND] POST /negocios - Creando negocio con datos: {...}
✅ [BACKEND] Negocio creado exitosamente
👤 [BACKEND] GET /negocios/usuario/1 - Buscando negocios del usuario
```

### **Testing y Verificación**

#### **Script de Prueba**
```bash
cd Frontend
chmod +x scripts/test-business-flow.sh
./scripts/test-business-flow.sh
```

#### **Verificación Manual**
1. **Login**: http://localhost:5173/login
2. **Lista de Negocios**: http://localhost:5173/businesses
3. **Formulario**: http://localhost:5173/businesses/new
4. **API Docs**: http://localhost:3000/api/docs

### **Troubleshooting**

#### **Problema: No se crean negocios**
- Verificar que el backend esté corriendo
- Verificar logs en consola del navegador
- Verificar logs del backend

#### **Problema: No aparecen negocios en la lista**
- Verificar que el usuario esté autenticado
- Verificar que el endpoint `/negocios/usuario/{id}` funcione
- Verificar logs de la API

#### **Problema: Error 404 al crear negocio**
- Verificar que el endpoint POST `/negocios` esté disponible
- Verificar que CORS esté configurado correctamente
- Verificar que las variables de entorno estén configuradas

### **Próximas Mejoras**

#### **Funcionalidades Pendientes**
- [ ] Edición de negocios existentes
- [ ] Eliminación de negocios
- [ ] Filtros y búsqueda
- [ ] Paginación para muchos negocios
- [ ] Imágenes de negocios
- [ ] Categorías predefinidas

#### **Mejoras de UX**
- [ ] Confirmación antes de guardar
- [ ] Validación en tiempo real
- [ ] Autoguardado de borradores
- [ ] Vista previa del negocio
- [ ] Drag & drop para iconos

### **Comandos Útiles**

#### **Iniciar Sistema Completo**
```bash
# Terminal 1: Backend
cd Backend
npm run start:dev

# Terminal 2: Frontend
cd Frontend
npm run dev

# Terminal 3: Base de datos (si no está corriendo)
cd Backend
docker-compose up -d
```

#### **Verificar Estado**
```bash
# Verificar backend
curl http://localhost:3000/api/v1/negocios

# Verificar frontend
curl http://localhost:5173

# Verificar base de datos
docker ps
```

### **Recursos Adicionales**

- **Documentación API**: http://localhost:3000/api/docs
- **Base de datos**: PostgreSQL en Docker
- **Frontend**: React + TypeScript + Vite
- **Backend**: NestJS + Prisma + PostgreSQL
