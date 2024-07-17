// src/tasks/task.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { TaskService } from './task.service';
import { UserId } from '../common/decorators/user-id.decorator';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Request() req,
    @Body() createTaskDto: any,
    @UserId() userId: string,
  ) {
    try {
      const task = await this.taskService.create(
        userId,
        createTaskDto.title,
        createTaskDto.description,
      );
      return { statusCode: 201, message: 'Task created successfully', task };
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req, @UserId() userId: string) {
    try {
      const tasks = await this.taskService.findAll(userId);
      return { statusCode: 200, tasks };
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
