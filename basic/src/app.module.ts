import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/users.entity'; 
import { Report } from './reports/reports.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite', // 데이터 베이스 종류
    database: 'db.sqlite', // 데이터 베이스 이름
    entities: [User, Report], // 사용될 엔티티
    synchronize: true // 동기화
    /**
     * synchronize 속성은 개발 환경에서만 사용할 수 있습니다.
     * 데이터베이스 구조(엔티티)가 변경된 경우 실제 데이터베이스에 마이그레이션 작동이 일어나도록 돕는 속성입니다.
     */
  }), ReportsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
