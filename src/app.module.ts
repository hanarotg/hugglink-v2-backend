import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PageModule } from './pages/pages.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_MAIN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }), PageModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
