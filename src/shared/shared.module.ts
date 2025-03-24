import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './infrastructure/interface/graphql/guards/auth.guard';
import { RolesGuard } from './infrastructure/interface/graphql/guards/roles.guard';

@Module({
  imports: [ConfigModule],
  providers: [JwtService, AuthGuard, RolesGuard],
  exports: [AuthGuard, RolesGuard],
})
export class SharedModule {}