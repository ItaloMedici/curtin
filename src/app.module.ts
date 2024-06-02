import { useCases } from '@application/use-cases';
import { UrlController } from '@infrastructure/controller/url.controller';
import { repositoriesProvider } from '@infrastructure/providers/respository';
import { schemas } from '@infrastructure/schemas';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature(schemas),
    ConfigModule.forRoot(),
  ],
  controllers: [UrlController],
  providers: [...repositoriesProvider, ...useCases],
})
export class AppModule {}
