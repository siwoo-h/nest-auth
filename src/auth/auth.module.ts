import * as config from 'config';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from '@src/auth/auth.service';
import { AuthController } from '@src/auth/auth.controller';
import { UserRepository } from '@src/auth/repository/user.repositoy';
import { JwtStrategy } from '@src/auth/jwt-strategy';

const jwtConfig = config.get('jwt');
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
