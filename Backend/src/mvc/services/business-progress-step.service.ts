import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/database/prisma.service';

@Injectable()
export class BusinessProgressStepService {
  constructor(private readonly prisma: PrismaService) {}

  async completeModule(negocioId: number, moduloId: number) {
    try {
      console.log('🔍 [SERVICE] Buscando progreso existente:', { negocioId, moduloId });
      
      // Buscar el progreso existente
      const existingProgress = await this.prisma.negocioProgresoPaso.findFirst({
        where: {
          negocio_id: negocioId,
          modulo_id: moduloId,
        },
      });

      if (!existingProgress) {
        throw new Error('Progreso no encontrado para este negocio y módulo');
      }

      // Obtener el ID del estado "Completado" (id_estado = 3 según el seed)
      const estadoCompletado = await this.prisma.estados.findFirst({
        where: { nombre_estado: 'Completado' },
      });

      if (!estadoCompletado) {
        throw new Error('Estado "Completado" no encontrado en la base de datos');
      }

      console.log('📝 [SERVICE] Actualizando progreso a completado...');
      
      // Actualizar el progreso
      const updatedProgress = await this.prisma.negocioProgresoPaso.update({
        where: {
          id: existingProgress.id,
        },
        data: {
          id_estado: estadoCompletado.id_estado,
          fecha_completado: new Date(),
        },
        include: {
          Estados: true,
          Modulos: true,
          Negocios: true,
        },
      });

      console.log('✅ [SERVICE] Progreso actualizado exitosamente:', updatedProgress);
      
      return {
        id: updatedProgress.id,
        negocio_id: updatedProgress.negocio_id,
        modulo_id: updatedProgress.modulo_id,
        estado: updatedProgress.Estados.nombre_estado,
        fecha_completado: updatedProgress.fecha_completado,
        modulo_nombre: updatedProgress.Modulos.nombre_modulo,
        negocio_nombre: updatedProgress.Negocios.nombre_negocio,
      };
    } catch (error) {
      console.error('💥 [SERVICE] Error en completeModule:', error);
      throw error;
    }
  }
}
