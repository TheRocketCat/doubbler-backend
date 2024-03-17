import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
	  session({
		secret: "my-secret",
		resave: false,
		saveUninitialized: false
	  })
  )
  await app.listen(3003);
  console.log("Server started on port 3003")
}
bootstrap();
