@echo off
echo 🌱 Ejecutando seed de la base de datos...

REM Verificar que estamos en el directorio correcto
if not exist "package.json" (
    echo ❌ Error: Debes ejecutar este script desde el directorio Backend/
    pause
    exit /b 1
)

REM Verificar que las dependencias estén instaladas
if not exist "node_modules" (
    echo 📦 Instalando dependencias...
    npm install
)

REM Verificar que bcrypt esté instalado
npm list bcrypt >nul 2>&1
if errorlevel 1 (
    echo 🔐 Instalando bcrypt...
    npm install bcrypt @types/bcrypt
)

REM Ejecutar las migraciones si es necesario
echo 🔄 Verificando migraciones...
npx prisma migrate deploy

REM Ejecutar el seed
echo 🌱 Ejecutando seed...
npm run seed

echo ✅ Seed completado!
echo.
echo 📊 Datos de prueba creados:
echo    - Usuarios: maria@ejemplo.com, carlos@ejemplo.com, ana@ejemplo.com
echo    - Contraseña para todos: 123456
echo    - Negocios de ejemplo para cada usuario
echo    - Módulos de aprendizaje
echo    - Análisis de IA con resultados
echo.
echo 🚀 Puedes iniciar el backend con: npm run start:dev
pause
