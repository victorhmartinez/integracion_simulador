# Guía de Usuarios y Datos de Prueba

## 🎯 Propósito
Este documento explica cómo configurar y usar el sistema de usuarios y datos de prueba en el proyecto.

## 👥 Sistema de Usuarios

### Funcionalidades Implementadas

#### 1. Registro de Usuarios
- **Endpoint**: `POST /api/v1/usuarios/registro`
- **Datos requeridos**:
  - `nombreCompleto`: Nombre completo del usuario
  - `email`: Email único del usuario
  - `password`: Contraseña (mínimo 6 caracteres)

#### 2. Login de Usuarios
- **Endpoint**: `POST /api/v1/usuarios/login`
- **Datos requeridos**:
  - `email`: Email del usuario
  - `password`: Contraseña del usuario

#### 3. Consulta de Usuarios
- **Obtener todos**: `GET /api/v1/usuarios`
- **Obtener por ID**: `GET /api/v1/usuarios/:id`

### Seguridad
- ✅ Contraseñas hasheadas con bcrypt
- ✅ Validación de email único
- ✅ Validación de datos de entrada
- ✅ Manejo de errores específicos

## 🌱 Datos de Prueba

### Script de Seed
El proyecto incluye un script completo que crea datos de prueba para todas las tablas.

### Datos Creados

#### 1. Usuarios de Prueba
```
📧 Email                    | 🔑 Contraseña | 👤 Nombre
maria@ejemplo.com          | 123456        | María González
carlos@ejemplo.com         | 123456        | Carlos Rodríguez
ana@ejemplo.com            | 123456        | Ana Martínez
```

#### 2. Tamaños de Negocio
- Microempresa (1-10 empleados)
- Pequeña empresa (11-50 empleados)
- Mediana empresa (51-200 empleados)
- Gran empresa (200+ empleados)

#### 3. Estados de Progreso
- Pendiente
- En Progreso
- Completado
- Pausado

#### 4. Ruta de Aprendizaje
**"Fundamentos de Gestión de Costos"** con 5 módulos:
1. Introducción a la Gestión de Costos
2. Clasificación de Costos
3. Análisis de Punto de Equilibrio
4. Presupuesto de Costos
5. Control y Análisis de Desviaciones

#### 5. Negocios de Ejemplo
```
🏢 Negocio              | 👤 Usuario        | 📍 Ubicación
La Buena Mesa          | María González    | Quito - Centro Histórico
El Rincón del Café     | María González    | Quito - La Mariscal
Modas Elegantes        | Carlos Rodríguez  | Guayaquil - Centro Comercial
El Tornillo Feliz      | Ana Martínez      | Cuenca - Centro
Farmacia del Pueblo    | Ana Martínez      | Manta - Malecón
```

#### 6. Datos Relacionados
- ✅ Progreso en módulos para cada negocio
- ✅ Registros financieros de ejemplo
- ✅ Análisis de IA con resultados completos
- ✅ Costos analizados y omitidos
- ✅ Planes de acción
- ✅ Riesgos detectados

## 🚀 Cómo Ejecutar

### Opción 1: Script Automático (Recomendado)

#### Linux/Mac
```bash
cd Backend
chmod +x scripts/run-seed.sh
./scripts/run-seed.sh
```

#### Windows
```cmd
cd Backend
scripts\run-seed.bat
```

### Opción 2: Manual
```bash
cd Backend

# Instalar dependencias
npm install

# Instalar bcrypt si no está
npm install bcrypt @types/bcrypt

# Ejecutar migraciones
npx prisma migrate deploy

# Ejecutar seed
npm run seed
```

## 🔧 Configuración de Base de Datos

### Variables de Entorno
Crear archivo `Backend/.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/simulador_db?schema=public"
PORT=3000
```

### Iniciar PostgreSQL
```bash
# Con Docker
docker-compose up -d

# O con PostgreSQL local
# Asegúrate de tener PostgreSQL instalado y corriendo
```

## 📊 Estructura de Datos

### Relaciones Principales
```
Usuarios (1) ←→ (N) Negocios
Negocios (1) ←→ (N) NegocioProgresoPaso
Negocios (1) ←→ (N) Analisis_IA
Analisis_IA (1) ←→ (N) Resultados_*
```

### Flujo de Datos
1. **Usuario se registra** → Se crea en tabla `Usuarios`
2. **Usuario crea negocio** → Se crea en tabla `Negocios`
3. **Usuario progresa en módulos** → Se crean registros en `NegocioProgresoPaso`
4. **Sistema analiza negocio** → Se crea `Analisis_IA` con resultados

## 🧪 Testing de la API

### Registro de Usuario
```bash
curl -X POST http://localhost:3000/api/v1/usuarios/registro \
  -H "Content-Type: application/json" \
  -d '{
    "nombreCompleto": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "password": "123456"
  }'
```

### Login de Usuario
```bash
curl -X POST http://localhost:3000/api/v1/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@ejemplo.com",
    "password": "123456"
  }'
```

### Obtener Negocios
```bash
curl http://localhost:3000/api/v1/negocios
```

## 🔍 Monitoreo con Logs

Todos los endpoints incluyen logs detallados:
- 🚀 Peticiones entrantes
- 💾 Operaciones de base de datos
- 🔄 Mapeo de datos
- ✅ Respuestas exitosas
- 💥 Errores y excepciones

## 🎯 Próximos Pasos

1. **Autenticación JWT**: Implementar tokens JWT para sesiones
2. **Autorización**: Control de acceso basado en roles
3. **Validación Avanzada**: Validación más robusta de datos
4. **Recuperación de Contraseña**: Sistema de reset de contraseñas
5. **Perfiles de Usuario**: Información adicional del usuario
6. **Notificaciones**: Sistema de notificaciones por email

## 🐛 Solución de Problemas

### Error de Conexión a Base de Datos
```bash
# Verificar que PostgreSQL esté corriendo
docker ps

# Verificar variables de entorno
cat Backend/.env

# Recrear base de datos
npx prisma migrate reset
```

### Error de Dependencias
```bash
# Limpiar e instalar
rm -rf node_modules package-lock.json
npm install
```

### Error de Seed
```bash
# Verificar que bcrypt esté instalado
npm list bcrypt

# Reinstalar si es necesario
npm install bcrypt @types/bcrypt
```

## 📚 Recursos Adicionales

- **Documentación API**: http://localhost:3000/api/docs
- **Prisma Studio**: `npx prisma studio`
- **Logs del Backend**: Terminal donde ejecutas `npm run start:dev`
- **Logs del Frontend**: F12 → Console en el navegador
