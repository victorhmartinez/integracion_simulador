const axios = require('axios');

async function testFinancialEndpoint() {
  try {
    console.log('🧪 [TEST] Probando endpoint de registros financieros...');
    
    // Primero probar si el servidor está corriendo
    console.log('🔍 [TEST] Verificando si el servidor está corriendo...');
    
    try {
      const healthCheck = await axios.get('http://localhost:3000/api/v1/health', {
        timeout: 5000
      });
      console.log('✅ [TEST] Servidor está corriendo');
    } catch (healthError) {
      console.log('❌ [TEST] Servidor no está corriendo o no responde');
      console.log('💡 [TEST] Ejecuta: cd Backend && npm run start:dev');
      return;
    }
    
    // Probar el endpoint específico
    const businessId = 31;
    const moduleId = 11;
    
    console.log(`📤 [TEST] Probando endpoint: /financial-records/business/${businessId}/module/${moduleId}`);
    
    const response = await axios.get(`http://localhost:3000/api/v1/financial-records/business/${businessId}/module/${moduleId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('✅ [TEST] Respuesta exitosa:', response.status);
    console.log('📥 [TEST] Datos recibidos:', JSON.stringify(response.data, null, 2));
    
    if (Array.isArray(response.data)) {
      console.log(`📊 [TEST] Se encontraron ${response.data.length} registros financieros`);
    } else {
      console.log('⚠️ [TEST] La respuesta no es un array');
    }
    
  } catch (error) {
    console.error('❌ [TEST] Error en la prueba:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('URL:', error.response.config.url);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor');
      console.error('Verifica que el backend esté corriendo en http://localhost:3000');
    } else {
      console.error('Error:', error.message);
    }
  }
}

testFinancialEndpoint();
