#!/bin/bash

echo "🔧 Solucionando problema de creación de negocios..."

cd Backend

# 1. Verificar que PostgreSQL esté corriendo
echo "📡 Verificando PostgreSQL..."
docker-compose up -d

# 2. Esperar a que PostgreSQL esté listo
echo "⏳ Esperando a que PostgreSQL esté listo..."
sleep 10

# 3. Aplicar migraciones
echo "📋 Aplicando migraciones..."
npx prisma migrate deploy

# 4. Ejecutar seed
echo "🌱 Ejecutando seed..."
npm run seed

# 5. Verificar datos
echo "🔍 Verificando datos..."
echo "Usuarios:"
npx prisma db execute --stdin <<< "SELECT usuario_id, nombre_completo FROM \"Usuarios\";"

echo ""
echo "Tamaños:"
npx prisma db execute --stdin <<< "SELECT id_tamano, tamano_nombre FROM \"tamano_negocio\";"

echo ""
echo "✅ Problema solucionado"
echo "🚀 Ahora puedes probar crear un negocio desde el frontend"
