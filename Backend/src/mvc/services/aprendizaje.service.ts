import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/database/prisma.service';
import { AprendizajeMapper } from '../models/mappers/aprendizaje.mapper';
import { ModuloMapper } from '../models/mappers/modulo.mapper';
import { Aprendizaje } from '../models/entities/aprendizaje.entity';
import { Modulo } from '../models/entities/modulo.entity';

@Injectable()
export class AprendizajeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aprendizajeMapper: AprendizajeMapper,
    private readonly moduloMapper: ModuloMapper,
  ) {}

  async findAllAprendizajes(): Promise<Aprendizaje[]> {
    console.log('📚 [BACKEND-SERVICE] Buscando todos los aprendizajes en base de datos');
    
    const aprendizajesPrisma = await this.prisma.aprendizaje.findMany();
    
    console.log(`💾 [BACKEND-SERVICE] Se encontraron ${aprendizajesPrisma.length} aprendizajes:`, aprendizajesPrisma);
    
    const mappedAprendizajes = aprendizajesPrisma.map((a) => this.aprendizajeMapper.toDomain(a));
    console.log(`🔄 [BACKEND-SERVICE] Aprendizajes mapeados a dominio:`, mappedAprendizajes);
    
    return mappedAprendizajes;
  }

  async findAprendizajeById(id: number): Promise<Aprendizaje> {
    console.log(`🔍 [BACKEND-SERVICE] Buscando aprendizaje con ID ${id} en base de datos`);
    
    const aprendizajePrisma = await this.prisma.aprendizaje.findUnique({
      where: { id_aprendizaje: id },
    });

    if (!aprendizajePrisma) {
      console.log(`❌ [BACKEND-SERVICE] Aprendizaje con ID ${id} no encontrado en base de datos`);
      throw new NotFoundException(`Aprendizaje with ID ${id} not found.`);
    }

    console.log(`💾 [BACKEND-SERVICE] Aprendizaje encontrado en base de datos:`, aprendizajePrisma);
    
    const mappedAprendizaje = this.aprendizajeMapper.toDomain(aprendizajePrisma);
    console.log(`🔄 [BACKEND-SERVICE] Aprendizaje mapeado a dominio:`, mappedAprendizaje);
    
    return mappedAprendizaje;
  }

  async findModulosByAprendizajeId(aprendizajeId: number): Promise<Modulo[]> {
    console.log(`📚 [BACKEND-SERVICE] Buscando módulos del aprendizaje ${aprendizajeId} en base de datos`);
    
    const modulosPrisma = await this.prisma.modulos.findMany({
      where: { id_aprendizaje: aprendizajeId },
      orderBy: { orden_modulo: 'asc' }
    });
    
    console.log(`💾 [BACKEND-SERVICE] Se encontraron ${modulosPrisma.length} módulos para el aprendizaje ${aprendizajeId}:`, modulosPrisma);
    
    const mappedModulos = modulosPrisma.map((m) => this.moduloMapper.toDomain(m));
    console.log(`🔄 [BACKEND-SERVICE] Módulos mapeados a dominio:`, mappedModulos);
    
    return mappedModulos;
  }

  async findModuloById(id: number): Promise<Modulo> {
    console.log(`🔍 [BACKEND-SERVICE] Buscando módulo con ID ${id} en base de datos`);
    
    const moduloPrisma = await this.prisma.modulos.findUnique({
      where: { id_modulo: id },
    });

    if (!moduloPrisma) {
      console.log(`❌ [BACKEND-SERVICE] Módulo con ID ${id} no encontrado en base de datos`);
      throw new NotFoundException(`Modulo with ID ${id} not found.`);
    }

    console.log(`💾 [BACKEND-SERVICE] Módulo encontrado en base de datos:`, moduloPrisma);
    
    const mappedModulo = this.moduloMapper.toDomain(moduloPrisma);
    console.log(`🔄 [BACKEND-SERVICE] Módulo mapeado a dominio:`, mappedModulo);
    
    return mappedModulo;
  }

  async getModulosWithProgress(aprendizajeId: number, negocioId: number): Promise<any[]> {
    console.log(`📊 [BACKEND-SERVICE] Obteniendo módulos con progreso para aprendizaje ${aprendizajeId} y negocio ${negocioId}`);
    
    const modulosWithProgress = await this.prisma.modulos.findMany({
      where: { id_aprendizaje: aprendizajeId },
      include: {
        NegocioProgresoPaso: {
          where: { negocio_id: negocioId },
          include: {
            Estados: true
          }
        }
      },
      orderBy: { orden_modulo: 'asc' }
    });
    
    console.log(`💾 [BACKEND-SERVICE] Módulos con progreso encontrados:`, modulosWithProgress);
    
    // Mapear y determinar el estado de cada módulo
    const mappedModulos = modulosWithProgress.map((modulo) => {
      const mappedModulo = this.moduloMapper.toDomain(modulo);
      const progreso = modulo.NegocioProgresoPaso[0];
      
      let status = 'LOCKED';
      if (progreso) {
        switch (progreso.Estados.nombre_estado) {
          case 'Completado':
            status = 'COMPLETED';
            break;
          case 'En Progreso':
            status = 'IN_PROGRESS';
            break;
          default:
            status = 'LOCKED';
        }
      } else {
        // Si no hay progreso, el primer módulo está disponible
        if (modulo.orden_modulo === 1) {
          status = 'IN_PROGRESS';
        }
      }
      
      return {
        ...mappedModulo,
        status
      };
    });
    
    console.log(`🔄 [BACKEND-SERVICE] Módulos con estado mapeados:`, mappedModulos);
    
    return mappedModulos;
  }
}
