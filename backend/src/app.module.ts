import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { LockergroupModule } from './lockergroup/lockergroup.module';
import { LockerModule } from './locker/locker.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '05042003jovan',
      database: 'smartlock',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    CompanyModule,
    LockergroupModule,
    LockerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
