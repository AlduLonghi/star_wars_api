import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/application/use-cases/users.service';
import * as bcrypt from 'bcrypt';
import { LoginPort } from '../../entities/ports/auth.ports';

@Injectable()
export class LoginUseCase implements LoginPort {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { accessToken: this.jwtService.sign(payload) };
  }
}