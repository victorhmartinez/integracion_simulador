import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../shared/database/prisma.service';

// Controllers
import { AiController } from './controllers/ai.controller';
import { BusinessController } from './controllers/business.controller';
import { LearningController } from './controllers/learning.controller';
import { SizeController } from './controllers/size.controller';
import { ModuleController } from './controllers/module.controller';
import { StatusController } from './controllers/status.controller';
import { FinancialRecordController } from './controllers/financial-record.controller';
import { AnalisisIAController } from './controllers/analysis_ai.controller';
import { UserController } from './controllers/user.controller';

// Services
import { AiService } from './services/ai.service';
import { BusinessService } from './services/business.service';
import { LearningService } from './services/learning.service';
import { SizeService } from './services/size.service';
import { ModuleService } from './services/module.service';
import { StatusService } from './services/status.service';
import { FinancialRecordService } from './services/financial-record.service';
import { AnalisisIAService } from './services/analysis_ai.service';
import { UserService } from './services/user.service';

// Mappers
import { BusinessMapper } from './models/mappers/business.mapper';
import { LearningMapper } from './models/mappers/learining.mapper';
import { SizeMapper } from './models/mappers/size.mapper';
import { ModuleMapper } from './models/mappers/module.mapper';
import { StatusMapper } from './models/mappers/status.mapper';
import { FinancialRecordMapper } from './models/mappers/financial-record.mapper';
import { AnalisisIAMapper } from './models/mappers/analysis_ai.mapper';
import { UserMapper } from './models/mappers/user.mapper';

@Module({
  imports: [ConfigModule],
  controllers: [
    AiController,
    BusinessController,
    LearningController,
    SizeController,
    ModuleController,
    StatusController,
    FinancialRecordController,
    AnalisisIAController,
    UserController,
  ],
  providers: [
    PrismaService,
    AiService,
    BusinessService,
    LearningService,
    SizeService,
    ModuleService,
    StatusService,
    FinancialRecordService,
    AnalisisIAService,
    UserService,
    BusinessMapper,
    LearningMapper,
    SizeMapper,
    ModuleMapper,
    StatusMapper,
    FinancialRecordMapper,
    AnalisisIAMapper,
    UserMapper,
  ],
  exports: [
    AiService,
    BusinessService,
    LearningService,
    SizeService,
    ModuleService,
    StatusService,
    FinancialRecordService,
    AnalisisIAService,
    UserService,
  ],
})
export class MvcModule {}
