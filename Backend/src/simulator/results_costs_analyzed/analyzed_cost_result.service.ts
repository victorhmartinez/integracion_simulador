import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { ResultadosCostosAnalizados } from './entities/results_costs_analyzed';
import { CreateAnalyzedCostResultDto } from './dto/create-results_costs_analyzed.dto';
import { UpdateAnalyzedCostResultDto } from './dto/update-results_costs_analyzed.dto';
import { AnalyzedCostResultMapper } from './mappers/analyzed_cost_result.mapper';

@Injectable()
export class AnalyzedCostResultService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: AnalyzedCostResultMapper,
  ) {}

  async create(createDto: CreateAnalyzedCostResultDto): Promise<ResultadosCostosAnalizados> {
    const prismaResult = await this.prisma.resultados_Costos_Analizados.create({
      data: {
        analisis_id: createDto.analysisId,
        nombre_costo: createDto.costName,
        valor_recibido: createDto.receivedValue,
        rango_estimado: createDto.estimatedRange,
        evaluacion: createDto.evaluation,
        comentario: createDto.comment,
      },
    });
    return this.mapper.toDomain(prismaResult);
  }

  async findAll(): Promise<ResultadosCostosAnalizados[]> {
    const prismaResults = await this.prisma.resultados_Costos_Analizados.findMany();
    return prismaResults.map(this.mapper.toDomain);
  }

  async findById(id: number): Promise<ResultadosCostosAnalizados> {
    const prismaResult = await this.prisma.resultados_Costos_Analizados.findUnique({
      where: { resultado_costo_id: id },
    });
    if (!prismaResult) {
      throw new NotFoundException(`Analyzed cost result with ID ${id} not found.`);
    }
    return this.mapper.toDomain(prismaResult);
  }

  async findByAnalysisId(analysisId: number): Promise<ResultadosCostosAnalizados[]> {
    const prismaResults = await this.prisma.resultados_Costos_Analizados.findMany({
      where: { analisis_id: analysisId },
    });
    return prismaResults.map(this.mapper.toDomain);
  }

  async update(id: number, updateDto: UpdateAnalyzedCostResultDto): Promise<ResultadosCostosAnalizados> {
    await this.findById(id); // Verifica si el registro existe
    const updatedResult = await this.prisma.resultados_Costos_Analizados.update({
      where: { resultado_costo_id: id },
      data: {
        nombre_costo: updateDto.costName,
        valor_recibido: updateDto.receivedValue,
        rango_estimado: updateDto.estimatedRange,
        evaluacion: updateDto.evaluation,
        comentario: updateDto.comment,
      },
    });
    return this.mapper.toDomain(updatedResult);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id); // Verifica si el registro existe
    await this.prisma.resultados_Costos_Analizados.delete({
      where: { resultado_costo_id: id },
    });
  }
}