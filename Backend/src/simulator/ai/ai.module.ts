import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { PromptService } from './prompt.service';
import { ValidationService } from './validation.service';
import { AnalysisService } from './analysis.service';

@Module({
  controllers: [AiController],
  providers: [AiService, PromptService, ValidationService, AnalysisService],
  exports: [AiService, PromptService, ValidationService, AnalysisService],
})
export class AiModule {}