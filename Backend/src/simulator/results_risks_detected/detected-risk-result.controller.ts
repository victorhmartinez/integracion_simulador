import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DetectedRiskResultService } from './detected-risk-result.service';
import { CreateDetectedRiskResultDto } from './dto/create-detected-risk-result.dto';
import { UpdateDetectedRiskResultDto } from './dto/update-detected-risk-result.dto';

@ApiTags('Detected Risks')
@Controller('detected-risks')
export class DetectedRiskResultController {
  constructor(private readonly service: DetectedRiskResultService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new detected risk result' })
  @ApiResponse({ status: 201, description: 'The detected risk result was successfully created.' })
  create(@Body() createDto: CreateDetectedRiskResultDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all detected risk results' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a detected risk result by its ID' })
  @ApiParam({ name: 'id', description: 'The unique ID of the detected risk result' })
  @ApiResponse({ status: 404, description: 'Detected risk result not found.' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Get('analysis/:analysisId')
  @ApiOperation({ summary: 'Get all detected risk results for a specific AI analysis' })
  @ApiParam({ name: 'analysisId', description: 'The ID of the AI analysis' })
  findByAnalysisId(@Param('analysisId', ParseIntPipe) analysisId: number) {
    return this.service.findByAnalysisId(analysisId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a detected risk result by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the detected risk result to update' })
  @ApiResponse({ status: 404, description: 'Detected risk result not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateDetectedRiskResultDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a detected risk result by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the detected risk result to delete' })
  @ApiResponse({ status: 204, description: 'The detected risk result was successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Detected risk result not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}