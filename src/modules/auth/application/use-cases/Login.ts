import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GetUserByEmailUseCase } from 'src/modules/users/application/use-cases/GetUserByEmail';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly getUserByEmail: GetUserByEmailUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.getUserByEmail.execute(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { accessToken: this.jwtService.sign(payload) };
  }
}