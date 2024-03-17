import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRep } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserRep],
  exports: [UserRep]
})
export class UserModule {}
