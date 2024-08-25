import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report])], // Report 엔티티를 TypeOrmModule에 등록
  controllers: [ReportsController], // ReportsController를 컨트롤러로 등록
  providers: [ReportsService] // ReportsService를 프로바이더로 등록
})
export class ReportsModule {}
