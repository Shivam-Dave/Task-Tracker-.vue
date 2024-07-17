// src/tasks/task.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(
    userId: string,
    title: string,
    description: string,
  ): Promise<Task> {
    const task = new this.taskModel({ userId, title, description });
    return task.save();
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel.find({ userId }).exec();
  }
}
