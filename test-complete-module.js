const axios = require('axios');

async function testCompleteModule() {
    try {
        console.log('🎯 Probando endpoint de completar módulo...');
        
        // Usar datos de prueba (negocio 1, módulo 1)
        const negocioId = 1;
        const moduloId = 1;
        
        console.log('📤 Enviando petición para completar módulo:', { negocioId, moduloId });
        
        const response = await axios.put(`http://localhost:3000/api/v1/business-progress/${negocioId}/module/${moduloId}/complete`, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Status:', response.status);
        console.log('📊 Respuesta:', JSON.stringify(response.data, null, 2));
        
        if (response.data.success) {
            console.log('🎉 ¡Módulo marcado como completado exitosamente!');
            console.log('📋 Detalles:');
            console.log(`   - Módulo: ${response.data.data.modulo_nombre}`);
            console.log(`   - Negocio: ${response.data.data.negocio_nombre}`);
            console.log(`   - Estado: ${response.data.data.estado}`);
            console.log(`   - Fecha completado: ${response.data.data.fecha_completado}`);
        }
        
    } catch (error) {
        console.error('❌ Error:', error.response?.status);
        console.error('📄 Error response:', error.response?.data);
        console.error('🔍 Error details:', error.message);
        
        if (error.response?.data) {
            console.error('📋 Detalles del error:');
            console.error(JSON.stringify(error.response.data, null, 2));
        }
    }
}

testCompleteModule();
