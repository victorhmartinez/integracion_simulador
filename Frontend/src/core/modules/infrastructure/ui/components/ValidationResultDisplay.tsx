// Archivo: ValidationResultDisplay.tsx (NUEVO ARCHIVO)

import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaLightbulb } from 'react-icons/fa';
import type { ValidationResult } from '../../../domain/entities/ValidationResult';

interface ValidationResultDisplayProps {
  data: ValidationResult;
}

export const ValidationResultDisplay: React.FC<ValidationResultDisplayProps> = ({ data }) => {
  return (
    <div className="space-y-6 text-left max-h-[70vh] overflow-y-auto p-1">
  

      {/* 2. Validación de Costos Básicos */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-3">📊 Costos Básicos Auditados</h3>
        <div className="space-y-3">
          {data.validacion_de_costos.map((item) => (
            <div key={item.costo_recibido} className={`bg-white p-4 rounded-lg shadow border ${
              item.es_valido ? 'border-green-200' : 'border-red-200'
            }`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-blue-800">{item.costo_recibido} ({item.valor_recibido})</h4>
                  {item.categoria && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {item.categoria}
                    </span>
                  )}
                </div>
                {item.es_valido ? (
                  <span className="flex items-center gap-1 text-sm font-bold text-green-600">
                    <FaCheckCircle /> Válido
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sm font-bold text-red-600">
                    <FaTimesCircle /> Inválido
                  </span>
                )}
              </div>
              <p className="text-gray-700 text-sm mb-2">{item.justificacion}</p>
              {!item.es_valido && item.sugerencia_correccion && (
                <div className="bg-yellow-50 border-l-3 border-yellow-400 p-2 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>💡 Sugerencia:</strong> {item.sugerencia_correccion}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Costos Básicos Faltantes */}
      {data.costos_obligatorios_faltantes?.length > 0 && (
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-3">🚨 Costos Básicos Faltantes</h3>
          <ul className="space-y-3">
            {data.costos_obligatorios_faltantes.map((costo) => (
              <li key={costo.nombre} className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-red-800">{costo.nombre}</h4>
                                     <span className="text-xs px-2 py-1 rounded font-bold bg-red-200 text-red-800">
                     BÁSICO
                   </span>
                </div>
                <p className="text-gray-700 mb-2">{costo.descripcion}</p>
                                 <div className="mt-2 text-sm text-red-700 mb-2">
                   <strong className="flex items-center gap-1"><FaExclamationTriangle /> Obligatorio:</strong> {costo.motivo_critico}
                 </div>
                {costo.valor_estimado && (
                  <div className="text-sm text-gray-600">
                    <strong>💰 Valor estimado:</strong> {costo.valor_estimado}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}



         {/* 1. Resumen de Validación */}
       <section>
         <h3 className="text-xl font-bold text-gray-800 mb-2">📋 Resumen de Costos Básicos</h3>
        <div className={`p-4 rounded-lg border-l-4 ${
          data.resumen_validacion.puede_proseguir_analisis 
            ? 'bg-green-50 border-green-500' 
            : 'bg-red-50 border-red-500'
        }`}>
          <div className="flex justify-between items-start mb-3">
            <p className="font-medium">{data.resumen_validacion.mensaje_general}</p>
            {data.resumen_validacion.puntuacion_global && (
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {data.resumen_validacion.puntuacion_global}/10
                </div>
                <div className="text-xs text-gray-600">Puntuación</div>
              </div>
            )}
          </div>
          
          {!data.resumen_validacion.puede_proseguir_analisis && data.resumen_validacion.razones_para_no_proseguir && (
            <div className="mt-3 p-3 bg-red-100 rounded">
              <h4 className="font-semibold text-red-800 mb-2">🚫 Razones para no proseguir:</h4>
              <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                {data.resumen_validacion.razones_para_no_proseguir.map((razon, index) => (
                  <li key={index}>{razon}</li>
                ))}
              </ul>
            </div>
          )}
          
          {data.resumen_validacion.acciones_requeridas && data.resumen_validacion.acciones_requeridas.length > 0 && (
            <div className="mt-3 p-3 bg-yellow-100 rounded">
              <h4 className="font-semibold text-yellow-800 mb-2">✅ Acciones requeridas:</h4>
              <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                {data.resumen_validacion.acciones_requeridas.map((accion, index) => (
                  <li key={index}>{accion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};