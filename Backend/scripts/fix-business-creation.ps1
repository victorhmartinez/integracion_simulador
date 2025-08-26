Write-Host "🔧 Solucionando problema de creación de negocios..." -ForegroundColor Cyan

# 1. Verificar que PostgreSQL esté corriendo
Write-Host "📡 Verificando PostgreSQL..." -ForegroundColor Yellow
docker-compose up -d

# 2. Esperar a que PostgreSQL esté listo
Write-Host "⏳ Esperando a que PostgreSQL esté listo..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# 3. Aplicar migraciones
Write-Host "📋 Aplicando migraciones..." -ForegroundColor Yellow
npx prisma migrate deploy

# 4. Ejecutar seed
Write-Host "🌱 Ejecutando seed..." -ForegroundColor Yellow
npm run seed

# 5. Verificar datos
Write-Host "🔍 Verificando datos..." -ForegroundColor Yellow
Write-Host "Usuarios:" -ForegroundColor Cyan
npx prisma db execute --stdin "SELECT usuario_id, nombre_completo FROM `"Usuarios`";"

Write-Host ""
Write-Host "Tamaños:" -ForegroundColor Cyan
npx prisma db execute --stdin "SELECT id_tamano, tamano_nombre FROM `"tamano_negocio`";"

Write-Host ""
Write-Host "✅ Problema solucionado" -ForegroundColor Green
Write-Host "🚀 Ahora puedes probar crear un negocio desde el frontend" -ForegroundColor Yellow
