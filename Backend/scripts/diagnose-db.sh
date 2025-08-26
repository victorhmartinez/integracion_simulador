#!/bin/bash

echo "🔍 Diagnóstico de Base de Datos..."

# Verificar que PostgreSQL esté corriendo
echo "📡 Verificando PostgreSQL..."
if ! docker ps | grep -q postgres; then
    echo "❌ PostgreSQL no está corriendo"
    echo "🚀 Iniciando PostgreSQL..."
    cd Backend
    docker-compose up -d
    sleep 5
else
    echo "✅ PostgreSQL está corriendo"
fi

# Verificar conexión a la base de datos
echo "🔗 Verificando conexión a la base de datos..."
cd Backend

# Verificar si las migraciones están aplicadas
echo "📋 Verificando migraciones..."
npx prisma migrate status

# Verificar datos en las tablas
echo "📊 Verificando datos en las tablas..."

echo "👥 Usuarios:"
npx prisma db execute --stdin <<< "SELECT usuario_id, nombre_completo, email FROM \"Usuarios\" LIMIT 5;"

echo ""
echo "📏 Tamaños de negocio:"
npx prisma db execute --stdin <<< "SELECT id_tamano, tamano_nombre FROM \"tamano_negocio\";"

echo ""
echo "🏢 Negocios existentes:"
npx prisma db execute --stdin <<< "SELECT negocio_id, usuario_id, nombre_negocio, tipo_negocio, id_tamano FROM \"Negocios\" LIMIT 5;"

echo ""
echo "🔧 Verificando foreign keys..."
echo "Verificando que el usuario 1 existe:"
npx prisma db execute --stdin <<< "SELECT usuario_id, nombre_completo FROM \"Usuarios\" WHERE usuario_id = 1;"

echo ""
echo "Verificando que el tamaño 1 existe:"
npx prisma db execute --stdin <<< "SELECT id_tamano, tamano_nombre FROM \"tamano_negocio\" WHERE id_tamano = 1;"

echo ""
echo "🧪 Probando inserción manual..."
npx prisma db execute --stdin <<< "
INSERT INTO \"Negocios\" (usuario_id, tipo_negocio, nombre_negocio, ubicacion, id_tamano, fecha_creacion)
VALUES (1, 'Test Negocio', 'Negocio de Prueba', 'Ubicación de Prueba', 1, NOW())
ON CONFLICT DO NOTHING;
"

echo ""
echo "✅ Diagnóstico completado"
echo ""
echo "🚀 Si hay problemas, ejecuta:"
echo "cd Backend && npm run seed"
