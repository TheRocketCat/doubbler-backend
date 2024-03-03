import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRep } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserRep]
})
export class UserModule {}
