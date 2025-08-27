import { Injectable } from '@nestjs/common';
import { AiService } from './ai.service';
import { PromptService } from './prompt.service';

@Injectable()
export class AnalysisService {
  constructor(
    private readonly aiService: AiService,
    private readonly promptService: PromptService,
  ) {}

  /**
   * Análisis detallado de costos (5-8 segundos)
   */
  async analyzeCosts(
    costs: Array<{ name: string; amount: string }>,
    businessInfo: { tipoNegocio: string; tamano: string; ubicacion: string },
    validationResult: any
  ) {
    try {
      console.log('📊 [ANALYSIS-SERVICE] Iniciando análisis detallado...');
      
      // Generar prompt para análisis detallado
      const prompt = this.promptService.generateAnalysisPrompt(costs, businessInfo, validationResult);
      
      console.log('📝 [ANALYSIS-SERVICE] Prompt generado, llamando a IA...');
      
      // Llamar a la IA con timeout estándar
      const response = await this.aiService.analyzePrompt(prompt, 15000); // 15 segundos timeout
      
      console.log('✅ [ANALYSIS-SERVICE] Respuesta de IA recibida');
      
      // Parsear la respuesta JSON
      const parsedResponse = this.parseAiResponse(response);
      
      console.log('🔄 [ANALYSIS-SERVICE] Respuesta parseada:', parsedResponse);
      
      return {
        success: true,
        data: parsedResponse,
        timestamp: new Date().toISOString(),
        duration: 'detailed_analysis',
        validationResult: validationResult
      };
      
    } catch (error) {
      console.error('💥 [ANALYSIS-SERVICE] Error en análisis:', error);
      
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
        duration: 'detailed_analysis_failed'
      };
    }
  }

  /**
   * Análisis final con recomendaciones (3-5 segundos)
   */
  async finalAnalysis(
    costs: Array<{ name: string; amount: string }>,
    businessInfo: { tipoNegocio: string; tamano: string; ubicacion: string },
    previousResults: any
  ) {
    try {
      console.log('🎯 [ANALYSIS-SERVICE] Iniciando análisis final...');
      
      // Generar prompt para análisis final
      const prompt = this.promptService.generateFinalAnalysisPrompt(costs, businessInfo, previousResults);
      
      console.log('📝 [ANALYSIS-SERVICE] Prompt final generado, llamando a IA...');
      
      // Llamar a la IA con timeout más corto para análisis final
      const response = await this.aiService.analyzePrompt(prompt, 12000); // 12 segundos timeout
      
      console.log('✅ [ANALYSIS-SERVICE] Respuesta final de IA recibida');
      
      // Parsear la respuesta JSON
      const parsedResponse = this.parseAiResponse(response);
      
      console.log('🔄 [ANALYSIS-SERVICE] Respuesta final parseada:', parsedResponse);
      
      return {
        success: true,
        data: parsedResponse,
        timestamp: new Date().toISOString(),
        duration: 'final_analysis',
        previousResults: previousResults
      };
      
    } catch (error) {
      console.error('💥 [ANALYSIS-SERVICE] Error en análisis final:', error);
      
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
        duration: 'final_analysis_failed'
      };
    }
  }

  /**
   * Parsea la respuesta de la IA para extraer el JSON
   */
  private parseAiResponse(response: string): any {
    try {
      // Intentar extraer JSON del response
      const jsonMatch = response.match(/```(?:json)?([\s\S]*?)```/);
      const jsonString = jsonMatch ? jsonMatch[1] : response;
      
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('💥 [ANALYSIS-SERVICE] Error parseando respuesta:', error);
      throw new Error('Respuesta de IA no válida');
    }
  }

  /**
   * Combina todos los resultados en un análisis completo
   */
  combineResults(validationResult: any, analysisResult: any, finalResult: any) {
    return {
      validation: validationResult,
      analysis: analysisResult,
      finalRecommendations: finalResult,
      summary: {
        totalDuration: 'optimized_flow',
        stepsCompleted: 3,
        timestamp: new Date().toISOString()
      }
    };
  }
}
