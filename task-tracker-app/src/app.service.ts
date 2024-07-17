// src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  signupUser(username: any, password: any) {
    throw new Error('Method not implemented.');
  }
  loginUser(username: any, password: any) {
    throw new Error('Method not implemented.');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
