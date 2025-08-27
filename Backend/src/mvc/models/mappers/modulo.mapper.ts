import { Injectable } from '@nestjs/common';
import { Modulos as ModuloPrismaModel } from '@prisma/client';
import { Modulo } from '../entities/modulo.entity';

@Injectable()
export class ModuloMapper {
    toDomain(prismaModulo: ModuloPrismaModel): Modulo {
        console.log('🔄 [BACKEND-MAPPER] Mapeando datos de Prisma a dominio (Modulo):', prismaModulo);
        
        const mappedModulo = new Modulo(
            prismaModulo.id_modulo,
            prismaModulo.id_aprendizaje,
            prismaModulo.nombre_modulo,
            prismaModulo.concepto,
            prismaModulo.orden_modulo || undefined,
            prismaModulo.titulo_conteido || undefined,
            prismaModulo.recurso_interactivo || undefined
        );
        
        console.log('✅ [BACKEND-MAPPER] Datos mapeados exitosamente (Modulo):', mappedModulo);
        
        return mappedModulo;
    }
}
