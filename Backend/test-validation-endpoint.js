const axios = require('axios');

async function testValidationEndpoint() {
  try {
    console.log('🧪 [TEST-VALIDATION] Probando endpoint de guardado de validación...');
    
    const testData = {
      negocioId: 1,
      moduloId: 1,
      costosValidados: [
        {
          costo_recibido: "Alquiler",
          valor_recibido: "$800",
          es_valido: true,
          justificacion: "Es uno de los 7 costos básicos obligatorios",
          categoria: "costo básico"
        },
        {
          costo_recibido: "Luz",
          valor_recibido: "$150",
          es_valido: true,
          justificacion: "Es uno de los 7 costos básicos obligatorios",
          categoria: "costo básico"
        }
      ],
      costosFaltantes: [
        {
          nombre: "Agua",
          descripcion: "Servicio de agua potable",
          motivo_critico: "Es obligatorio para operar legalmente en Quito",
          valor_estimado: "$20-80/mes",
          prioridad: "alta"
        },
        {
          nombre: "Internet",
          descripcion: "Servicio de internet",
          motivo_critico: "Es obligatorio para operar legalmente en Quito",
          valor_estimado: "$30-100/mes",
          prioridad: "alta"
        }
      ],
      resumenValidacion: {
        mensaje_general: "Validación de los 7 costos básicos obligatorios completada",
        puede_proseguir_analisis: false,
        razones_para_no_proseguir: ["Faltan costos básicos: Agua, Internet"],
        acciones_requeridas: ["Agregar los costos básicos faltantes: Agua, Internet"],
        puntuacion_global: "5"
      },
      puntuacionGlobal: 5,
      puedeProseguirAnalisis: false
    };

    console.log('📤 [TEST-VALIDATION] Enviando datos:', JSON.stringify(testData, null, 2));

    // Probar guardado
    const saveResponse = await axios.post('http://localhost:3000/api/v1/validation-results', testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ [TEST-VALIDATION] Guardado exitoso:', saveResponse.status);
    console.log('📥 [TEST-VALIDATION] Respuesta de guardado:', JSON.stringify(saveResponse.data, null, 2));

    // Probar obtención por negocio y módulo
    console.log('\n🔍 [TEST-VALIDATION] Probando obtención por negocio y módulo...');
    const getResponse = await axios.get(`http://localhost:3000/api/v1/validation-results/business/${testData.negocioId}/module/${testData.moduloId}`);

    console.log('✅ [TEST-VALIDATION] Obtención exitosa:', getResponse.status);
    console.log('📥 [TEST-VALIDATION] Datos obtenidos:', JSON.stringify(getResponse.data, null, 2));

    // Probar obtención por negocio
    console.log('\n🔍 [TEST-VALIDATION] Probando obtención por negocio...');
    const getAllResponse = await axios.get(`http://localhost:3000/api/v1/validation-results/business/${testData.negocioId}`);

    console.log('✅ [TEST-VALIDATION] Obtención por negocio exitosa:', getAllResponse.status);
    console.log('📥 [TEST-VALIDATION] Total de validaciones:', getAllResponse.data.data.length);

  } catch (error) {
    console.error('❌ [TEST-VALIDATION] Error en la prueba:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testValidationEndpoint();
