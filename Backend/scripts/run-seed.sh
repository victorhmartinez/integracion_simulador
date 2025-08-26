#!/bin/bash

echo "🌱 Ejecutando seed de la base de datos..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Debes ejecutar este script desde el directorio Backend/"
    exit 1
fi

# Verificar que las dependencias estén instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Verificar que bcrypt esté instalado
if ! npm list bcrypt > /dev/null 2>&1; then
    echo "🔐 Instalando bcrypt..."
    npm install bcrypt @types/bcrypt
fi

# Ejecutar las migraciones si es necesario
echo "🔄 Verificando migraciones..."
npx prisma migrate deploy

# Ejecutar el seed
echo "🌱 Ejecutando seed..."
npm run seed

echo "✅ Seed completado!"
echo ""
echo "📊 Datos de prueba creados:"
echo "   - Usuarios: maria@ejemplo.com, carlos@ejemplo.com, ana@ejemplo.com"
echo "   - Contraseña para todos: 123456"
echo "   - Negocios de ejemplo para cada usuario"
echo "   - Módulos de aprendizaje"
echo "   - Análisis de IA con resultados"
echo ""
echo "🚀 Puedes iniciar el backend con: npm run start:dev"
