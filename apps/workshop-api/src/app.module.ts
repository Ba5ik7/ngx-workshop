import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NavigationModule } from './modules/navigation/navigation.module';
import { WorkshopModule } from './modules/workshop-document/workshop-document.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChatModule } from './modules/chat/chat.module';
import { IamModule } from './modules/iam/iam.module';
import { Influx } from './providers/influx';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    NavigationModule,
    WorkshopModule,
    ChatModule,
    IamModule,
  ],
  providers: [Influx],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
