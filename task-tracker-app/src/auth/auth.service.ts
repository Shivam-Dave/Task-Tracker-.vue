// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      ...rest,
      password: hashedPassword,
    });

    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<string | null> {
    const { username, password } = loginUserDto;

    const user: UserDocument | null =
      await this.usersService.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }

    const payload = { username: user.username, sub: user._id };
    return this.jwtService.sign(payload);
  }
}
