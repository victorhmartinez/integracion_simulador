import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MvcModule } from './mvc/mvc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MvcModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
