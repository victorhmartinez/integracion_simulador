import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { ActionPlanResult } from './entities/action-plan-result.entity';
import { CreateActionPlanResultDto } from './dto/create-action-plan-result.dto';
import { UpdateActionPlanResultDto } from './dto/update-action-plan-result.dto';
import { ActionPlanResultMapper } from './mappers/action-plan-result.mapper';

@Injectable()
export class ActionPlanResultService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ActionPlanResultMapper,
  ) {}

  async create(createDto: CreateActionPlanResultDto): Promise<ActionPlanResult> {
    const prismaResult = await this.prisma.resultados_Plan_Accion.create({
      data: {
        analisis_id: createDto.analysisId,
        titulo: createDto.title,
        descripcion: createDto.description,
        prioridad: createDto.priority,
      },
    });
    return this.mapper.toDomain(prismaResult);
  }

  async findAll(): Promise<ActionPlanResult[]> {
    const prismaResults = await this.prisma.resultados_Plan_Accion.findMany();
    return prismaResults.map(this.mapper.toDomain);
  }

  async findById(id: number): Promise<ActionPlanResult> {
    const prismaResult = await this.prisma.resultados_Plan_Accion.findUnique({
      where: { plan_id: id },
    });
    if (!prismaResult) {
      throw new NotFoundException(`Action plan result with ID ${id} not found.`);
    }
    return this.mapper.toDomain(prismaResult);
  }

  async findByAnalysisId(analysisId: number): Promise<ActionPlanResult[]> {
    const prismaResults = await this.prisma.resultados_Plan_Accion.findMany({
      where: { analisis_id: analysisId },
    });
    return prismaResults.map(this.mapper.toDomain);
  }

  async update(id: number, updateDto: UpdateActionPlanResultDto): Promise<ActionPlanResult> {
    await this.findById(id); // Verifica si el registro existe
    const updatedResult = await this.prisma.resultados_Plan_Accion.update({
      where: { plan_id: id },
      data: {
        titulo: updateDto.title,
        descripcion: updateDto.description,
        prioridad: updateDto.priority,
      },
    });
    return this.mapper.toDomain(updatedResult);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id); // Verifica si el registro existe
    await this.prisma.resultados_Plan_Accion.delete({
      where: { plan_id: id },
    });
  }
}