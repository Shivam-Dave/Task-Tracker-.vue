// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('signup-user')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.signUp(createUserDto);
      return { statusCode: 201, message: 'User created successfully', user };
    } catch (error) {
      this.logger.error('Error signing up user', error.stack);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login-user')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const token = await this.authService.login(loginUserDto);
      if (!token) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      return { statusCode: 200, message: 'Login successful', token };
    } catch (error) {
      this.logger.error('Error logging in user', error.stack);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
