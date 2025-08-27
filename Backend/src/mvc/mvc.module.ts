import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../shared/database/prisma.service';
import { AiModule } from '../simulator/ai/ai.module';

// Controllers
import { BusinessController } from './controllers/business.controller';
import { LearningController } from './controllers/learning.controller';
import { SizeController } from './controllers/size.controller';
import { ModuleController } from './controllers/module.controller';
import { StatusController } from './controllers/status.controller';
import { FinancialRecordController } from './controllers/financial-record.controller';
import { AnalisisIAController } from './controllers/analysis_ai.controller';
import { UserController } from './controllers/user.controller';
import { AprendizajeController, ModuloController } from './controllers/aprendizaje.controller';
import { ValidationResultController } from './controllers/validation-result.controller';
import { BusinessProgressStepController } from './controllers/business-progress-step.controller';

// Services
import { BusinessService } from './services/business.service';
import { LearningService } from './services/learning.service';
import { SizeService } from './services/size.service';
import { ModuleService } from './services/module.service';
import { StatusService } from './services/status.service';
import { FinancialRecordService } from './services/financial-record.service';
import { AnalisisIAService } from './services/analysis_ai.service';
import { UserService } from './services/user.service';
import { AprendizajeService } from './services/aprendizaje.service';
import { ValidationResultService } from './services/validation-result.service';
import { BusinessProgressStepService } from './services/business-progress-step.service';

// Mappers
import { BusinessMapper } from './models/mappers/business.mapper';
import { LearningMapper } from './models/mappers/learining.mapper';
import { SizeMapper } from './models/mappers/size.mapper';
import { ModuleMapper } from './models/mappers/module.mapper';
import { StatusMapper } from './models/mappers/status.mapper';
import { FinancialRecordMapper } from './models/mappers/financial-record.mapper';
import { AnalisisIAMapper } from './models/mappers/analysis_ai.mapper';
import { UserMapper } from './models/mappers/user.mapper';
import { AprendizajeMapper } from './models/mappers/aprendizaje.mapper';
import { ModuloMapper } from './models/mappers/modulo.mapper';
import { ValidationResultMapper } from './models/mappers/validation-result.mapper';

@Module({
  imports: [ConfigModule, AiModule],
  controllers: [
    BusinessController,
    LearningController,
    SizeController,
    ModuleController,
    StatusController,
    FinancialRecordController,
    AnalisisIAController,
    UserController,
    AprendizajeController,
    ModuloController,
    ValidationResultController,
    BusinessProgressStepController,
  ],
  providers: [
    PrismaService,
    BusinessService,
    LearningService,
    SizeService,
    ModuleService,
    StatusService,
    FinancialRecordService,
    AnalisisIAService,
    UserService,
    AprendizajeService,
    ValidationResultService,
    BusinessProgressStepService,
    BusinessMapper,
    LearningMapper,
    SizeMapper,
    ModuleMapper,
    StatusMapper,
    FinancialRecordMapper,
    AnalisisIAMapper,
    UserMapper,
    AprendizajeMapper,
    ModuloMapper,
    ValidationResultMapper,
  ],
  exports: [
    BusinessService,
    LearningService,
    SizeService,
    ModuleService,
    StatusService,
    FinancialRecordService,
    AnalisisIAService,
    UserService,
    AprendizajeService,
    ValidationResultService,
    BusinessProgressStepService,
  ],
})
export class MvcModule {}
