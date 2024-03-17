import { Module } from '@nestjs/common';

import { StoreController } from './store.controller';
import { StoreRepository } from './store.repository';
import { StoreUsecases } from './store.usecases';

import {UserModule} from '~/user/user.module';
import {NotifModule} from '~/notifications/notif.module';

@Module({
  controllers: [StoreController],
  providers: [StoreRepository, StoreUsecases],
  imports: [UserModule, NotifModule]
})
export class StoreModule {}
