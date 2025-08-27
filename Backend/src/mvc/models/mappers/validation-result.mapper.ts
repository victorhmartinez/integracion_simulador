import { Injectable } from '@nestjs/common';
import { ValidationResult } from '../entities/validation-result.entity';

@Injectable()
export class ValidationResultMapper {
  toDomain(prismaValidationResult: any): ValidationResult {
    return new ValidationResult(
      prismaValidationResult.negocio_id,
      prismaValidationResult.modulo_id,
      prismaValidationResult.puede_proseguir_analisis,
      prismaValidationResult.validacion_id,
      prismaValidationResult.fecha_validacion,
      prismaValidationResult.costos_validados,
      prismaValidationResult.costos_faltantes,
      prismaValidationResult.resumen_validacion,
      prismaValidationResult.puntuacion_global,
    );
  }

  toPrisma(validationResult: ValidationResult): any {
    return {
      negocio_id: validationResult.negocioId,
      modulo_id: validationResult.moduloId,
      fecha_validacion: validationResult.fechaValidacion,
      costos_validados: validationResult.costosValidados,
      costos_faltantes: validationResult.costosFaltantes,
      resumen_validacion: validationResult.resumenValidacion,
      puntuacion_global: validationResult.puntuacionGlobal,
      puede_proseguir_analisis: validationResult.puedeProseguirAnalisis,
    };
  }
}
