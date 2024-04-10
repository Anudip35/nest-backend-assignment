import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger.config';
import { config } from 'dotenv';
import { FirebaseService } from './firebase.service';

async function bootstrap() {
  try {
    config();
    const firebaseService = new FirebaseService();
    await firebaseService.initializeApp();
    const app = await NestFactory.create(AppModule);
    setupSwagger(app);
    await app.listen(3000);
  } catch (error) {
    console.error('Error during bootstrap:', error);
  }
}
bootstrap();
