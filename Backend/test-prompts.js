const axios = require('axios');

// Datos de prueba
const testCosts = [
  { name: "Alquiler", amount: "500" },
  { name: "Internet", amount: "80" },
  { name: "Arcsa", amount: "60" },
  { name: "Bomberos", amount: "30" },
  { name: "Permisos", amount: "45" },
  { name: "Luz", amount: "35" }
];

const businessInfo = {
  tipoNegocio: "Restaurante",
  tamano: "Pequeño",
  ubicacion: "Quito"
};

async function testPrompts() {
  console.log('🧪 [TEST] Probando prompts del backend...\n');

  try {
    // Test 1: Validación
    console.log('📋 [TEST] 1. Probando validación...');
    const validationResponse = await axios.post('http://localhost:3000/api/v1/ai/validate-costs', {
      costs: testCosts,
      businessInfo: businessInfo
    });
    console.log('✅ [TEST] Validación exitosa');
    console.log('📊 [TEST] Estructura de validación:', JSON.stringify(validationResponse.data, null, 2));

    // Test 2: Análisis detallado
    console.log('\n📋 [TEST] 2. Probando análisis detallado...');
    const analysisResponse = await axios.post('http://localhost:3000/api/v1/ai/analyze-costs', {
      costs: testCosts,
      businessInfo: businessInfo,
      validationResult: validationResponse.data
    });
    console.log('✅ [TEST] Análisis detallado exitoso');
    console.log('📊 [TEST] Estructura de análisis:', JSON.stringify(analysisResponse.data, null, 2));

    // Test 3: Análisis final
    console.log('\n📋 [TEST] 3. Probando análisis final...');
    const finalResponse = await axios.post('http://localhost:3000/api/v1/ai/final-analysis', {
      costs: testCosts,
      businessInfo: businessInfo,
      previousResults: {
        validation: validationResponse.data,
        analysis: analysisResponse.data
      }
    });
    console.log('✅ [TEST] Análisis final exitoso');
    console.log('📊 [TEST] Estructura de análisis final:', JSON.stringify(finalResponse.data, null, 2));

    // Test 4: Análisis completo
    console.log('\n📋 [TEST] 4. Probando análisis completo...');
    const completeResponse = await axios.post('http://localhost:3000/api/v1/ai/complete-analysis', {
      costs: testCosts,
      businessInfo: businessInfo
    });
    console.log('✅ [TEST] Análisis completo exitoso');
    console.log('📊 [TEST] Estructura completa:', JSON.stringify(completeResponse.data, null, 2));

    console.log('\n🎉 [TEST] Todos los tests completados exitosamente!');
    console.log('\n📋 [TEST] Verificar que las estructuras coincidan con el formato esperado:');
    console.log('   - validation.data.validacion_de_costos: Array de costos validados');
    console.log('   - analysis.data.analisis_costos: Objeto con análisis por costo');
    console.log('   - analysis.data.riesgos_identificados: Array de riesgos');
    console.log('   - final.data.plan_accion: Objeto con categorías de acciones');

  } catch (error) {
    console.error('❌ [TEST] Error en los tests:', error.response?.data || error.message);
    
    if (error.response?.status === 400) {
      console.log('\n🔍 [TEST] Detalles del error 400:');
      console.log('Request body:', error.config?.data);
      console.log('Response:', error.response.data);
    }
  }
}

// Ejecutar tests
testPrompts();
