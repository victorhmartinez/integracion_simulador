import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AprendizajeService } from '../services/aprendizaje.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('aprendizaje')
@Controller('aprendizaje')
export class AprendizajeController {
  constructor(private readonly aprendizajeService: AprendizajeService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los aprendizajes disponibles' })
  @ApiResponse({ status: 200, description: 'Lista de aprendizajes obtenida con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findAll() {
    try {
      console.log('📚 [BACKEND] GET /aprendizaje - Solicitando todos los aprendizajes');
      
      const result = await this.aprendizajeService.findAllAprendizajes();
      
      console.log(`✅ [BACKEND] Se encontraron ${result.length} aprendizajes:`, result);
      
      return result;
    } catch (error) {
      console.error('💥 [BACKEND] Error al obtener aprendizajes:', error);
      throw new HttpException(
        'Error al obtener la lista de aprendizajes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un aprendizaje por su ID' })
  @ApiParam({ name: 'id', description: 'El ID del aprendizaje a buscar', type: Number })
  @ApiResponse({ status: 200, description: 'Aprendizaje encontrado.' })
  @ApiResponse({ status: 404, description: 'Aprendizaje no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      console.log(`🔍 [BACKEND] GET /aprendizaje/${id} - Buscando aprendizaje por ID`);
      
      const aprendizaje = await this.aprendizajeService.findAprendizajeById(id);
      
      console.log(`✅ [BACKEND] Aprendizaje encontrado:`, aprendizaje);
      return aprendizaje;
    } catch (error) {
      console.error(`💥 [BACKEND] Error al buscar aprendizaje con ID ${id}:`, error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error al obtener el aprendizaje',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/modulos')
  @ApiOperation({ summary: 'Obtener todos los módulos de un aprendizaje específico' })
  @ApiParam({ name: 'id', description: 'ID del aprendizaje', type: Number })
  @ApiResponse({ status: 200, description: 'Lista de módulos del aprendizaje.' })
  @ApiResponse({ status: 404, description: 'Aprendizaje no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findModulosByAprendizaje(@Param('id', ParseIntPipe) id: number) {
    try {
      console.log(`📚 [BACKEND] GET /aprendizaje/${id}/modulos - Buscando módulos del aprendizaje`);
      
      const modulos = await this.aprendizajeService.findModulosByAprendizajeId(id);
      
      console.log(`✅ [BACKEND] Se encontraron ${modulos.length} módulos para el aprendizaje ${id}:`, modulos);
      
      return modulos;
    } catch (error) {
      console.error(`💥 [BACKEND] Error al buscar módulos del aprendizaje ${id}:`, error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error al obtener los módulos del aprendizaje',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':aprendizajeId/modulos/:negocioId/progreso')
  @ApiOperation({ summary: 'Obtener módulos de un aprendizaje con el progreso de un negocio específico' })
  @ApiParam({ name: 'aprendizajeId', description: 'ID del aprendizaje', type: Number })
  @ApiParam({ name: 'negocioId', description: 'ID del negocio', type: Number })
  @ApiResponse({ status: 200, description: 'Módulos con progreso del negocio.' })
  @ApiResponse({ status: 404, description: 'Aprendizaje o negocio no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getModulosWithProgress(
    @Param('aprendizajeId', ParseIntPipe) aprendizajeId: number,
    @Param('negocioId', ParseIntPipe) negocioId: number
  ) {
    try {
      console.log(`📊 [BACKEND] GET /aprendizaje/${aprendizajeId}/modulos/${negocioId}/progreso - Obteniendo módulos con progreso`);
      
      const modulosWithProgress = await this.aprendizajeService.getModulosWithProgress(aprendizajeId, negocioId);
      
      console.log(`✅ [BACKEND] Módulos con progreso obtenidos:`, modulosWithProgress);
      
      return modulosWithProgress;
    } catch (error) {
      console.error(`💥 [BACKEND] Error al obtener módulos con progreso:`, error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error al obtener los módulos con progreso',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

@ApiTags('modulos')
@Controller('modulos')
export class ModuloController {
  constructor(private readonly aprendizajeService: AprendizajeService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un módulo por su ID' })
  @ApiParam({ name: 'id', description: 'El ID del módulo a buscar', type: Number })
  @ApiResponse({ status: 200, description: 'Módulo encontrado.' })
  @ApiResponse({ status: 404, description: 'Módulo no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      console.log(`🔍 [BACKEND] GET /modulos/${id} - Buscando módulo por ID`);
      
      const modulo = await this.aprendizajeService.findModuloById(id);
      
      console.log(`✅ [BACKEND] Módulo encontrado:`, modulo);
      return modulo;
    } catch (error) {
      console.error(`💥 [BACKEND] Error al buscar módulo con ID ${id}:`, error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error al obtener el módulo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
