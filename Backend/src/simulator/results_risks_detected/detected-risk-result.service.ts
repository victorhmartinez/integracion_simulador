import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { DetectedRiskResult } from './entities/detected-risk-result.entity';
import { CreateDetectedRiskResultDto } from './dto/create-detected-risk-result.dto';
import { UpdateDetectedRiskResultDto } from './dto/update-detected-risk-result.dto';
import { DetectedRiskResultMapper } from './mappers/detected-risk-result.mapper';

@Injectable()
export class DetectedRiskResultService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: DetectedRiskResultMapper,
  ) {}

  async create(createDto: CreateDetectedRiskResultDto): Promise<DetectedRiskResult> {
    const prismaResult = await this.prisma.resultados_Riesgos_Detectados.create({
      data: {
        analisis_id: createDto.analysisId,
        riesgo: createDto.risk,
        causa_directa: createDto.directCause,
        impacto_potencial: createDto.potentialImpact,
      },
    });
    return this.mapper.toDomain(prismaResult);
  }

  async findAll(): Promise<DetectedRiskResult[]> {
    const prismaResults = await this.prisma.resultados_Riesgos_Detectados.findMany();
    return prismaResults.map(this.mapper.toDomain);
  }

  async findById(id: number): Promise<DetectedRiskResult> {
    const prismaResult = await this.prisma.resultados_Riesgos_Detectados.findUnique({
      where: { riesgo_id: id },
    });
    if (!prismaResult) {
      throw new NotFoundException(`Detected risk result with ID ${id} not found.`);
    }
    return this.mapper.toDomain(prismaResult);
  }

  async findByAnalysisId(analysisId: number): Promise<DetectedRiskResult[]> {
    const prismaResults = await this.prisma.resultados_Riesgos_Detectados.findMany({
      where: { analisis_id: analysisId },
    });
    return prismaResults.map(this.mapper.toDomain);
  }

  async update(id: number, updateDto: UpdateDetectedRiskResultDto): Promise<DetectedRiskResult> {
    await this.findById(id); // Verifica si el registro existe
    const updatedResult = await this.prisma.resultados_Riesgos_Detectados.update({
      where: { riesgo_id: id },
      data: {
        riesgo: updateDto.risk,
        causa_directa: updateDto.directCause,
        impacto_potencial: updateDto.potentialImpact,
      },
    });
    return this.mapper.toDomain(updatedResult);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id); // Verifica si el registro existe
    await this.prisma.resultados_Riesgos_Detectados.delete({
      where: { riesgo_id: id },
    });
  }
}