import { Module } from '@nestjs/common';

import {JwtModule} from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {AuthGuard} from './auth.guard';

import {UserModule} from '~/user/user.module';

import {jwtConstants} from './constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService,AuthGuard],
  exports: [AuthGuard],
  imports: [
	UserModule,
	JwtModule.register({
		global: true,
		secret:jwtConstants.secret,
		signOptions: { expiresIn: '180s' },
	})
  ]
})
export class AuthModule {}
