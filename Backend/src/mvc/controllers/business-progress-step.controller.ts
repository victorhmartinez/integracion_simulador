import { Controller, Put, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BusinessProgressStepService } from '../services/business-progress-step.service';

@ApiTags('business-progress')
@Controller('business-progress')
export class BusinessProgressStepController {
  constructor(
    private readonly businessProgressStepService: BusinessProgressStepService,
  ) {}

  @Put(':negocioId/module/:moduloId/complete')
  @ApiOperation({ summary: 'Marcar módulo como completado' })
  @ApiParam({ name: 'negocioId', description: 'ID del negocio' })
  @ApiParam({ name: 'moduloId', description: 'ID del módulo' })
  @ApiResponse({ status: 200, description: 'Módulo marcado como completado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Progreso no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async completeModule(
    @Param('negocioId') negocioId: string,
    @Param('moduloId') moduloId: string,
  ) {
    try {
      console.log('🎯 [BACKEND] Marcando módulo como completado:', { negocioId, moduloId });
      
      const result = await this.businessProgressStepService.completeModule(
        parseInt(negocioId),
        parseInt(moduloId),
      );
      
      console.log('✅ [BACKEND] Módulo marcado como completado:', result);
      return {
        success: true,
        message: 'Módulo marcado como completado exitosamente',
        data: result,
      };
    } catch (error) {
      console.error('💥 [BACKEND] Error al marcar módulo como completado:', error);
      throw new HttpException(
        error.message || 'Error al marcar módulo como completado',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
