const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testUsers() {
  try {
    console.log('🔍 Verificando usuarios en la base de datos...');
    
    const usuarios = await prisma.usuarios.findMany({
      select: {
        usuario_id: true,
        nombre_completo: true,
        email: true
      }
    });
    
    console.log('👥 Usuarios encontrados:');
    usuarios.forEach(user => {
      console.log(`  - ID: ${user.usuario_id}, Nombre: ${user.nombre_completo}, Email: ${user.email}`);
    });
    
    console.log('\n🔍 Verificando tamaños de negocio...');
    
    const tamanos = await prisma.tamano_negocio.findMany({
      select: {
        id_tamano: true,
        tamano_nombre: true
      }
    });
    
    console.log('📏 Tamaños encontrados:');
    tamanos.forEach(tamano => {
      console.log(`  - ID: ${tamano.id_tamano}, Nombre: ${tamano.tamano_nombre}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testUsers();
