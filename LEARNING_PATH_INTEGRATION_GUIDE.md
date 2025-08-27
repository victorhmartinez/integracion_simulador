# 📚 Guía de Integración - Learning Path con Backend

## 🎯 **Objetivo**
Integrar el sistema de Learning Path del frontend con los datos reales de la base de datos del backend, específicamente con las tablas `Aprendizaje` y `Modulos`.

## 🏗️ **Arquitectura Implementada**

### **Backend (NestJS + Prisma)**

#### **1. Entidades de Dominio**
- `Aprendizaje`: Representa una ruta de aprendizaje
- `Modulo`: Representa un módulo individual dentro de un aprendizaje

#### **2. Servicios**
- `AprendizajeService`: Maneja la lógica de negocio para aprendizajes y módulos
- Incluye métodos para obtener módulos con progreso por negocio

#### **3. Controladores**
- `AprendizajeController`: Endpoints para aprendizajes
- `ModuloController`: Endpoints para módulos individuales

#### **4. Endpoints Disponibles**
```
GET /api/v1/aprendizaje                    # Obtener todos los aprendizajes
GET /api/v1/aprendizaje/:id                # Obtener aprendizaje por ID
GET /api/v1/aprendizaje/:id/modulos        # Obtener módulos de un aprendizaje
GET /api/v1/aprendizaje/:id/modulos/:negocioId/progreso  # Módulos con progreso
GET /api/v1/modulos/:id                    # Obtener módulo individual
```

### **Frontend (React + TypeScript)**

#### **1. Repositorios API**
- `LearningPathRepositoryApi`: Conecta con el backend para obtener módulos
- `ModuleRepositoryApi`: Conecta con el backend para obtener contenido de módulos

#### **2. Entidades de Dominio**
- `Module`: Representa un módulo en el frontend
- `ModuleContent`: Representa el contenido detallado de un módulo

## 🔄 **Flujo de Datos**

### **1. Carga del Learning Path**
```
Frontend → LearningPathRepositoryApi → Backend → Base de Datos
```

1. El usuario accede a `/businesses/:businessId/learning-path`
2. `LearningPathPage` usa `LearningPathRepositoryApi`
3. Se obtiene primero el ID del aprendizaje disponible (`/aprendizaje`)
4. Se hace petición a `/aprendizaje/{idAprendizaje}/modulos/{businessId}/progreso`
5. El backend consulta las tablas `Modulos` y `NegocioProgresoPaso`
6. Se determina el estado de cada módulo (LOCKED, IN_PROGRESS, COMPLETED)
7. Se retornan los módulos con su estado

### **2. Carga de Contenido de Módulo**
```
Frontend → ModuleRepositoryApi → Backend → Base de Datos
```

1. El usuario hace clic en un módulo
2. `ModuleContentPage` usa `ModuleRepositoryApi`
3. Se hace petición a `/modulos/:id`
4. El backend consulta la tabla `Modulos`
5. Se retorna el contenido del módulo

## 📊 **Estructura de Datos**

### **Tabla Aprendizaje**
```sql
CREATE TABLE "Aprendizaje" (
  id_aprendizaje INT PRIMARY KEY,
  nombre VARCHAR(100),
  total_niveles INT
);
```

### **Tabla Modulos**
```sql
CREATE TABLE "Modulos" (
  id_modulo INT PRIMARY KEY,
  id_aprendizaje INT,
  orden_modulo INT,
  nombre_modulo VARCHAR(150),
  titulo_conteido VARCHAR(255),
  concepto TEXT,
  recurso_interactivo VARCHAR(255)
);
```

### **Tabla NegocioProgresoPaso**
```sql
CREATE TABLE "NegocioProgresoPaso" (
  id INT PRIMARY KEY,
  negocio_id INT,
  modulo_id INT,
  id_estado INT,
  fecha_inicio TIMESTAMP,
  fecha_completado TIMESTAMP
);
```

## 🔐 **Estados de Módulos**

### **Lógica de Estados**
- **LOCKED**: Módulo bloqueado (no se puede acceder)
- **IN_PROGRESS**: Módulo disponible para trabajar
- **COMPLETED**: Módulo completado

### **Reglas de Desbloqueo**
1. El primer módulo (orden_modulo = 1) siempre está disponible
2. Los módulos siguientes se desbloquean al completar el anterior
3. El estado se determina consultando `NegocioProgresoPaso`

## 🚀 **Configuración y Uso**

### **1. Ejecutar el Backend**
```bash
cd Backend
npm run start:dev
```

### **2. Ejecutar el Frontend**
```bash
cd Frontend
npm run dev
```

### **3. Ejecutar el Seed (si es necesario)**
```bash
cd Backend
npm run seed
```

### **4. Acceder a la Aplicación**
1. Ir a `http://localhost:5173`
2. Iniciar sesión con `maria@ejemplo.com` / `123456`
3. Seleccionar un negocio
4. Ir a "Learning Path"

## 📋 **Datos de Prueba Incluidos**

### **Aprendizaje Creado**
- **Nombre**: "Fundamentos de Gestión de Costos"
- **Total Niveles**: 5

### **Módulos Creados**
1. **Introducción a la Gestión de Costos**
2. **Clasificación de Costos**
3. **Análisis de Punto de Equilibrio**
4. **Presupuesto de Costos**
5. **Control y Análisis de Desviaciones**

### **Progreso de Negocios**
- Cada negocio tiene progreso en los primeros 3 módulos
- El primer módulo está "En Progreso"
- Los módulos 2 y 3 están "Completados"

## 🔧 **Personalización**

### **Agregar Nuevos Módulos**
1. Modificar el archivo `Backend/prisma/seed.ts`
2. Agregar nuevos módulos en la sección de creación
3. Ejecutar `npm run seed`

### **Modificar Estados**
1. Editar la lógica en `AprendizajeService.getModulosWithProgress()`
2. Ajustar las reglas de desbloqueo según necesidades

### **Agregar Nuevos Aprendizajes**
1. Crear nuevos registros en la tabla `Aprendizaje`
2. Crear módulos asociados en la tabla `Modulos`
3. Actualizar el frontend para manejar múltiples aprendizajes

## 🐛 **Solución de Problemas**

### **Error: "No se pudieron cargar los módulos"**
1. Verificar que el backend esté corriendo
2. Verificar que la base de datos tenga datos
3. Ejecutar `npm run seed` si es necesario

### **Error: "Módulos no encontrados"**
1. Verificar que existan registros en las tablas `Aprendizaje` y `Modulos`
2. Verificar que el `aprendizajeId` sea correcto

### **Error: "Progreso no encontrado"**
1. Verificar que existan registros en `NegocioProgresoPaso`
2. Verificar que el `negocioId` sea correcto

## 📈 **Próximos Pasos**

### **Funcionalidades Futuras**
1. **Sistema de Progreso**: Actualizar progreso al completar módulos
2. **Certificados**: Generar certificados al completar aprendizajes
3. **Múltiples Aprendizajes**: Soporte para diferentes rutas de aprendizaje
4. **Gamificación**: Puntos, badges y logros
5. **Analytics**: Seguimiento del progreso y rendimiento

### **Mejoras Técnicas**
1. **Caché**: Implementar caché para mejorar rendimiento
2. **Paginación**: Para listas grandes de módulos
3. **Búsqueda**: Búsqueda y filtros en módulos
4. **Offline**: Soporte para uso offline

## 🔧 **Mejoras Implementadas**

### **1. Obtención Dinámica del ID de Aprendizaje**
- ✅ El frontend ahora obtiene automáticamente el ID del aprendizaje disponible
- ✅ No depende de IDs hardcodeados
- ✅ Funciona con cualquier aprendizaje en la base de datos

### **2. Uso Correcto del Business ID**
- ✅ El `businessId` de la URL se usa como `negocioId` para obtener el progreso
- ✅ Cada negocio tiene su propio progreso en los módulos
- ✅ Los estados se calculan correctamente por negocio

### **3. Manejo de Errores Mejorado**
- ✅ Fallback automático si no hay progreso disponible
- ✅ Logs detallados para debugging
- ✅ Mensajes de error más descriptivos

## ✅ **Verificación de Integración**

### **Checklist de Pruebas**
- [ ] Backend corriendo en puerto 3000
- [ ] Frontend corriendo en puerto 5173
- [ ] Base de datos con datos de prueba
- [ ] Learning Path carga módulos correctamente
- [ ] Primer módulo está desbloqueado
- [ ] Módulos posteriores están bloqueados
- [ ] Contenido de módulos se carga correctamente
- [ ] Navegación entre módulos funciona
- [ ] Progreso se calcula correctamente por negocio

### **Comandos de Verificación**
```bash
# Verificar aprendizajes disponibles
curl http://localhost:3000/api/v1/aprendizaje

# Verificar módulos de un aprendizaje
curl http://localhost:3000/api/v1/aprendizaje/1/modulos

# Verificar módulos con progreso de un negocio específico
curl http://localhost:3000/api/v1/aprendizaje/1/modulos/1/progreso

# Verificar contenido de un módulo específico
curl http://localhost:3000/api/v1/modulos/1
```
