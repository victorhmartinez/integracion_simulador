const axios = require('axios');

async function testFinancialRecordsEndpoint() {
  try {
    console.log('🧪 [TEST-FINANCIAL] Probando endpoint de registros financieros...');
    
    const businessId = 1;
    const moduleId = 1;
    
    console.log(`📤 [TEST-FINANCIAL] Solicitando registros para negocio ${businessId} y módulo ${moduleId}...`);
    
    const response = await axios.get(`http://localhost:3000/api/v1/financial-records/business/${businessId}/module/${moduleId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ [TEST-FINANCIAL] Respuesta exitosa:', response.status);
    console.log('📥 [TEST-FINANCIAL] Datos recibidos:', JSON.stringify(response.data, null, 2));
    
    if (Array.isArray(response.data)) {
      console.log(`📊 [TEST-FINANCIAL] Se encontraron ${response.data.length} registros financieros`);
      
      if (response.data.length > 0) {
        console.log('📋 [TEST-FINANCIAL] Primer registro:');
        console.log(`   - ID: ${response.data[0].id}`);
        console.log(`   - Nombre: ${response.data[0].name}`);
        console.log(`   - Monto: ${response.data[0].amount}`);
        console.log(`   - Negocio ID: ${response.data[0].businessId}`);
        console.log(`   - Módulo ID: ${response.data[0].moduleId}`);
      }
    } else {
      console.log('⚠️ [TEST-FINANCIAL] La respuesta no es un array');
    }
    
  } catch (error) {
    console.error('❌ [TEST-FINANCIAL] Error en la prueba:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testFinancialRecordsEndpoint();
