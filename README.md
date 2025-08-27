# 🚀 Simulador de Negocios con IA - Proyecto Completo

## 📋 Descripción General

Este es un **simulador de negocios inteligente** que utiliza **Inteligencia Artificial** para analizar costos financieros y generar recomendaciones personalizadas para emprendedores. El proyecto está compuesto por:

- **Backend**: API REST con NestJS + Google Gemini AI
- **Frontend**: Aplicación React con TypeScript y Tailwind CSS
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Infraestructura**: Docker Compose para desarrollo y producción

## 🐳 **DOCKERIZACIÓN COMPLETA - Guía de Inicio Rápido**

### 🎯 **¿Qué está Dockerizado?**

Este proyecto está **completamente containerizado** con Docker Compose, incluyendo:

- **Backend NestJS** → Contenedor con Node.js 18 Alpine
- **Frontend React** → Contenedor con Vite y hot reload
- **PostgreSQL 15** → Base de datos principal
- **pgAdmin 4** → Interfaz web para gestión de BD
- **Redes personalizadas** → Comunicación entre servicios
- **Volúmenes persistentes** → Datos de BD y configuraciones

### 🚀 **Inicio Rápido (5 minutos)**

#### **Paso 1: Verificar Docker**
```bash
# Verificar que Docker esté instalado y corriendo
docker --version
docker-compose --version

# Si no tienes Docker: https://www.docker.com/products/docker-desktop/
```

#### **Paso 2: Clonar y Configurar**
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd integracion_simulador

# Crear archivo de variables de entorno
cp .env.example .env
# Editar .env con tu API key de Google Gemini
```

#### **Paso 3: Levantar Todo**
```bash
# Construir y levantar todos los servicios
docker-compose up -d

# Verificar que todo esté corriendo
docker-compose ps
```

#### **Paso 4: Acceder a los Servicios**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **pgAdmin**: http://localhost:5050 (admin@krakedev.com / admin123)
- **PostgreSQL**: localhost:5432

### 🔧 **Configuración Detallada de Docker**

#### **Archivo docker-compose.yml**
```yaml
version: '3.8'

services:
  # Base de datos PostgreSQL
  postgres:
    image: ${POSTGRES_IMAGE}
    container_name: ${POSTGRES_CONTAINER_NAME}
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "${POSTGRES_PORT}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./Backend/prisma/migrations:/docker-entrypoint-initdb.d
    networks:
      - krakedev_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 30s
      timeout: 10s
      retries: 3

  # pgAdmin para gestión de base de datos
  pgadmin:
    image: ${PGADMIN_IMAGE}
    container_name: ${PGADMIN_CONTAINER_NAME}
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_DEFAULT_EMAIL}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_DEFAULT_PASSWORD}
    ports:
      - "${PGADMIN_PORT}:80"
    volumes:
      - pgadmin_data:/var/lib/pgadmin
    networks:
      - krakedev_network
    depends_on:
      postgres:
        condition: service_healthy

  # Backend NestJS
  backend:
    build:
      context: ./Backend
      dockerfile: Dockerfile
    container_name: ${BACKEND_CONTAINER_NAME}
    restart: unless-stopped
    environment:
      NODE_ENV: production
      DATABASE_URL: ${DATABASE_URL}
      PORT: ${BACKEND_PORT}
      GOOGLE_AI_API_KEY: ${GOOGLE_AI_API_KEY}
      JWT_SECRET: ${JWT_SECRET}
    ports:
      - "${BACKEND_PORT}:3000"
    volumes:
      - ./Backend:/app
      - /app/node_modules
    networks:
      - krakedev_network
    depends_on:
      postgres:
        condition: service_healthy
    command: ./scripts/init.sh

  # Frontend React
  frontend:
    build:
      context: ./Frontend
      dockerfile: Dockerfile
    container_name: ${FRONTEND_CONTAINER_NAME}
    restart: unless-stopped
    environment:
      VITE_API_BASE_URL: ${VITE_API_BASE_URL}
      VITE_APP_TITLE: ${VITE_APP_TITLE}
    ports:
      - "${FRONTEND_PORT}:5173"
    volumes:
      - ./Frontend:/app
      - /app/node_modules
    networks:
      - krakedev_network
    depends_on:
      - backend

volumes:
  postgres_data:
    driver: local
  pgadmin_data:
    driver: local

networks:
  krakedev_network:
    driver: bridge
```

#### **Variables de Entorno (.env)**
```env
# ===== CONFIGURACIÓN GENERAL =====
NODE_ENV=development
TZ=America/Guayaquil

# ===== POSTGRESQL =====
POSTGRES_IMAGE=postgres:15-alpine
POSTGRES_CONTAINER_NAME=krakedev_postgres
POSTGRES_DB=krakedev_db
POSTGRES_USER=krakedev_user
POSTGRES_PASSWORD=krakedev_password
POSTGRES_PORT=5432

# ===== PGADMIN =====
PGADMIN_IMAGE=dpage/pgadmin4:latest
PGADMIN_CONTAINER_NAME=krakedev_pgadmin
PGADMIN_DEFAULT_EMAIL=admin@krakedev.com
PGADMIN_DEFAULT_PASSWORD=admin123
PGADMIN_PORT=5050

# ===== BACKEND =====
BACKEND_CONTAINER_NAME=krakedev_backend
BACKEND_PORT=3000
DATABASE_URL=postgresql://krakedev_user:krakedev_password@postgres:5432/krakedev_db
GOOGLE_AI_API_KEY=tu_api_key_de_google_gemini
JWT_SECRET=tu_jwt_secret_super_seguro_2024
JWT_EXPIRES_IN=24h

# ===== FRONTEND =====
FRONTEND_CONTAINER_NAME=krakedev_frontend
FRONTEND_PORT=5173
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_TITLE=Simulador de Emprendimientos
```

### 🛠️ **Comandos Docker Compose Esenciales**

#### **Gestión de Servicios**
```bash
# Levantar todos los servicios
docker-compose up -d

# Ver estado de los servicios
docker-compose ps

# Ver logs de todos los servicios
docker-compose logs

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Parar todos los servicios
docker-compose down

# Parar y eliminar volúmenes (¡CUIDADO! Borra la BD)
docker-compose down -v
```

#### **Gestión Individual de Servicios**
```bash
# Reiniciar un servicio específico
docker-compose restart backend
docker-compose restart frontend
docker-compose restart postgres

# Reconstruir un servicio
docker-compose build backend
docker-compose build frontend

# Ejecutar comandos dentro de contenedores
docker-compose exec backend npm run seed
docker-compose exec postgres psql -U krakedev_user -d krakedev_db
docker-compose exec frontend npm run build
```

#### **Mantenimiento y Limpieza**
```bash
# Ver uso de recursos
docker stats

# Limpiar contenedores no utilizados
docker system prune

# Limpiar todo (¡CUIDADO!)
docker system prune -a

# Ver volúmenes
docker volume ls

# Eliminar volúmenes específicos
docker volume rm integracion_simulador_postgres_data
```

### 🔍 **Verificación de Funcionamiento**

#### **Verificar Estado de Contenedores**
```bash
docker-compose ps

# Salida esperada:
# Name                    Command               State           Ports
# -----------------------------------------------------------------------------
# krakedev_backend       ./scripts/init.sh                    Up      0.0.0.0:3000->3000/tcp
# krakedev_frontend      npm run dev                          Up      0.0.0.0:5173->5173/tcp
# krakedev_pgadmin       /entrypoint.sh                       Up      0.0.0.0:5050->80/tcp
# krakedev_postgres      docker-entrypoint.sh postgres        Up      0.0.0.0:5432->5432/tcp
```

#### **Verificar Endpoints de Salud**
```bash
# Verificar backend
curl http://localhost:3000/health
# Respuesta: {"status":"ok","timestamp":"2024-01-15T10:30:00.000Z"}

# Verificar frontend
curl http://localhost:5173
# Respuesta: HTML de la aplicación React

# Verificar PostgreSQL
docker-compose exec postgres pg_isready -U krakedev_user -d krakedev_db
# Respuesta: localhost:5432 - accepting connections

# Verificar pgAdmin
curl http://localhost:5050
# Respuesta: HTML de pgAdmin
```

#### **Verificar Logs de Inicialización**
```bash
# Backend - debe mostrar migraciones y seed
docker-compose logs backend | grep -E "(migrate|seed|start)"

# PostgreSQL - debe mostrar inicio exitoso
docker-compose logs postgres | grep -E "(database system is ready|listening)"

# Frontend - debe mostrar servidor de desarrollo
docker-compose logs frontend | grep -E "(Local:|Network:|ready in)"
```

### 🚨 **Solución de Problemas Docker**

#### **Problema 1: Puertos Ocupados**
```bash
# Verificar puertos en uso
netstat -tulpn | grep :3000
netstat -tulpn | grep :5173
netstat -tulpn | grep :5432

# Cambiar puertos en .env si es necesario
# BACKEND_PORT=3001
# FRONTEND_PORT=5174
# POSTGRES_PORT=5433
```

#### **Problema 2: Contenedores No Se Levantan**
```bash
# Verificar espacio en disco
df -h

# Limpiar Docker
docker system prune -a

# Reconstruir todo
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

#### **Problema 3: Base de Datos No Conecta**
```bash
# Verificar que PostgreSQL esté corriendo
docker-compose ps postgres

# Ver logs de PostgreSQL
docker-compose logs postgres

# Reiniciar PostgreSQL
docker-compose restart postgres

# Verificar conectividad
docker-compose exec postgres pg_isready -U krakedev_user -d krakedev_db
```

#### **Problema 4: Error de API Key**
```bash
# Verificar logs del backend
docker-compose logs backend | grep -i "api_key"

# Verificar variable de entorno
docker-compose exec backend env | grep GOOGLE_AI_API_KEY

# Reiniciar backend después de cambiar .env
docker-compose restart backend
```

#### **Problema 5: Frontend No Se Conecta al Backend**
```bash
# Verificar que ambos servicios estén corriendo
docker-compose ps

# Verificar logs del frontend
docker-compose logs frontend

# Verificar logs del backend
docker-compose logs backend

# Verificar conectividad entre contenedores
docker-compose exec frontend ping backend
```

### 📊 **Monitoreo y Debugging**

#### **Comandos de Monitoreo**
```bash
# Ver uso de recursos en tiempo real
docker stats

# Ver logs de todos los servicios
docker-compose logs

# Ver logs de errores específicos
docker-compose logs | grep -i error
docker-compose logs | grep -i fail

# Ver información de red
docker network ls
docker network inspect integracion_simulador_krakedev_network
```

#### **Comandos de Debugging**
```bash
# Entrar a un contenedor para debugging
docker-compose exec backend sh
docker-compose exec frontend sh
docker-compose exec postgres psql -U krakedev_user -d krakedev_db

# Ver archivos dentro de contenedores
docker-compose exec backend ls -la
docker-compose exec frontend ls -la

# Ver variables de entorno
docker-compose exec backend env
docker-compose exec frontend env
```

### 🎯 **Flujo de Desarrollo con Docker**

#### **Desarrollo Diario**
```bash
# Iniciar la aplicación
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Hacer cambios en el código (hot reload automático)

# Reiniciar servicios si es necesario
docker-compose restart backend
docker-compose restart frontend

# Parar al final del día
docker-compose down
```

#### **Despliegue de Cambios**
```bash
# Después de hacer cambios en el código
docker-compose build backend
docker-compose build frontend

# Reiniciar servicios
docker-compose restart backend
docker-compose restart frontend

# O reconstruir todo
docker-compose down
docker-compose up -d --build
```

### 🔒 **Seguridad y Buenas Prácticas**

#### **Variables de Entorno**
- ✅ **Nunca committear** archivos `.env` con credenciales reales
- ✅ **Usar** `.env.example` como plantilla
- ✅ **Rotar** API keys y secrets regularmente
- ✅ **Usar** secrets management en producción

#### **Volúmenes y Datos**
- ✅ **Backup** regular de volúmenes de PostgreSQL
- ✅ **Monitorear** uso de espacio en disco
- ✅ **Limpiar** logs y contenedores no utilizados
- ✅ **Versionar** configuraciones de Docker

#### **Redes y Comunicación**
- ✅ **Usar** redes Docker personalizadas
- ✅ **Limitar** acceso a puertos necesarios
- ✅ **Monitorear** tráfico entre contenedores
- ✅ **Documentar** dependencias entre servicios

### 📈 **Escalabilidad y Producción**

#### **Para Producción**
```bash
# Usar docker-compose.prod.yml
docker-compose -f docker-compose.prod.yml up -d

# Configurar reverse proxy (nginx)
# Configurar SSL/TLS
# Configurar monitoreo (Prometheus/Grafana)
# Configurar logs centralizados
```

#### **Para Testing**
```bash
# Usar docker-compose.test.yml
docker-compose -f docker-compose.test.yml up -d

# Ejecutar tests
docker-compose exec backend npm run test
docker-compose exec frontend npm run test
```

---

**¡Con esta configuración Docker tienes todo lo necesario para desarrollar, probar y desplegar la aplicación de manera consistente y reproducible!**

## 🏗️ Arquitectura del Proyecto

### Estructura Completa

```
integracion_simulador/
├── Backend/                          # API REST con NestJS
│   ├── src/
│   │   ├── app.module.ts            # Módulo principal
│   │   ├── mvc/                     # Arquitectura MVC
│   │   │   ├── controllers/         # Controladores REST
│   │   │   ├── services/            # Lógica de negocio
│   │   │   └── models/              # DTOs, Entidades, Mappers
│   │   ├── shared/                  # Servicios compartidos
│   │   └── simulator/               # Módulos del simulador
│   │       ├── ai/                  # Sistema de IA
│   │       ├── bussiness/           # Gestión de negocios
│   │       ├── learning/            # Sistema de aprendizaje
│   │       └── results_*/           # Módulos de resultados
│   ├── prisma/                      # ORM y migraciones
│   └── Dockerfile                   # Configuración Docker
├── Frontend/                        # Aplicación React
│   ├── src/
│   │   ├── core/                    # Lógica de negocio
│   │   │   ├── auth/                # Autenticación
│   │   │   ├── businesses/          # Gestión de negocios
│   │   │   ├── learning-path/       # Rutas de aprendizaje
│   │   │   └── modules/             # Módulos de contenido
│   │   ├── shared/                  # Componentes compartidos
│   │   │   ├── infrastructure/      # Infraestructura
│   │   │   └── domain/              # Dominio compartido
│   │   └── config/                  # Configuración
│   └── package.json
├── docker-compose.yml               # Orquestación de servicios
└── README.md                        # Esta documentación
```

## 🤖 Sistema de Inteligencia Artificial

### Tecnología de IA
- **Proveedor**: Google Gemini AI
- **Modelo**: `gemini-1.5-flash` (última versión estable)
- **Timeout**: 30 segundos por defecto (configurable)
- **Configuración**: `Backend/src/simulator/ai/`
- **Rate Limiting**: 60 requests por minuto por API key
- **Temperatura**: 0.7 (balance entre creatividad y consistencia)
- **Max Tokens**: 4096 por respuesta

### Configuración Detallada de IA

```typescript
// Backend/src/simulator/ai/ai.service.ts
export class AiService {
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: any;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('API_KEY');
    if (!apiKey) {
      throw new InternalServerErrorException('API_KEY no está configurada.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 4096,
      }
    });
  }

  async analyzePrompt(prompt: string, timeoutMs: number = 30000): Promise<string> {
    try {
      console.log(`🤖 [AI-SERVICE] Iniciando análisis con timeout de ${timeoutMs}ms`);
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout: La IA tardó demasiado en responder')), timeoutMs);
      });
      
      const aiPromise = this.model.generateContent(prompt).then(result => result.response.text());
      
      const response = await Promise.race([aiPromise, timeoutPromise]) as string;
      
      console.log(`✅ [AI-SERVICE] Respuesta recibida en tiempo`);
      return response;
    } catch (error) {
      console.error('❌ [AI-SERVICE] Error al generar contenido:', error);
      throw new InternalServerErrorException(`Error interno al generar contenido: ${error.message}`);
    }
  }
}
```

### Tipos de Análisis IA

#### 1. **Validación de Costos Básicos**
- **Endpoint**: `POST /ai/validate`
- **Propósito**: Validar los 7 costos básicos obligatorios
- **Validaciones**: Alquiler, Luz, Agua, Internet, Seguros, Patentes, Permisos
- **Salida**: JSON con validación detallada y costos faltantes
- **Timeout**: 15 segundos
- **Validaciones Específicas**:
  - Alquiler: $500-2000/mes (depende de zona y tamaño)
  - Luz: $50-200/mes (depende de consumo)
  - Agua: $20-80/mes (depende de consumo)
  - Internet: $30-100/mes (depende de velocidad)
  - Seguros: $50-300/mes (depende de cobertura)
  - Patentes: $100-500/año (depende de actividad)
  - Permisos: $200-1000/año (depende de tipo de negocio)

**Ejemplo de Request:**
```json
{
  "costs": [
    { "name": "Alquiler", "amount": "$800" },
    { "name": "Luz", "amount": "$120" },
    { "name": "Internet", "amount": "$60" }
  ],
  "businessInfo": {
    "tipoNegocio": "Restaurante",
    "tamano": "Mediano",
    "ubicacion": "Quito"
  }
}
```

**Ejemplo de Response:**
```json
{
  "validacion_de_costos": [
    {
      "costo_recibido": "Alquiler",
      "valor_recibido": "$800",
      "es_valido": true,
      "justificacion": "Es uno de los 7 costos básicos obligatorios",
      "sugerencia_correccion": null,
      "categoria": "costo básico"
    }
  ],
  "costos_obligatorios_faltantes": [
    {
      "nombre": "Agua",
      "descripcion": "Servicio de agua potable",
      "motivo_critico": "Es obligatorio para operar legalmente en Quito",
      "valor_estimado": "$20-80/mes",
      "prioridad": "alta"
    }
  ],
  "resumen_validacion": {
    "mensaje_general": "Validación de los 7 costos básicos obligatorios completada",
    "puede_proseguir_analisis": false,
    "razones_para_no_proseguir": ["Faltan costos básicos: Agua, Seguros, Patentes, Permisos"],
    "acciones_requeridas": ["Agregar los costos básicos faltantes: Agua, Seguros, Patentes, Permisos"],
    "puntuacion_global": "3/10"
  }
}
```

#### 2. **Análisis Comparativo de Mercado**
- **Endpoint**: `POST /ai/analyze`
- **Propósito**: Comparar costos con rangos de mercado locales
- **Funcionalidad**: Identifica costos fuera de rango y riesgos
- **Salida**: Análisis de riesgos y evaluación de costos
- **Timeout**: 25 segundos
- **Análisis Incluye**:
  - Comparación con rangos de mercado por ubicación
  - Identificación de costos anómalos
  - Evaluación de riesgos financieros
  - Recomendaciones de optimización

**Ejemplo de Request:**
```json
{
  "costs": [
    { "name": "Alquiler", "amount": "$800" },
    { "name": "Luz", "amount": "$120" },
    { "name": "Internet", "amount": "$60" },
    { "name": "Agua", "amount": "$45" },
    { "name": "Seguros", "amount": "$150" },
    { "name": "Patentes", "amount": "$300" },
    { "name": "Permisos", "amount": "$500" }
  ],
  "businessInfo": {
    "tipoNegocio": "Restaurante",
    "tamano": "Mediano",
    "ubicacion": "Quito"
  },
  "validationResult": {
    "puntuacion_global": "10/10",
    "puede_proseguir_analisis": true
  }
}
```

**Ejemplo de Response:**
```json
{
  "analisis_costos": {
    "Alquiler": {
      "valor_recibido": "$800",
      "rango_estimado_zona_especifica": "$500-1500/mes para restaurante mediano en Quito",
      "evaluacion": "Dentro del rango",
      "analisis": "El valor de alquiler de $800 se encuentra dentro del rango esperado para un restaurante mediano en una zona comercial de Quito. Este valor es competitivo y representa una ventaja en la estructura de costos fijos."
    },
    "Internet": {
      "valor_recibido": "$60",
      "rango_estimado_zona_especifica": "$30-100/mes para fibra óptica empresarial",
      "evaluacion": "Dentro del rango",
      "analisis": "El costo de internet de $60 mensuales está dentro del promedio del mercado para paquetes de fibra óptica de grado empresarial en Quito."
    }
  },
  "riesgos_identificados": [
    {
      "nombre": "Costo de Seguros Elevado",
      "causa": "El costo de seguros de $150 mensuales está por encima del promedio del mercado para restaurantes medianos en Quito.",
      "probabilidad": "Media",
      "impacto": "Incremento en costos fijos mensuales de aproximadamente $50-70",
      "consecuencias": "Reducción del margen operativo en $600-840 anuales",
      "recomendacion": "Revisar cobertura de seguros y cotizar con otros proveedores"
    }
  ],
  "resumen_analisis": {
    "puntuacion_global": "7/10",
    "costos_optimizables": ["Seguros"],
    "ahorro_potencial_anual": "$600-840",
    "recomendaciones_prioritarias": [
      "Revisar y optimizar cobertura de seguros",
      "Mantener costos actuales de alquiler e internet"
    ]
  }
}
```

#### 3. **Plan de Acción Personalizado**
- **Endpoint**: `POST /ai/final-analysis`
- **Propósito**: Generar acciones ejecutables específicas
- **Funcionalidad**: Crea planes con prioridades, plazos e inversiones
- **Salida**: Plan de acción detallado
- **Timeout**: 30 segundos
- **Características**:
  - Acciones específicas y ejecutables
  - Prioridades claras (Crítica, Alta, Media, Baja)
  - Plazos realistas con fechas específicas
  - Inversiones estimadas con rangos
  - Impactos cuantificables en términos financieros

**Ejemplo de Request:**
```json
{
  "costs": [
    { "name": "Alquiler", "amount": "$800" },
    { "name": "Luz", "amount": "$120" },
    { "name": "Internet", "amount": "$60" },
    { "name": "Agua", "amount": "$45" },
    { "name": "Seguros", "amount": "$150" },
    { "name": "Patentes", "amount": "$300" },
    { "name": "Permisos", "amount": "$500" }
  ],
  "businessInfo": {
    "tipoNegocio": "Restaurante",
    "tamano": "Mediano",
    "ubicacion": "Quito"
  },
  "previousResults": {
    "validation": { "puntuacion_global": "10/10" },
    "analysis": { 
      "puntuacion_global": "7/10",
      "riesgos_identificados": ["Costo de Seguros Elevado"]
    }
  }
}
```

**Ejemplo de Response:**
```json
{
  "plan_accion": {
    "Optimización de Seguros": [
      {
        "descripcion": "Contactar al menos 3 aseguradoras para cotizar cobertura de restaurante mediano en Quito, solicitando desglose detallado de coberturas y exclusiones.",
        "prioridad": "Alta",
        "plazo": "2-3 semanas",
        "fecha_limite": "2024-02-15",
        "inversion": "$0 - $50 (costo de consultas y documentación)",
        "impacto": "Ahorro potencial de $50-70 mensuales ($600-840 anuales)",
        "responsable": "Propietario del negocio",
        "recursos_requeridos": ["Lista de aseguradoras locales", "Documentos del negocio"],
        "criterios_exito": "Reducir costo de seguros a $80-100 mensuales"
      }
    ],
    "Auditoría de Consumo Energético": [
      {
        "descripcion": "Realizar auditoría energética para identificar oportunidades de ahorro en consumo de luz, incluyendo cambio a equipos eficientes y optimización de horarios.",
        "prioridad": "Media",
        "plazo": "1-2 meses",
        "fecha_limite": "2024-03-15",
        "inversion": "$200-500 (auditoría profesional)",
        "impacto": "Ahorro potencial de $20-40 mensuales ($240-480 anuales)",
        "responsable": "Gerente de operaciones",
        "recursos_requeridos": ["Auditor energético", "Inventario de equipos"],
        "criterios_exito": "Reducir factura de luz en 15-25%"
      }
    ],
    "Negociación de Alquiler": [
      {
        "descripcion": "Preparar propuesta de renovación de contrato de alquiler con mejoras en términos, considerando el buen comportamiento como inquilino y mejoras propuestas al local.",
        "prioridad": "Baja",
        "plazo": "3-6 meses",
        "fecha_limite": "2024-06-15",
        "inversion": "$0 - $100 (preparación de propuesta)",
        "impacto": "Potencial reducción de $50-100 mensuales ($600-1200 anuales)",
        "responsable": "Propietario del negocio",
        "recursos_requeridos": ["Historial de pagos", "Propuesta de mejoras"],
        "criterios_exito": "Renovar contrato con reducción de 5-10% en alquiler"
      }
    ]
  },
  "resumen_plan": {
    "total_acciones": 3,
    "ahorro_potencial_total": "$1440-2520 anuales",
    "inversion_total_requerida": "$200-650",
    "roi_estimado": "221-1260%",
    "tiempo_implementacion_total": "6 meses",
    "prioridades_distribucion": {
      "Alta": 1,
      "Media": 1,
      "Baja": 1
    }
  }
}
```

### Ejemplo de Uso Completo de IA

```typescript
// Frontend/src/core/businesses/infrastructure/services/business-ai.service.ts
export class BusinessAiService {
  constructor(private apiClient: ApiClient) {}

  async validateBusinessCosts(costs: Cost[], businessInfo: BusinessInfo): Promise<ValidationResult> {
    try {
      console.log('🔍 [AI-SERVICE] Iniciando validación de costos...');
      
      const response = await this.apiClient.post('/ai/validate', {
        costs: costs.map(cost => ({
          name: cost.name,
          amount: cost.amount
        })),
        businessInfo: {
          tipoNegocio: businessInfo.tipoNegocio,
          tamano: businessInfo.tamano,
          ubicacion: businessInfo.ubicacion
        }
      });

      console.log('✅ [AI-SERVICE] Validación completada:', response);
      return response;
    } catch (error) {
      console.error('❌ [AI-SERVICE] Error en validación:', error);
      throw new Error('Error al validar costos con IA');
    }
  }

  async analyzeBusinessCosts(
    costs: Cost[], 
    businessInfo: BusinessInfo, 
    validationResult: ValidationResult
  ): Promise<AnalysisResult> {
    try {
      console.log('📊 [AI-SERVICE] Iniciando análisis de costos...');
      
      const response = await this.apiClient.post('/ai/analyze', {
        costs: costs.map(cost => ({
          name: cost.name,
          amount: cost.amount
        })),
        businessInfo: {
          tipoNegocio: businessInfo.tipoNegocio,
          tamano: businessInfo.tamano,
          ubicacion: businessInfo.ubicacion
        },
        validationResult: {
          puntuacion_global: validationResult.resumen_validacion.puntuacion_global,
          puede_proseguir_analisis: validationResult.resumen_validacion.puede_proseguir_analisis
        }
      });

      console.log('✅ [AI-SERVICE] Análisis completado:', response);
      return response;
    } catch (error) {
      console.error('❌ [AI-SERVICE] Error en análisis:', error);
      throw new Error('Error al analizar costos con IA');
    }
  }

  async generateActionPlan(
    costs: Cost[], 
    businessInfo: BusinessInfo, 
    previousResults: { validation: ValidationResult; analysis: AnalysisResult }
  ): Promise<ActionPlanResult> {
    try {
      console.log('🎯 [AI-SERVICE] Generando plan de acción...');
      
      const response = await this.apiClient.post('/ai/final-analysis', {
        costs: costs.map(cost => ({
          name: cost.name,
          amount: cost.amount
        })),
        businessInfo: {
          tipoNegocio: businessInfo.tipoNegocio,
          tamano: businessInfo.tamano,
          ubicacion: businessInfo.ubicacion
        },
        previousResults: {
          validation: {
            puntuacion_global: previousResults.validation.resumen_validacion.puntuacion_global
          },
          analysis: {
            puntuacion_global: previousResults.analysis.resumen_analisis.puntuacion_global,
            riesgos_identificados: previousResults.analysis.riesgos_identificados.map(r => r.nombre)
          }
        }
      });

      console.log('✅ [AI-SERVICE] Plan de acción generado:', response);
      return response;
    } catch (error) {
      console.error('❌ [AI-SERVICE] Error generando plan:', error);
      throw new Error('Error al generar plan de acción con IA');
    }
  }
}

// Uso en componente React
const BusinessAnalysisComponent: React.FC = () => {
  const [costs, setCosts] = useState<Cost[]>([]);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({});
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [actionPlan, setActionPlan] = useState<ActionPlanResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCompleteAnalysis = async () => {
    setLoading(true);
    try {
      // 1. Validar costos
      const validation = await businessAiService.validateBusinessCosts(costs, businessInfo);
      setValidationResult(validation);

      if (validation.resumen_validacion.puede_proseguir_analisis) {
        // 2. Analizar costos
        const analysis = await businessAiService.analyzeBusinessCosts(costs, businessInfo, validation);
        setAnalysisResult(analysis);

        // 3. Generar plan de acción
        const plan = await businessAiService.generateActionPlan(costs, businessInfo, {
          validation,
          analysis
        });
        setActionPlan(plan);
      }
    } catch (error) {
      console.error('Error en análisis completo:', error);
      // Mostrar error al usuario
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="business-analysis">
      {/* Formulario de costos y información del negocio */}
      
      <button 
        onClick={handleCompleteAnalysis}
        disabled={loading || costs.length === 0}
        className="btn-primary"
      >
        {loading ? 'Analizando...' : 'Analizar Negocio con IA'}
      </button>

      {/* Mostrar resultados */}
      {validationResult && (
        <ValidationResultsComponent result={validationResult} />
      )}
      
      {analysisResult && (
        <AnalysisResultsComponent result={analysisResult} />
      )}
      
      {actionPlan && (
        <ActionPlanComponent plan={actionPlan} />
      )}
    </div>
  );
};
```

## 🎨 Frontend - Aplicación React

### Tecnologías
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Arquitectura**: Hexagonal (Domain-Driven Design)

### Estructura del Frontend

```
Frontend/src/
├── core/                           # Lógica de negocio
│   ├── auth/                       # Autenticación
│   │   ├── domain/                 # Entidades y casos de uso
│   │   └── infrastructure/         # Implementaciones
│   ├── businesses/                 # Gestión de negocios
│   ├── learning-path/              # Rutas de aprendizaje
│   └── modules/                    # Módulos de contenido
├── shared/                         # Componentes compartidos
│   ├── domain/                     # Dominio compartido
│   └── infrastructure/             # Infraestructura
│       ├── http/                   # Cliente HTTP
│       ├── ui/                     # Componentes UI
│       └── hooks/                  # Hooks personalizados
└── config/                         # Configuración
```

### Cliente HTTP Detallado

El frontend utiliza un cliente HTTP personalizado (`ApiClient`) que proporciona:

- **Base URL**: Configurable via `VITE_API_BASE_URL` (default: `http://localhost:3000/api/v1`)
- **Logging Detallado**: Logs de peticiones salientes y respuestas recibidas
- **Error Handling Centralizado**: Manejo consistente de errores HTTP
- **Headers Automáticos**: Content-Type, Authorization, etc.
- **Timeout Configurable**: 30 segundos por defecto
- **Retry Logic**: Reintentos automáticos para errores 5xx
- **Request/Response Interceptors**: Para logging y transformación de datos

**Configuración del Cliente:**
```typescript
// Frontend/src/shared/infrastructure/http/api-client.ts
export class ApiClient {
  private baseURL: string;
  private timeout: number = 30000;
  private retryAttempts: number = 3;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // Agregar token de autorización si existe
    const token = localStorage.getItem('auth_token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    // Log detallado de la petición
    console.log('🚀 [FRONTEND] Petición saliente:', {
      method: options.method || 'GET',
      url,
      headers: config.headers,
      body: options.body ? JSON.parse(options.body as string) : undefined,
      timestamp: new Date().toISOString(),
    });

    let lastError: Error;
    
    // Retry logic para errores 5xx
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        
        const response = await fetch(url, {
          ...config,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        // Log de la respuesta
        console.log('📥 [FRONTEND] Respuesta recibida:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          headers: Object.fromEntries(response.headers.entries()),
          attempt,
          timestamp: new Date().toISOString(),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('❌ [FRONTEND] Error HTTP:', {
            status: response.status,
            statusText: response.statusText,
            url,
            errorData,
            attempt,
          });
          
          // No reintentar para errores 4xx
          if (response.status >= 400 && response.status < 500) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          // Reintentar para errores 5xx
          if (response.status >= 500) {
            lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
            if (attempt < this.retryAttempts) {
              console.log(`🔄 [FRONTEND] Reintentando... (${attempt}/${this.retryAttempts})`);
              await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
              continue;
            }
          }
          
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        console.log('✅ [FRONTEND] Datos recibidos:', {
          endpoint,
          data,
          timestamp: new Date().toISOString(),
        });
        
        return data;
      } catch (error) {
        lastError = error as Error;
        
        if (error.name === 'AbortError') {
          console.error('⏰ [FRONTEND] Timeout en petición:', {
            endpoint,
            timeout: this.timeout,
            attempt,
          });
          throw new Error(`Timeout: La petición tardó más de ${this.timeout}ms`);
        }
        
        if (attempt < this.retryAttempts) {
          console.log(`🔄 [FRONTEND] Reintentando por error: ${error.message} (${attempt}/${this.retryAttempts})`);
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          continue;
        }
      }
    }
    
    console.error('💥 [FRONTEND] Error final después de reintentos:', {
      endpoint,
      error: lastError.message,
      attempts: this.retryAttempts,
      timestamp: new Date().toISOString(),
    });
    
    throw lastError;
  }

  // Métodos HTTP con tipos específicos
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// Instancia singleton del cliente API
export const apiClient = new ApiClient();
```

```typescript
// Configuración del cliente API
const apiClient = new ApiClient('http://localhost:3000/api/v1');

// Ejemplo de uso
const businesses = await apiClient.get('/business');
const newBusiness = await apiClient.post('/business', businessData);
```

## 🗄️ Base de Datos

### Tecnología
- **Base de Datos**: PostgreSQL 15
- **ORM**: Prisma
- **Migraciones**: Automáticas
- **Gestión**: pgAdmin (interfaz web)

### Modelos Principales

```prisma
// Negocios
model Negocios {
  negocio_id     Int      @id @default(autoincrement())
  usuario_id     Int
  tipo_negocio   String
  nombre_negocio String
  ubicacion      String
  id_tamano      Int
  fecha_creacion DateTime @default(now())
  // Relaciones con otros modelos...
}

// Análisis de IA
model Analisis_IA {
  analisis_id    Int      @id @default(autoincrement())
  negocio_id     Int
  fecha_analisis DateTime @default(now())
  // Relaciones con resultados...
}

// Módulos de Aprendizaje
model Modulos {
  id_modulo      Int      @id @default(autoincrement())
  id_aprendizaje Int
  orden_modulo   Int?
  nombre_modulo  String
  concepto       String
  // Relaciones...
}
```

## 🔧 Configuración del Entorno

### Variables de Entorno Detalladas

Crear archivo `.env` en la raíz del proyecto con todas las configuraciones necesarias:

```env
# ===== CONFIGURACIÓN GENERAL =====
NODE_ENV=development
TZ=America/Guayaquil

# ===== POSTGRESQL =====
POSTGRES_IMAGE=postgres:15-alpine
POSTGRES_CONTAINER_NAME=krakedev_postgres
POSTGRES_DB=krakedev_db
POSTGRES_USER=krakedev_user
POSTGRES_PASSWORD=krakedev_password
POSTGRES_PORT=5432
POSTGRES_INITDB_ARGS="--encoding=UTF-8 --lc-collate=C --lc-ctype=C"

# ===== PGADMIN =====
PGADMIN_IMAGE=dpage/pgadmin4:latest
PGADMIN_CONTAINER_NAME=krakedev_pgadmin
PGADMIN_DEFAULT_EMAIL=admin@krakedev.com
PGADMIN_DEFAULT_PASSWORD=admin123
PGADMIN_PORT=5050
PGADMIN_CONFIG_SERVER_MODE=False
PGADMIN_CONFIG_MASTER_PASSWORD_REQUIRED=False

# ===== BACKEND =====
BACKEND_CONTAINER_NAME=krakedev_backend
BACKEND_PORT=3000
BACKEND_HOST=0.0.0.0
DATABASE_URL=postgresql://krakedev_user:krakedev_password@postgres:5432/krakedev_db
GOOGLE_AI_API_KEY=tu_api_key_de_google_gemini
JWT_SECRET=tu_jwt_secret_super_seguro_muy_largo_y_complejo_2024
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=tu_refresh_secret_super_seguro_muy_largo_y_complejo_2024
JWT_REFRESH_EXPIRES_IN=7d

# Configuración de IA
AI_TIMEOUT_MS=30000
AI_MAX_RETRIES=3
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=4096

# Configuración de logs
LOG_LEVEL=debug
LOG_FORMAT=json

# Configuración de CORS
CORS_ORIGIN=http://localhost:5173
CORS_CREDENTIALS=true

# ===== FRONTEND =====
FRONTEND_CONTAINER_NAME=krakedev_frontend
FRONTEND_PORT=5173
FRONTEND_HOST=0.0.0.0
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_TITLE=Simulador de Emprendimientos
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development

# Configuración de desarrollo
VITE_DEV_SERVER_HOST=0.0.0.0
VITE_DEV_SERVER_PORT=5173
VITE_DEV_SERVER_HTTPS=false

# Configuración de build
VITE_BUILD_SOURCEMAP=true
VITE_BUILD_MINIFY=true
VITE_BUILD_TARGET=esnext

# ===== REDES =====
NETWORK_NAME=krakedev_network
NETWORK_DRIVER=bridge

# ===== VOLÚMENES =====
POSTGRES_DATA_VOLUME=postgres_data
PGADMIN_DATA_VOLUME=pgadmin_data

# ===== HEALTH CHECKS =====
HEALTH_CHECK_INTERVAL=30s
HEALTH_CHECK_TIMEOUT=10s
HEALTH_CHECK_RETRIES=3
HEALTH_CHECK_START_PERIOD=40s
```

### Configuración de Entorno por Ambiente

#### Desarrollo Local
```env
NODE_ENV=development
LOG_LEVEL=debug
VITE_APP_ENVIRONMENT=development
```

#### Producción
```env
NODE_ENV=production
LOG_LEVEL=info
VITE_APP_ENVIRONMENT=production
VITE_API_BASE_URL=https://api.tudominio.com/api/v1
CORS_ORIGIN=https://tudominio.com
```

#### Testing
```env
NODE_ENV=test
LOG_LEVEL=error
VITE_APP_ENVIRONMENT=test
DATABASE_URL=postgresql://test_user:test_password@localhost:5432/test_db
```

## 🐳 Despliegue con Docker Compose

### Requisitos Previos
- Docker Desktop
- Docker Compose
- Variables de entorno configuradas

### 🚀 Pasos para Levantar el Proyecto Completo

#### 1. **Clonar y Configurar**

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd integracion_simulador

# Crear archivo de variables de entorno
cp .env.example .env
# Editar .env con tus credenciales
```

#### 2. **Levantar Todos los Servicios**

```bash
# Levantar todos los servicios en segundo plano
docker-compose up -d

# Verificar que todos los contenedores estén corriendo
docker-compose ps
```

#### 3. **Verificar el Estado de los Servicios**

```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs específicos
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### 📊 Acceso a los Servicios

| Servicio | URL | Credenciales | Estado |
|----------|-----|--------------|--------|
| **Frontend** | http://localhost:5173 | - | ✅ Activo |
| **Backend API** | http://localhost:3000 | - | ✅ Activo |
| **Backend Health** | http://localhost:3000/health | - | ✅ Activo |
| **pgAdmin** | http://localhost:5050 | admin@krakedev.com / admin123 | ✅ Activo |
| **PostgreSQL** | localhost:5432 | krakedev_user / krakedev_password | ✅ Activo |

### 🔍 Verificación de Servicios

#### Verificar Estado de Contenedores
```bash
# Verificar que todos los contenedores estén corriendo
docker-compose ps

# Salida esperada:
# Name                    Command               State           Ports
# -----------------------------------------------------------------------------
# krakedev_backend       ./scripts/init.sh                    Up      0.0.0.0:3000->3000/tcp
# krakedev_frontend      npm run dev                          Up      0.0.0.0:5173->5173/tcp
# krakedev_pgadmin       /entrypoint.sh                       Up      0.0.0.0:5050->80/tcp
# krakedev_postgres      docker-entrypoint.sh postgres        Up      0.0.0.0:5432->5432/tcp
```

#### Verificar Endpoints de Salud
```bash
# Verificar backend
curl -f http://localhost:3000/health
# Respuesta esperada: {"status":"ok","timestamp":"2024-01-15T10:30:00.000Z"}

# Verificar frontend
curl -f http://localhost:5173
# Respuesta esperada: HTML de la aplicación React

# Verificar PostgreSQL
docker-compose exec postgres pg_isready -U krakedev_user -d krakedev_db
# Respuesta esperada: localhost:5432 - accepting connections

# Verificar pgAdmin
curl -f http://localhost:5050
# Respuesta esperada: HTML de pgAdmin
```

#### Verificar Logs de Inicialización
```bash
# Verificar logs del backend (debe mostrar migraciones y seed)
docker-compose logs backend | grep -E "(migrate|seed|start)"

# Verificar logs de PostgreSQL (debe mostrar inicio exitoso)
docker-compose logs postgres | grep -E "(database system is ready|listening)"

# Verificar logs del frontend (debe mostrar servidor de desarrollo)
docker-compose logs frontend | grep -E "(Local:|Network:|ready in)"
```

### 🔄 Scripts de Inicialización

#### Backend (`Backend/scripts/init.sh`)
1. **Ejecuta migraciones** de Prisma
2. **Genera el cliente** de Prisma
3. **Ejecuta seed** de datos (solo si la BD está vacía)
4. **Inicia la aplicación** en modo producción

#### Frontend
- **Desarrollo**: Hot reload automático
- **Producción**: Build optimizado con Vite

## 🔗 Conexión Backend-Frontend

### Flujo de Comunicación

```
Frontend (React) ←→ Backend (NestJS) ←→ Base de Datos (PostgreSQL)
     ↓                    ↓                    ↓
  UI/UX              API REST              Persistencia
  Estado             Lógica de             Datos
  Navegación         Negocio               Relaciones
```

### Endpoints Principales

#### Negocios
- `GET /business` - Listar negocios
- `POST /business` - Crear negocio
- `GET /business/:id` - Obtener negocio específico

#### Análisis IA
- `POST /ai/validate` - Validar costos con IA
- `POST /ai/analyze` - Analizar costos con IA
- `POST /ai/final-analysis` - Análisis final con plan de acción

#### Módulos de Aprendizaje
- `GET /learning` - Listar rutas de aprendizaje
- `GET /modules` - Listar módulos
- `POST /modules/:id/progress` - Actualizar progreso

### Ejemplo de Flujo Completo con Manejo de Errores

```typescript
// Frontend/src/core/businesses/infrastructure/services/business-workflow.service.ts
export class BusinessWorkflowService {
  constructor(
    private apiClient: ApiClient,
    private businessService: BusinessService,
    private aiService: BusinessAiService
  ) {}

  async executeCompleteBusinessAnalysis(
    businessData: CreateBusinessDto,
    costs: Cost[]
  ): Promise<CompleteAnalysisResult> {
    const result: CompleteAnalysisResult = {
      business: null,
      validation: null,
      analysis: null,
      actionPlan: null,
      errors: [],
      warnings: []
    };

    try {
      console.log('🚀 [WORKFLOW] Iniciando análisis completo de negocio...');

      // Paso 1: Crear negocio
      console.log('📝 [WORKFLOW] Paso 1: Creando negocio...');
      try {
        result.business = await this.businessService.createBusiness(businessData);
        console.log('✅ [WORKFLOW] Negocio creado exitosamente:', result.business.negocio_id);
      } catch (error) {
        console.error('❌ [WORKFLOW] Error creando negocio:', error);
        result.errors.push({
          step: 'create_business',
          message: 'Error al crear el negocio',
          details: error.message
        });
        throw error; // No continuar si no se puede crear el negocio
      }

      // Paso 2: Validar costos con IA
      console.log('🔍 [WORKFLOW] Paso 2: Validando costos con IA...');
      try {
        result.validation = await this.aiService.validateBusinessCosts(costs, {
          tipoNegocio: result.business.tipo_negocio,
          tamano: result.business.tamano_negocio,
          ubicacion: result.business.ubicacion
        });
        console.log('✅ [WORKFLOW] Validación completada:', result.validation.resumen_validacion.puntuacion_global);
      } catch (error) {
        console.error('❌ [WORKFLOW] Error en validación:', error);
        result.errors.push({
          step: 'validation',
          message: 'Error al validar costos con IA',
          details: error.message
        });
        result.warnings.push({
          step: 'validation',
          message: 'No se pudo validar costos, continuando sin validación'
        });
      }

      // Paso 3: Análisis de costos (solo si la validación fue exitosa)
      if (result.validation?.resumen_validacion.puede_proseguir_analisis) {
        console.log('📊 [WORKFLOW] Paso 3: Analizando costos...');
        try {
          result.analysis = await this.aiService.analyzeBusinessCosts(
            costs,
            {
              tipoNegocio: result.business.tipo_negocio,
              tamano: result.business.tamano_negocio,
              ubicacion: result.business.ubicacion
            },
            result.validation
          );
          console.log('✅ [WORKFLOW] Análisis completado:', result.analysis.resumen_analisis.puntuacion_global);
        } catch (error) {
          console.error('❌ [WORKFLOW] Error en análisis:', error);
          result.errors.push({
            step: 'analysis',
            message: 'Error al analizar costos con IA',
            details: error.message
          });
        }
      } else {
        console.log('⚠️ [WORKFLOW] Saltando análisis - validación no aprobada');
        result.warnings.push({
          step: 'analysis',
          message: 'No se realizó análisis debido a problemas en la validación'
        });
      }

      // Paso 4: Generar plan de acción (solo si hay análisis)
      if (result.analysis) {
        console.log('🎯 [WORKFLOW] Paso 4: Generando plan de acción...');
        try {
          result.actionPlan = await this.aiService.generateActionPlan(
            costs,
            {
              tipoNegocio: result.business.tipo_negocio,
              tamano: result.business.tamano_negocio,
              ubicacion: result.business.ubicacion
            },
            {
              validation: result.validation,
              analysis: result.analysis
            }
          );
          console.log('✅ [WORKFLOW] Plan de acción generado exitosamente');
        } catch (error) {
          console.error('❌ [WORKFLOW] Error generando plan:', error);
          result.errors.push({
            step: 'action_plan',
            message: 'Error al generar plan de acción con IA',
            details: error.message
          });
        }
      }

      // Paso 5: Guardar resultados en base de datos
      console.log('💾 [WORKFLOW] Paso 5: Guardando resultados...');
      try {
        await this.saveAnalysisResults(result);
        console.log('✅ [WORKFLOW] Resultados guardados exitosamente');
      } catch (error) {
        console.error('❌ [WORKFLOW] Error guardando resultados:', error);
        result.errors.push({
          step: 'save_results',
          message: 'Error al guardar resultados en base de datos',
          details: error.message
        });
      }

      console.log('🎉 [WORKFLOW] Análisis completo finalizado');
      return result;

    } catch (error) {
      console.error('💥 [WORKFLOW] Error crítico en workflow:', error);
      result.errors.push({
        step: 'workflow',
        message: 'Error crítico en el flujo de análisis',
        details: error.message
      });
      throw error;
    }
  }

  private async saveAnalysisResults(result: CompleteAnalysisResult): Promise<void> {
    // Guardar análisis de IA
    if (result.business && (result.validation || result.analysis)) {
      const analysisData = {
        negocio_id: result.business.negocio_id,
        fecha_analisis: new Date(),
        validation_result: result.validation,
        analysis_result: result.analysis,
        action_plan: result.actionPlan
      };

      await this.apiClient.post('/analysis-ai', analysisData);
    }
  }
}

// Uso en componente React con manejo de estados
const BusinessAnalysisWorkflow: React.FC = () => {
  const [workflowState, setWorkflowState] = useState<'idle' | 'running' | 'completed' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<CompleteAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartAnalysis = async (businessData: CreateBusinessDto, costs: Cost[]) => {
    setWorkflowState('running');
    setProgress(0);
    setError(null);
    setResult(null);

    try {
      const workflowService = new BusinessWorkflowService(
        apiClient,
        new BusinessService(apiClient),
        new BusinessAiService(apiClient)
      );

      // Simular progreso
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 1000);

      const analysisResult = await workflowService.executeCompleteBusinessAnalysis(businessData, costs);

      clearInterval(progressInterval);
      setProgress(100);
      setResult(analysisResult);
      setWorkflowState('completed');

      // Mostrar notificaciones según resultados
      if (analysisResult.errors.length > 0) {
        console.warn('⚠️ Análisis completado con errores:', analysisResult.errors);
      }

      if (analysisResult.warnings.length > 0) {
        console.warn('⚠️ Análisis completado con advertencias:', analysisResult.warnings);
      }

    } catch (error) {
      setError(error.message);
      setWorkflowState('error');
      console.error('💥 Error en workflow:', error);
    }
  };

  return (
    <div className="business-workflow">
      <div className="workflow-header">
        <h2>Análisis Completo de Negocio</h2>
        <div className="workflow-status">
          Estado: {workflowState === 'idle' && 'Listo'}
          {workflowState === 'running' && 'Ejecutando...'}
          {workflowState === 'completed' && 'Completado'}
          {workflowState === 'error' && 'Error'}
        </div>
      </div>

      {workflowState === 'running' && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          <span>{progress}%</span>
        </div>
      )}

      {error && (
        <div className="error-message">
          <h3>Error en el análisis:</h3>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="analysis-results">
          <h3>Resultados del Análisis</h3>
          
          {result.business && (
            <div className="result-section">
              <h4>Negocio Creado</h4>
              <p>ID: {result.business.negocio_id}</p>
              <p>Nombre: {result.business.nombre_negocio}</p>
            </div>
          )}

          {result.validation && (
            <div className="result-section">
              <h4>Validación de Costos</h4>
              <p>Puntuación: {result.validation.resumen_validacion.puntuacion_global}</p>
            </div>
          )}

          {result.analysis && (
            <div className="result-section">
              <h4>Análisis de Mercado</h4>
              <p>Puntuación: {result.analysis.resumen_analisis.puntuacion_global}</p>
            </div>
          )}

          {result.actionPlan && (
            <div className="result-section">
              <h4>Plan de Acción</h4>
              <p>Total de acciones: {result.actionPlan.resumen_plan.total_acciones}</p>
            </div>
          )}

          {result.errors.length > 0 && (
            <div className="errors-section">
              <h4>Errores Encontrados</h4>
              <ul>
                {result.errors.map((error, index) => (
                  <li key={index}>
                    <strong>{error.step}:</strong> {error.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.warnings.length > 0 && (
            <div className="warnings-section">
              <h4>Advertencias</h4>
              <ul>
                {result.warnings.map((warning, index) => (
                  <li key={index}>
                    <strong>{warning.step}:</strong> {warning.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <button 
        onClick={() => handleStartAnalysis(businessData, costs)}
        disabled={workflowState === 'running'}
        className="btn-primary"
      >
        {workflowState === 'running' ? 'Analizando...' : 'Iniciar Análisis Completo'}
      </button>
    </div>
  );
};
```

## 🚀 Comandos de Desarrollo

### Comandos Docker Compose

```bash
# Levantar servicios
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Reiniciar servicios específicos
docker-compose restart backend
docker-compose restart frontend

# Ejecutar comandos dentro de contenedores
docker-compose exec backend npm run seed
docker-compose exec frontend npm run build

# Parar todos los servicios
docker-compose down

# Parar y eliminar volúmenes (¡CUIDADO!)
docker-compose down -v
```

### Desarrollo Local (sin Docker)

#### Backend
```bash
cd Backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run start:dev
```

#### Frontend
```bash
cd Frontend
npm install
npm run dev
```

## 🔍 Monitoreo y Debugging

### Logs del Sistema

```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs específicos
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
docker-compose logs pgadmin
```

### Verificar Estado de la Base de Datos

```bash
# Conectar a PostgreSQL
docker-compose exec postgres psql -U krakedev_user -d krakedev_db

# Verificar tablas
\dt

# Verificar datos
SELECT COUNT(*) FROM "Negocios";
SELECT COUNT(*) FROM "Analisis_IA";
```

### Verificar Conexión Frontend-Backend

```bash
# Verificar que el backend responda
curl http://localhost:3000/health

# Verificar que el frontend esté corriendo
curl http://localhost:5173
```

## 🛠️ Troubleshooting

### Problemas Comunes

#### 1. **Error de Conexión Frontend-Backend**
```bash
# Verificar que ambos servicios estén corriendo
docker-compose ps

# Verificar logs del frontend
docker-compose logs frontend

# Verificar logs del backend
docker-compose logs backend
```

#### 2. **Error de API Key de Google AI**
- Verificar que `GOOGLE_AI_API_KEY` esté configurada en `.env`
- Verificar que la API key sea válida
- Revisar logs del backend: `docker-compose logs backend`

#### 3. **Error de Base de Datos**
```bash
# Verificar que PostgreSQL esté corriendo
docker-compose ps postgres

# Verificar logs de PostgreSQL
docker-compose logs postgres

# Ejecutar migraciones manualmente
docker-compose exec backend npx prisma migrate deploy
```

#### 4. **Puertos Ocupados**
```bash
# Verificar puertos en uso
netstat -tulpn | grep :3000
netstat -tulpn | grep :5173
netstat -tulpn | grep :5432

# Cambiar puertos en docker-compose.yml si es necesario
```

#### 5. **Error de Build del Frontend**
```bash
# Reconstruir imagen del frontend
docker-compose build frontend

# Ver logs de build
docker-compose logs frontend
```

## 📝 Notas Importantes

### Seguridad
1. **Nunca committear** archivos `.env` con credenciales reales
2. **Usar variables de entorno** para configuraciones sensibles
3. **Validar inputs** tanto en frontend como backend

### Performance
1. **Timeouts de IA**: 30 segundos por defecto
2. **Hot reload**: Frontend con Vite para desarrollo rápido
3. **Caching**: Implementar según necesidades

### Escalabilidad
1. **Arquitectura modular**: Permite escalar componentes independientemente
2. **Base de datos**: PostgreSQL permite escalabilidad vertical y horizontal
3. **Contenedores**: Docker permite escalar horizontalmente fácilmente

## 🤝 Contribución

1. **Fork** el proyecto
2. **Crear rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abrir Pull Request**

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 🎯 Próximos Pasos

1. **Configurar CI/CD** con GitHub Actions
2. **Implementar tests** unitarios y de integración
3. **Agregar documentación** de API con Swagger
4. **Optimizar performance** de las llamadas a IA
5. **Implementar cache** para respuestas de IA
6. **Agregar monitoreo** con herramientas como Prometheus/Grafana
