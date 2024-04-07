import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRep } from './user.repository';
import {UserUC} from './usecases';

import {NotifModule} from "~/notifications/notif.module";

@Module({
  controllers: [UserController],
  providers: [UserRep, UserUC],
  exports: [UserRep],
  imports: [NotifModule]
})
export class UserModule {}
