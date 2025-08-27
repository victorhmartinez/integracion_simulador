const axios = require('axios');

async function testConsistency() {
  try {
    console.log('🧪 [CONSISTENCY-TEST] Probando consistencia de respuestas...');
    
    const testData = {
      costs: [
        { name: "Alquiler", amount: "800" },
        { name: "Luz", amount: "150" }
      ],
      businessInfo: {
        tipoNegocio: "Restaurante",
        tamano: "Pequeño",
        ubicacion: "Quito"
      }
    };

    console.log('📤 [CONSISTENCY-TEST] Datos de prueba:', JSON.stringify(testData, null, 2));
    console.log('🔄 [CONSISTENCY-TEST] Ejecutando 3 pruebas consecutivas...\n');

    const responses = [];

    // Ejecutar 3 pruebas consecutivas
    for (let i = 1; i <= 3; i++) {
      console.log(`--- Prueba ${i} ---`);
      
      const response = await axios.post('http://localhost:3000/api/v1/ai/validate-costs', testData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const costosFaltantes = response.data.costos_obligatorios_faltantes || [];
      const nombresFaltantes = costosFaltantes.map(c => c.nombre).sort();
      
      console.log(`✅ Respuesta ${i}: ${response.status}`);
      console.log(`📊 Costos faltantes (${costosFaltantes.length}): ${nombresFaltantes.join(', ')}`);
      
      responses.push({
        test: i,
        costosFaltantes: nombresFaltantes,
        count: costosFaltantes.length
      });

      // Esperar 1 segundo entre pruebas
      if (i < 3) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log('\n📋 [CONSISTENCY-TEST] Análisis de consistencia:');
    
    // Verificar si todas las respuestas son iguales
    const firstResponse = responses[0];
    const allSame = responses.every(r => 
      r.count === firstResponse.count && 
      JSON.stringify(r.costosFaltantes) === JSON.stringify(firstResponse.costosFaltantes)
    );

    if (allSame) {
      console.log('✅ [CONSISTENCY-TEST] RESULTADO: Respuestas CONSISTENTES');
      console.log(`📊 Costos faltantes consistentes: ${firstResponse.costosFaltantes.join(', ')}`);
    } else {
      console.log('❌ [CONSISTENCY-TEST] RESULTADO: Respuestas INCONSISTENTES');
      responses.forEach(r => {
        console.log(`  Prueba ${r.test}: ${r.costosFaltantes.join(', ')} (${r.count} costos)`);
      });
    }

    // Verificar que solo aparecen los 7 costos básicos
    const costosBasicos = ['Alquiler', 'Luz', 'Agua', 'Internet', 'Seguros', 'Patentes', 'Permisos'];
    const allResponses = responses.flatMap(r => r.costosFaltantes);
    const costosNoBasicos = allResponses.filter(c => !costosBasicos.includes(c));
    
    if (costosNoBasicos.length === 0) {
      console.log('✅ [CONSISTENCY-TEST] Solo costos básicos detectados');
    } else {
      console.log('❌ [CONSISTENCY-TEST] Costos no básicos detectados:', costosNoBasicos);
    }

  } catch (error) {
    console.error('❌ [CONSISTENCY-TEST] Error en la prueba de consistencia:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testConsistency();
