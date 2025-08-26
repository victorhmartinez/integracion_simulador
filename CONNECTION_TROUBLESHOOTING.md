# Guía de Solución de Problemas de Conexión - Error 404

## 🚨 Error: "Failed to load resource: the server responded with a status of 404 (Not Found)"

### Problema
El frontend no puede conectarse al backend, recibiendo errores 404.

### 🔍 **Diagnóstico Rápido**

#### **Paso 1: Verificar que el Backend esté Corriendo**
```bash
# Verificar si el puerto 3000 está en uso
netstat -an | grep :3000

# O usar curl para probar
curl http://localhost:3000/api/v1
```

#### **Paso 2: Verificar URLs Configuradas**
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **API Base**: http://localhost:3000/api/v1

### 🔧 **Soluciones por Tipo de Error**

#### **Error 1: Backend No Está Corriendo**
```
❌ Backend NO está corriendo en http://localhost:3000
```

**Solución:**
```bash
# 1. Navegar al directorio del backend
cd Backend

# 2. Verificar que las dependencias estén instaladas
npm install

# 3. Verificar que la base de datos esté corriendo
docker-compose up -d

# 4. Ejecutar migraciones
npx prisma migrate deploy

# 5. Iniciar el backend
npm run start:dev
```

#### **Error 2: Configuración de Variables de Entorno**
```
❌ Archivo .env no existe
```

**Solución:**
```bash
# Linux/Mac
cd Frontend
chmod +x scripts/setup-env.sh
./scripts/setup-env.sh

# Windows
cd Frontend
scripts\setup-env.bat
```

#### **Error 3: CORS No Configurado**
```
❌ CORS no configurado correctamente
```

**Solución:**
El CORS ya está configurado en `Backend/src/main.ts`. Si persiste el problema:

1. **Reiniciar el backend** después de cambios
2. **Verificar que el frontend use el puerto correcto** (5173)
3. **Limpiar cache del navegador**

#### **Error 4: Base de Datos No Conectada**
```
❌ Error de conexión a la base de datos
```

**Solución:**
```bash
# 1. Verificar que PostgreSQL esté corriendo
docker ps

# 2. Si no está corriendo, iniciarlo
docker-compose up -d

# 3. Verificar la conexión
cd Backend
npx prisma db push
```

### 🛠️ **Scripts de Verificación**

#### **Script de Verificación Completa**
```bash
# Linux/Mac
cd Frontend
chmod +x scripts/check-connection.sh
./scripts/check-connection.sh

# Windows
cd Frontend
scripts\check-connection.bat
```

#### **Script de Configuración de Entorno**
```bash
# Linux/Mac
cd Frontend
./scripts/setup-env.sh

# Windows
cd Frontend
scripts\setup-env.bat
```

### 🔄 **Proceso de Solución Completa**

#### **Paso 1: Verificar Backend**
```bash
cd Backend

# Verificar dependencias
npm install

# Verificar base de datos
docker-compose up -d

# Ejecutar migraciones
npx prisma migrate deploy

# Iniciar backend
npm run start:dev
```

#### **Paso 2: Verificar Frontend**
```bash
cd Frontend

# Configurar variables de entorno
./scripts/setup-env.sh

# Verificar conexión
./scripts/check-connection.sh

# Iniciar frontend
npm run dev
```

#### **Paso 3: Verificar en Navegador**
1. **Abrir**: http://localhost:5173
2. **Abrir DevTools** (F12)
3. **Ir a pestaña Network**
4. **Recargar página** (Ctrl+Shift+R)
5. **Verificar que no hay errores 404**

### 🧪 **Testing Manual**

#### **Probar Backend Directamente**
```bash
# Probar endpoint base
curl http://localhost:3000/api/v1

# Probar endpoint de usuarios
curl http://localhost:3000/api/v1/usuarios

# Probar documentación
curl http://localhost:3000/api/docs
```

#### **Probar Frontend**
1. **Abrir**: http://localhost:5173/login
2. **Usar datos de prueba**:
   - Email: `maria@ejemplo.com`
   - Contraseña: `123456`
3. **Verificar logs en consola**

### 🐛 **Debugging Avanzado**

#### **Verificar Logs del Backend**
```bash
cd Backend
npm run start:dev
# Buscar mensajes de error en la consola
```

#### **Verificar Logs del Frontend**
1. **Abrir DevTools** (F12)
2. **Ir a pestaña Console**
3. **Buscar errores de red** o JavaScript

#### **Verificar Network Tab**
1. **Abrir DevTools** (F12)
2. **Ir a pestaña Network**
3. **Recargar página**
4. **Buscar peticiones fallidas** (rojas)

### 📋 **Checklist de Verificación**

- [ ] **Backend corriendo** en puerto 3000
- [ ] **Base de datos** PostgreSQL corriendo
- [ ] **Migraciones ejecutadas** correctamente
- [ ] **Archivo .env** del frontend configurado
- [ ] **CORS configurado** para localhost:5173
- [ ] **Frontend corriendo** en puerto 5173
- [ ] **Sin errores** en consola del navegador
- [ ] **Peticiones API** responden correctamente

### 🚨 **Problemas Comunes**

#### **Puerto 3000 Ocupado**
```bash
# Verificar qué está usando el puerto
lsof -i :3000

# Matar proceso si es necesario
kill -9 <PID>
```

#### **Puerto 5173 Ocupado**
```bash
# Verificar qué está usando el puerto
lsof -i :5173

# Matar proceso si es necesario
kill -9 <PID>
```

#### **Base de Datos No Inicializada**
```bash
cd Backend

# Ejecutar seed
npm run seed

# O manualmente
npx prisma db push
npx ts-node prisma/seed.ts
```

### 📞 **Si el Problema Persiste**

1. **Verificar versiones**:
   ```bash
   node --version
   npm --version
   docker --version
   ```

2. **Verificar logs completos**:
   ```bash
   # Backend
   cd Backend && npm run start:dev
   
   # Frontend
   cd Frontend && npm run dev
   ```

3. **Verificar archivos de configuración**:
   - `Backend/.env`
   - `Frontend/.env`
   - `Backend/src/main.ts`
   - `Frontend/src/config/environment.ts`

### 🎯 **Prevención**

1. **Siempre verificar** que el backend esté corriendo antes de usar el frontend
2. **Usar los scripts** proporcionados para configuración
3. **Verificar logs** regularmente
4. **Mantener actualizadas** las dependencias

### 📚 **Recursos Adicionales**

- **Documentación NestJS**: https://docs.nestjs.com/
- **Documentación Vite**: https://vitejs.dev/
- **Documentación Prisma**: https://www.prisma.io/docs/
- **Herramientas de Desarrollo**: React DevTools, Network Tab
