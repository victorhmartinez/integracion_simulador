import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ActionPlanResultService } from './action-plan-result.service';
import { CreateActionPlanResultDto } from './dto/create-action-plan-result.dto';
import { UpdateActionPlanResultDto } from './dto/update-action-plan-result.dto';

@ApiTags('Action Plans')
@Controller('action-plans')
export class ActionPlanResultController {
  constructor(private readonly service: ActionPlanResultService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new action plan result' })
  @ApiResponse({ status: 201, description: 'The action plan result was successfully created.' })
  create(@Body() createDto: CreateActionPlanResultDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all action plan results' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an action plan result by its ID' })
  @ApiParam({ name: 'id', description: 'The unique ID of the action plan result' })
  @ApiResponse({ status: 404, description: 'Action plan result not found.' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Get('analysis/:analysisId')
  @ApiOperation({ summary: 'Get all action plan results for a specific AI analysis' })
  @ApiParam({ name: 'analysisId', description: 'The ID of the AI analysis' })
  findByAnalysisId(@Param('analysisId', ParseIntPipe) analysisId: number) {
    return this.service.findByAnalysisId(analysisId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an action plan result by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the action plan result to update' })
  @ApiResponse({ status: 404, description: 'Action plan result not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateActionPlanResultDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an action plan result by its ID' })
  @ApiParam({ name: 'id', description: 'The ID of the action plan result to delete' })
  @ApiResponse({ status: 204, description: 'The action plan result was successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Action plan result not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}