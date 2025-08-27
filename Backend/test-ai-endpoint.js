const axios = require('axios');

async function testAiEndpoint() {
  try {
    console.log('🧪 [TEST] Probando endpoint de validación de costos...');
    
    const testData = {
      costs: [
        { name: "Alquiler", amount: "800" },
        { name: "Servicios básicos", amount: "150" }
      ],
      businessInfo: {
        tipoNegocio: "Restaurante",
        tamano: "Pequeño",
        ubicacion: "Quito"
      }
    };

         console.log('📤 [TEST] Enviando datos:', JSON.stringify(testData, null, 2));
     console.log('🎯 [TEST] Esperando validación de costos básicos (Alquiler, Luz, Agua, Internet, Seguros, Patentes, Permisos)...');

     const response = await axios.post('http://localhost:3000/api/v1/ai/validate-costs', testData, {
       headers: {
         'Content-Type': 'application/json'
       }
     });

     console.log('✅ [TEST] Respuesta exitosa:', response.status);
     console.log('📥 [TEST] Datos recibidos:', JSON.stringify(response.data, null, 2));
     
           // Verificar que solo hay costos básicos
      if (response.data.costos_obligatorios_faltantes) {
        console.log('🔍 [TEST] Costos básicos faltantes encontrados:', response.data.costos_obligatorios_faltantes.length);
        response.data.costos_obligatorios_faltantes.forEach((costo, index) => {
          console.log(`  ${index + 1}. ${costo.nombre} - Tipo: Básico`);
        });
      }

  } catch (error) {
    console.error('❌ [TEST] Error en la prueba:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testAiEndpoint();
