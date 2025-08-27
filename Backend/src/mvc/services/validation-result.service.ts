import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/database/prisma.service';
import { ValidationResultMapper } from '../models/mappers/validation-result.mapper';
import { ValidationResult } from '../models/entities/validation-result.entity';
import { SaveValidationResultDto } from '../models/dto/save-validation-result.dto';

@Injectable()
export class ValidationResultService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ValidationResultMapper,
  ) {}

  async saveValidationResult(saveDto: SaveValidationResultDto): Promise<ValidationResult> {
    console.log('💾 [VALIDATION-SERVICE] Guardando resultado de validación:', saveDto);

    const validationResultPrisma = await this.prisma.resultados_Validacion_Costos.create({
      data: {
        negocio_id: saveDto.negocioId,
        modulo_id: saveDto.moduloId,
        costos_validados: saveDto.costosValidados,
        costos_faltantes: saveDto.costosFaltantes,
        resumen_validacion: saveDto.resumenValidacion,
        puntuacion_global: saveDto.puntuacionGlobal,
        puede_proseguir_analisis: saveDto.puedeProseguirAnalisis,
      },
    });

    console.log('✅ [VALIDATION-SERVICE] Resultado de validación guardado:', validationResultPrisma);

    return this.mapper.toDomain(validationResultPrisma);
  }

  async getValidationResultByBusinessAndModule(negocioId: number, moduloId: number): Promise<ValidationResult | null> {
    console.log(`🔍 [VALIDATION-SERVICE] Buscando validación para negocio ${negocioId} y módulo ${moduloId}`);

    const validationResultPrisma = await this.prisma.resultados_Validacion_Costos.findFirst({
      where: {
        negocio_id: negocioId,
        modulo_id: moduloId,
      },
      orderBy: {
        fecha_validacion: 'desc',
      },
    });

    if (!validationResultPrisma) {
      console.log('❌ [VALIDATION-SERVICE] No se encontró validación');
      return null;
    }

    console.log('✅ [VALIDATION-SERVICE] Validación encontrada:', validationResultPrisma);
    return this.mapper.toDomain(validationResultPrisma);
  }

  async getValidationResultsByBusiness(negocioId: number): Promise<ValidationResult[]> {
    console.log(`🔍 [VALIDATION-SERVICE] Buscando todas las validaciones del negocio ${negocioId}`);

    const validationResultsPrisma = await this.prisma.resultados_Validacion_Costos.findMany({
      where: {
        negocio_id: negocioId,
      },
      orderBy: {
        fecha_validacion: 'desc',
      },
    });

    console.log(`✅ [VALIDATION-SERVICE] Encontradas ${validationResultsPrisma.length} validaciones`);
    return validationResultsPrisma.map(result => this.mapper.toDomain(result));
  }
}
