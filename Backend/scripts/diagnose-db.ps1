Write-Host "🔍 Diagnóstico de Base de Datos..." -ForegroundColor Cyan

# Verificar que PostgreSQL esté corriendo
Write-Host "📡 Verificando PostgreSQL..." -ForegroundColor Yellow
$postgresRunning = docker ps | Select-String "postgres"
if (-not $postgresRunning) {
    Write-Host "❌ PostgreSQL no está corriendo" -ForegroundColor Red
    Write-Host "🚀 Iniciando PostgreSQL..." -ForegroundColor Yellow
    docker-compose up -d
    Start-Sleep -Seconds 5
} else {
    Write-Host "✅ PostgreSQL está corriendo" -ForegroundColor Green
}

# Verificar conexión a la base de datos
Write-Host "🔗 Verificando conexión a la base de datos..." -ForegroundColor Yellow

# Verificar si las migraciones están aplicadas
Write-Host "📋 Verificando migraciones..." -ForegroundColor Yellow
npx prisma migrate status

# Verificar datos en las tablas
Write-Host "📊 Verificando datos en las tablas..." -ForegroundColor Yellow

Write-Host "👥 Usuarios:" -ForegroundColor Cyan
npx prisma db execute --stdin "SELECT usuario_id, nombre_completo, email FROM `"Usuarios`" LIMIT 5;"

Write-Host ""
Write-Host "📏 Tamaños de negocio:" -ForegroundColor Cyan
npx prisma db execute --stdin "SELECT id_tamano, tamano_nombre FROM `"tamano_negocio`";"

Write-Host ""
Write-Host "🏢 Negocios existentes:" -ForegroundColor Cyan
npx prisma db execute --stdin "SELECT negocio_id, usuario_id, nombre_negocio, tipo_negocio, id_tamano FROM `"Negocios`" LIMIT 5;"

Write-Host ""
Write-Host "🔧 Verificando foreign keys..." -ForegroundColor Yellow
Write-Host "Verificando que el usuario 1 existe:" -ForegroundColor Cyan
npx prisma db execute --stdin "SELECT usuario_id, nombre_completo FROM `"Usuarios`" WHERE usuario_id = 1;"

Write-Host ""
Write-Host "Verificando que el tamaño 1 existe:" -ForegroundColor Cyan
npx prisma db execute --stdin "SELECT id_tamano, tamano_nombre FROM `"tamano_negocio`" WHERE id_tamano = 1;"

Write-Host ""
Write-Host "🧪 Probando inserción manual..." -ForegroundColor Yellow
npx prisma db execute --stdin @"
INSERT INTO "Negocios" (usuario_id, tipo_negocio, nombre_negocio, ubicacion, id_tamano, fecha_creacion)
VALUES (1, 'Test Negocio', 'Negocio de Prueba', 'Ubicación de Prueba', 1, NOW())
ON CONFLICT DO NOTHING;
"@

Write-Host ""
Write-Host "✅ Diagnóstico completado" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Si hay problemas, ejecuta:" -ForegroundColor Yellow
Write-Host "cd Backend; npm run seed" -ForegroundColor White
