@echo off
echo 🚀 Configurando conexión Frontend-Backend...

REM Crear archivo .env para el frontend
echo 📝 Creando archivo .env para el frontend...
(
echo VITE_API_BASE_URL=http://localhost:3000/api/v1
) > Frontend\.env

REM Crear archivo .env para el backend
echo 📝 Creando archivo .env para el backend...
(
echo DATABASE_URL="postgresql://postgres:postgres@localhost:5432/simulador_db?schema=public"
echo PORT=3000
) > Backend\.env

echo ✅ Archivos de configuración creados exitosamente!
echo.
echo 📋 Próximos pasos:
echo 1. Inicia la base de datos: docker-compose up -d
echo 2. Ejecuta las migraciones: cd Backend ^&^& npx prisma migrate dev
echo 3. Ejecuta el seed de datos: cd Backend ^&^& scripts\run-seed.bat
echo 4. Inicia el backend: cd Backend ^&^& npm run start:dev
echo 5. Inicia el frontend: cd Frontend ^&^& npm run dev
echo.
echo 🌐 URLs:
echo - Backend: http://localhost:3000
echo - Frontend: http://localhost:5173
echo - API Docs: http://localhost:3000/api/docs
echo.
echo 👥 Usuarios de prueba:
echo - maria@ejemplo.com (contraseña: 123456)
echo - carlos@ejemplo.com (contraseña: 123456)
echo - ana@ejemplo.com (contraseña: 123456)
pause
