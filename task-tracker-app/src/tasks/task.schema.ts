// src/tasks/task.schema.ts
import { Schema, Document } from 'mongoose';

export interface Task {
  userId: string;
  title: string;
  description: string;
}

export type TaskDocument = Task & Document;

export const TaskSchema = new Schema<TaskDocument>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});
