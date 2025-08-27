import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/database/prisma.service';
import { BusinessMapper } from '../models/mappers/business.mapper';
import { Business } from '../models/entities/business.entity';
import { CreateBusinessDto } from '../models/dto/create-business.dto';
import { UpdateBusinessDto } from '../models/dto/update-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: BusinessMapper,
  ) {}

  async createBuisness(createDto: CreateBusinessDto): Promise<Business> {
    console.log('🏢 [BACKEND-SERVICE] Creando negocio en base de datos:', createDto);
    console.log('🔍 [BACKEND-SERVICE] Tipo de DTO:', typeof createDto);
    console.log('🔍 [BACKEND-SERVICE] Propiedades del DTO:', Object.keys(createDto));
    console.log('🔍 [BACKEND-SERVICE] Valores del DTO:', Object.values(createDto));
    
    try {
      console.log('🔍 [BACKEND-SERVICE] Datos para Prisma:', {
        usuario_id: createDto.usuarioId,
        tipo_negocio: createDto.tipoNegocio,
        nombre_negocio: createDto.nombreNegocio,
        ubicacion: createDto.ubicacion,
        id_tamano: createDto.idTamano,
      });
      
      const newBusinessPrisma = await this.prisma.negocios.create({
        data: {
          usuario_id: createDto.usuarioId,
          tipo_negocio: createDto.tipoNegocio,
          nombre_negocio: createDto.nombreNegocio,
          ubicacion: createDto.ubicacion,
          id_tamano: createDto.idTamano,
        },
      });

      console.log('💾 [BACKEND-SERVICE] Negocio creado en base de datos:', newBusinessPrisma);
      
      const mappedBusiness = this.mapper.toDomain(newBusinessPrisma);
      console.log('🔄 [BACKEND-SERVICE] Negocio mapeado a dominio:', mappedBusiness);
      
      return mappedBusiness;
    } catch (error) {
      console.error('💥 [BACKEND-SERVICE] Error al crear negocio en base de datos:', error);
      console.error('💥 [BACKEND-SERVICE] Stack trace completo:', error.stack);
      console.error('💥 [BACKEND-SERVICE] Tipo de error:', typeof error);
      console.error('💥 [BACKEND-SERVICE] Propiedades del error:', Object.keys(error));
      if (error.code) {
        console.error('💥 [BACKEND-SERVICE] Código de error:', error.code);
      }
      if (error.meta) {
        console.error('💥 [BACKEND-SERVICE] Meta del error:', error.meta);
      }
      throw error;
    }
  }

  async findById(id: number): Promise<Business> {
    console.log(`🔍 [BACKEND-SERVICE] Buscando negocio con ID ${id} en base de datos`);
    
    const businessPrisma = await this.prisma.negocios.findUnique({
      where: { negocio_id: id },
      include: {
        tamano_negocio: true, // Incluir la información del tamaño
      },
    });

    if (!businessPrisma) {
      console.log(`❌ [BACKEND-SERVICE] Negocio con ID ${id} no encontrado en base de datos`);
      throw new NotFoundException(`Business with ID ${id} not found.`);
    }

    console.log(`💾 [BACKEND-SERVICE] Negocio encontrado en base de datos:`, businessPrisma);
    
    const mappedBusiness = this.mapper.toDomain(businessPrisma);
    console.log(`🔄 [BACKEND-SERVICE] Negocio mapeado a dominio:`, mappedBusiness);
    
    return mappedBusiness;
  }

  async findBuisnessByIdUser(id: number): Promise<Business[]> {
    console.log(`👤 [BACKEND-SERVICE] Buscando negocios del usuario ${id} en base de datos`);
    
    const businessFound = await this.prisma.negocios.findMany({
      where: { usuario_id: id },
    });

    console.log(`💾 [BACKEND-SERVICE] Se encontraron ${businessFound.length} negocios para el usuario ${id}:`, businessFound);

    if (!businessFound) {
      console.log(`❌ [BACKEND-SERVICE] No se encontraron negocios para el usuario ${id}`);
      throw new NotFoundException(`Business with ID ${id} not found.`);
    }

    const mappedBusinesses = businessFound.map((n) => this.mapper.toDomain(n));
    console.log(`🔄 [BACKEND-SERVICE] Negocios del usuario mapeados a dominio:`, mappedBusinesses);
    
    return mappedBusinesses;
  }

  async findAllBuisness(): Promise<Business[]> {
    console.log('📋 [BACKEND-SERVICE] Consultando todos los negocios en base de datos');
    
    const businessesPrisma = await this.prisma.negocios.findMany();
    console.log(`💾 [BACKEND-SERVICE] Se encontraron ${businessesPrisma.length} negocios en base de datos:`, businessesPrisma);
    
    const mappedBusinesses = businessesPrisma.map(this.mapper.toDomain);
    console.log('🔄 [BACKEND-SERVICE] Negocios mapeados a dominio:', mappedBusinesses);
    
    return mappedBusinesses;
  }

  async updateBuisness(id: number, updateDto: UpdateBusinessDto): Promise<Business> {
    try {
      const updatedBusinessPrisma = await this.prisma.negocios.update({
        where: { negocio_id: id },
        data: updateDto,
      });
      return this.mapper.toDomain(updatedBusinessPrisma);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Business with ID ${id} not found.`);
      }
      throw error;
    }
  }

  async deleteBuisness(id: number): Promise<void> {
    try {
      await this.prisma.negocios.delete({
        where: { negocio_id: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Business with ID ${id} not found.`);
      }
      throw error;
    }
  }

  async getUsuarios() {
    console.log('👥 [BACKEND-SERVICE] Consultando todos los usuarios en base de datos');
    
    const usuarios = await this.prisma.usuarios.findMany({
      select: {
        usuario_id: true,
        nombre_completo: true,
        email: true,
        fecha_registro: true
      }
    });
    
    console.log(`💾 [BACKEND-SERVICE] Se encontraron ${usuarios.length} usuarios en base de datos:`, usuarios);
    
    return usuarios;
  }


}

