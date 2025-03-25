import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './infrastructure/interface/graphql/guards/auth.guard';
import { RolesGuard } from './infrastructure/interface/graphql/guards/roles.guard';
import { Roles } from './infrastructure/interface/graphql/decorators/roles.decorator';

@Module({
  imports: [ConfigModule],
  providers: [JwtService, AuthGuard, RolesGuard, Roles],
  exports: [AuthGuard, RolesGuard, Roles],
})
export class SharedModule {}