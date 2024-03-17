import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, StoreModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
