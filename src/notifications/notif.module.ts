import { Module } from '@nestjs/common';
import { NotifService } from './notif.service';

@Module({
  controllers: [],
  providers: [NotifService],
  exports: [NotifService]
})
export class NotifModule {}
