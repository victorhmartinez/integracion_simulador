# 🔧 Guía de Solución de Problemas - Creación de Negocios

## ❌ Error: "Datos inválidos. Verifica que todos los campos estén completos."

### 🔍 Pasos de Diagnóstico

#### 1. **Verificar la Base de Datos**
```bash
cd Backend
node test-business-creation.js
```

Este script verificará:
- ✅ Que existan usuarios en la base de datos
- ✅ Que existan tamaños de negocio
- ✅ Que se pueda crear un negocio de prueba

#### 2. **Verificar el Backend**
```bash
cd Backend
npm run start:dev
```

Asegúrate de que:
- ✅ El servidor esté corriendo en el puerto 3000
- ✅ No haya errores en la consola
- ✅ La base de datos esté conectada

#### 3. **Verificar el Frontend**
```bash
cd Frontend
npm run dev
```

Asegúrate de que:
- ✅ El servidor esté corriendo en el puerto 5173
- ✅ No haya errores en la consola del navegador

#### 4. **Verificar la Autenticación**
- ✅ Debes estar logueado para crear un negocio
- ✅ El usuario debe existir en la base de datos
- ✅ El `usuarioId` debe ser válido

### 🐛 Problemas Comunes y Soluciones

#### **Problema 1: No hay usuarios en la base de datos**
```bash
cd Backend
npm run seed
```

#### **Problema 2: No hay tamaños de negocio**
Verifica que el seed incluya tamaños de negocio o agrégalos manualmente.

#### **Problema 3: Error de validación en el backend**
Los campos requeridos son:
- `usuarioId` (número)
- `tipoNegocio` (string, máximo 100 caracteres)
- `nombreNegocio` (string, máximo 200 caracteres)
- `ubicacion` (string)
- `idTamano` (número)

#### **Problema 4: Error de conexión a la base de datos**
Verifica el archivo `.env` del backend:
```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/nombre_db"
```

### 🔧 Soluciones Implementadas

#### **1. Validación Mejorada en el Frontend**
- ✅ Validación de campos requeridos antes de enviar
- ✅ Conversión explícita de `sizeId` a número
- ✅ Mensajes de error más específicos

#### **2. Logging Mejorado**
- ✅ Logs detallados en el frontend
- ✅ Logs detallados en el backend
- ✅ Verificación de tipos de datos

#### **3. Manejo de Errores Específicos**
- ✅ Errores de Prisma (P2002, P2003, P2025)
- ✅ Errores de validación
- ✅ Errores de conexión

### 📋 Checklist de Verificación

- [ ] Backend corriendo en puerto 3000
- [ ] Frontend corriendo en puerto 5173
- [ ] Base de datos PostgreSQL conectada
- [ ] Usuarios en la base de datos
- [ ] Tamaños de negocio en la base de datos
- [ ] Usuario autenticado en el frontend
- [ ] Todos los campos del formulario completos
- [ ] `sizeId` es un número válido

### 🚀 Comandos de Prueba

```bash
# Probar la base de datos
cd Backend && node test-business-creation.js

# Reiniciar el backend
cd Backend && npm run start:dev

# Reiniciar el frontend
cd Frontend && npm run dev

# Ejecutar seed si es necesario
cd Backend && npm run seed
```

### 📞 Si el problema persiste

1. Revisa los logs en la consola del navegador
2. Revisa los logs del backend
3. Ejecuta el script de prueba de la base de datos
4. Verifica que todos los servicios estén corriendo
5. Comprueba la conectividad de la base de datos
