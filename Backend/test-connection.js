const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔍 Probando conexión a la base de datos...');
    
    // Verificar usuarios
    const usuarios = await prisma.usuarios.findMany();
    console.log('👥 Usuarios en la base de datos:', usuarios);
    
    // Verificar tamaños de negocio
    const tamanos = await prisma.tamano_negocio.findMany();
    console.log('📏 Tamaños de negocio en la base de datos:', tamanos);
    
    // Verificar negocios existentes
    const negocios = await prisma.negocios.findMany();
    console.log('🏢 Negocios en la base de datos:', negocios);
    
    console.log('✅ Conexión exitosa');
  } catch (error) {
    console.error('❌ Error en la conexión:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
