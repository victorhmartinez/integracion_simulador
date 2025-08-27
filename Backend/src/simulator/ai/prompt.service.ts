import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptService {
  
  /**
   * Genera el prompt optimizado para validación rápida con retroalimentación detallada
   */
  generateValidationPrompt(
    costs: Array<{ name: string; amount: string }>,
    businessInfo: { tipoNegocio: string; tamano: string; ubicacion: string }
  ): string {
    const listaCostos = costs
      .map(c => c.name && c.amount ? `${c.name.trim()}: $${c.amount}` : null)
      .filter(Boolean)
      .join('\n');

    return `Rol: Auditor financiero experto en validación de costos básicos para ${businessInfo.tipoNegocio} en ${businessInfo.ubicacion}.

Contexto: Analizando costos fijos básicos de un ${businessInfo.tipoNegocio} (${businessInfo.tamano}) ubicado en ${businessInfo.ubicacion}.

Costos proporcionados:
${listaCostos}

Tarea: Validar EXACTAMENTE los 7 costos básicos obligatorios y identificar los que faltan.

Reglas de Validación OBLIGATORIAS:
1. **Solo estos 7 costos básicos**: Alquiler, Luz, Agua, Internet, Seguros, Patentes, Permisos
2. **Excluir TODOS los demás**: Salarios, contabilidad, costos variables, costos operativos, servicios básicos, etc.
3. **Validar cada costo recibido**: Si no es uno de los 7 básicos, marcarlo como inválido
4. **Identificar faltantes**: Listar TODOS los costos básicos que no están en la lista proporcionada
5. **Valores realistas**: Para ${businessInfo.ubicacion}, valores típicos:
   - Alquiler: $500-2000/mes
   - Luz: $50-200/mes
   - Agua: $20-80/mes
   - Internet: $30-100/mes
   - Seguros: $50-300/mes
   - Patentes: $100-500/año
   - Permisos: $200-1000/año

IMPORTANTE: Siempre verificar los mismos 7 costos básicos. No agregar ni quitar costos de esta lista.

Responde SOLO JSON con estructura EXACTA:
{
  "validacion_de_costos": [
    {
      "costo_recibido": "nombre exacto del costo recibido",
      "valor_recibido": "$valor",
      "es_valido": true/false,
      "justificacion": "Si es válido: 'Es uno de los 7 costos básicos obligatorios'. Si es inválido: 'No es uno de los 7 costos básicos obligatorios'",
      "sugerencia_correccion": "Si es inválido: 'Reemplazar con uno de los 7 costos básicos: Alquiler, Luz, Agua, Internet, Seguros, Patentes, Permisos'",
      "categoria": "costo básico"
    }
  ],
  "costos_obligatorios_faltantes": [
    {
      "nombre": "Nombre exacto del costo básico faltante (solo uno de los 7)",
      "descripcion": "Descripción estándar del costo básico",
      "motivo_critico": "Es obligatorio para operar legalmente en ${businessInfo.ubicacion}",
      "valor_estimado": "Rango específico según la tabla de valores arriba",
      "prioridad": "alta"
    }
  ],
  "resumen_validacion": {
    "mensaje_general": "Validación de los 7 costos básicos obligatorios completada",
    "puede_proseguir_analisis": true/false,
    "razones_para_no_proseguir": ["Lista específica de costos básicos faltantes"],
    "acciones_requeridas": ["Agregar los costos básicos faltantes: [lista de nombres]"],
    "puntuacion_global": "1-10 (10 = todos los 7 costos básicos presentes)"
  }
}

NOTA: Siempre verificar los mismos 7 costos básicos. La respuesta debe ser consistente.`;
  }

  /**
   * Genera el prompt para análisis detallado con formato específico
   */
  generateAnalysisPrompt(
    costs: Array<{ name: string; amount: string }>,
    businessInfo: { tipoNegocio: string; tamano: string; ubicacion: string },
    validationResult: any
  ): string {
    const listaCostos = costs
      .map(c => c.name && c.amount ? `${c.name.trim()}: $${c.amount}` : null)
      .filter(Boolean)
      .join('\n');

    return `Rol: Asesor financiero especializado en análisis de costos para ${businessInfo.tipoNegocio} en ${businessInfo.ubicacion}.

Contexto: ${businessInfo.tipoNegocio} (${businessInfo.tamano}) en ${businessInfo.ubicacion}
Costos a analizar: ${listaCostos}

Tarea: Realizar análisis comparativo de mercado y evaluación de riesgos operativos.

Rangos de mercado para ${businessInfo.ubicacion}:
- Alquiler: $500-2000/mes (depende de zona y tamaño)
- Luz: $50-200/mes (depende de consumo)
- Agua: $20-80/mes (depende de consumo)
- Internet: $30-100/mes (depende de velocidad)
- Seguros: $50-300/mes (depende de cobertura)
- Patentes: $100-500/año (depende de actividad)
- Permisos: $200-1000/año (depende de tipo de negocio)

Responde SOLO JSON con estructura EXACTA:

{
  "analisis_costos": {
    "Alquiler": {
      "valor_recibido": "$500",
      "rango_estimado_zona_especifica": "$500-1500/mes para ${businessInfo.tamano} en ${businessInfo.ubicacion}",
      "evaluacion": "Dentro del rango",
      "analisis": "El valor de alquiler de $500 se encuentra dentro del rango esperado para un ${businessInfo.tamano} en una zona comercial/residencial de ${businessInfo.ubicacion}. Este valor es competitivo y representa una ventaja en la estructura de costos fijos."
    },
    "Internet": {
      "valor_recibido": "$80",
      "rango_estimado_zona_especifica": "$30-100/mes para fibra óptica empresarial",
      "evaluacion": "Fuera del rango",
      "analisis": "El costo de internet de $80 mensuales está por encima del promedio del mercado para paquetes de fibra óptica de grado empresarial en ${businessInfo.ubicacion}. Los planes competitivos suelen oscilar entre $45 y $70 para empresas."
    }
  },
  "riesgos_identificados": [
    {
      "nombre": "Sobrecosto por Clasificación Regulatoria Errónea o Ineficiente",
      "causa": "El costo de Bomberos está muy por encima del promedio del mercado, lo que sugiere una posible clasificación errónea de la actividad o un error en el cálculo del valor.",
      "probabilidad": "Alta",
      "impacto": "Erosión significativa y recurrente de la rentabilidad debido a pagos regulatorios excesivos. Riesgo de multas si la base de cálculo es incorrecta.",
      "consecuencias": "Pérdidas anuales estimadas de $240 a $300 solo en el rubro de Bomberos si el costo real es el promedio de mercado."
    },
    {
      "nombre": "Ineficiencia en la Contratación y Gestión de Servicios de Telecomunicaciones",
      "causa": "El costo de Internet de $80 mensuales está 'Fuera del rango' superior del mercado en ${businessInfo.ubicacion} para un servicio estándar de fibra óptica empresarial.",
      "probabilidad": "Alta",
      "impacto": "Reducción directa del margen operativo y del capital disponible para reinversión. Se está pagando más por un servicio que probablemente podría obtenerse a un costo menor.",
      "consecuencias": "Pérdida de entre $10 y $25 mensuales, lo que se traduce en $120 a $300 anuales en un costo fijo fácilmente optimizable."
    }
  ]
}

IMPORTANTE: 
1. Analiza cada costo recibido comparándolo con los rangos de mercado
2. Identifica riesgos específicos basados en costos fuera de rango
3. Proporciona análisis detallado para cada costo
4. Usa el formato exacto mostrado arriba`;
  }

  /**
   * Genera el prompt para análisis final con plan de acción específico
   */
  generateFinalAnalysisPrompt(
    costs: Array<{ name: string; amount: string }>,
    businessInfo: { tipoNegocio: string; tamano: string; ubicacion: string },
    previousResults: any
  ): string {
    const listaCostos = costs
      .map(c => c.name && c.amount ? `${c.name.trim()}: $${c.amount}` : null)
      .filter(Boolean)
      .join('\n');

    return `Basado en el análisis previo, genera un plan de acción específico para ${businessInfo.tipoNegocio} (${businessInfo.tamano}) en ${businessInfo.ubicacion}.

Costos analizados: ${listaCostos}

Genera un plan de acción detallado con acciones específicas, prioridades, plazos e inversiones estimadas.

Responde SOLO JSON con estructura EXACTA:

{
  "plan_accion": {
    "Auditoría Urgente y Reclasificación de Tasas de Bomberos y ARCSA": [
      {
        "descripcion": "Contactar al Cuerpo de Bomberos de ${businessInfo.ubicacion} para obtener el desglose y la justificación del costo de $30 mensuales, verificando la clasificación de riesgo de la actividad y el cálculo de la tasa anual.",
        "prioridad": "Crítica",
        "plazo": "Inmediato",
        "inversion": "$0 (tiempo propio para gestión y consulta)",
        "impacto": "Reducción potencial de $20-$25 mensuales ($240-$300 anuales) en la tasa de Bomberos si se identifica un error. Claridad sobre la necesidad de ARCSA, evitando pagos innecesarios."
      }
    ],
    "Optimización del Costo de Internet Mediante Renegociación o Cambio de Proveedor": [
      {
        "descripcion": "Realizar un estudio de mercado comparativo de al menos 3 proveedores de internet en ${businessInfo.ubicacion}, buscando planes de fibra óptica empresariales con velocidades comparables, pero a precios entre $45 y $70 mensuales.",
        "prioridad": "Alta",
        "plazo": "1-3 meses",
        "inversion": "$0 - $50 (costo potencial de instalación en caso de cambio de proveedor)",
        "impacto": "Ahorro proyectado de $10-$25 mensuales ($120-$300 anuales) sin comprometer la calidad del servicio, mejorando directamente el flujo de caja y la rentabilidad del negocio."
      }
    ],
    "Clarificación y Gestión Proactiva de Permisos Municipales": [
      {
        "descripcion": "Obtener un desglose detallado de todos los permisos y licencias que conforman el costo mensual, identificando el tipo de permiso, la autoridad emisora, la fecha de emisión y la fecha de renovación.",
        "prioridad": "Media",
        "plazo": "1-3 meses",
        "inversion": "$0 (tiempo propio para gestión y consulta)",
        "impacto": "Mayor transparencia financiera, prevención de pagos innecesarios y mitigación de riesgos de multas por omisión. Potencial de ahorro de $5-$10 mensuales si se identifican permisos no obligatorios."
      }
    ]
  }
}

IMPORTANTE:
1. Genera acciones específicas y ejecutables
2. Incluye prioridades claras (Crítica, Alta, Media)
3. Especifica plazos realistas
4. Estima inversiones requeridas
5. Describe impactos esperados cuantificables
6. Usa el formato exacto mostrado arriba`;
  }
}
