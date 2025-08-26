import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AnalyzedCostResultService } from './analyzed_cost_result.service';
import { CreateAnalyzedCostResultDto } from './dto/create-results_costs_analyzed.dto';
import { UpdateAnalyzedCostResultDto } from './dto/update-results_costs_analyzed.dto';

@ApiTags('Analyzed Costs')
@Controller('analyzed-costs')
export class AnalyzedCostResultController {
  constructor(private readonly service: AnalyzedCostResultService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new analyzed cost result' })
  @ApiResponse({ status: 201, description: 'The analyzed cost result was successfully created.' })
  create(@Body() createDto: CreateAnalyzedCostResultDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all analyzed cost results' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an analyzed cost result by its ID' })
  @ApiParam({ name: 'id', description: 'The unique ID of the analyzed cost result' })
  @ApiResponse({ status: 404, description: 'Analyzed cost result not found.' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Get('analysis/:analysisId')
  @ApiOperation({ summary: 'Get all analyzed cost results for a specific AI analysis' })
  @ApiParam({ name: 'analysisId', description: 'The ID of the AI analysis' })
  findByAnalysisId(@Param('analysisId', ParseIntPipe) analysisId: number) {
    return this.service.findByAnalysisId(analysisId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an analyzed cost result by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the analyzed cost result to update' })
  @ApiResponse({ status: 404, description: 'Analyzed cost result not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateAnalyzedCostResultDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an analyzed cost result by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the analyzed cost result to delete' })
  @ApiResponse({ status: 204, description: 'The analyzed cost result was successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Analyzed cost result not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}