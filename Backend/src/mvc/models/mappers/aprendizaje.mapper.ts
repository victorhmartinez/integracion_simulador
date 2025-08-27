import { Injectable } from '@nestjs/common';
import { Aprendizaje as AprendizajePrismaModel } from '@prisma/client';
import { Aprendizaje } from '../entities/aprendizaje.entity';

@Injectable()
export class AprendizajeMapper {
    toDomain(prismaAprendizaje: AprendizajePrismaModel): Aprendizaje {
        console.log('🔄 [BACKEND-MAPPER] Mapeando datos de Prisma a dominio (Aprendizaje):', prismaAprendizaje);
        
        const mappedAprendizaje = new Aprendizaje(
            prismaAprendizaje.id_aprendizaje,
            prismaAprendizaje.nombre,
            prismaAprendizaje.total_niveles || undefined
        );
        
        console.log('✅ [BACKEND-MAPPER] Datos mapeados exitosamente (Aprendizaje):', mappedAprendizaje);
        
        return mappedAprendizaje;
    }
}
