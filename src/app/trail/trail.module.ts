import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrailEntity } from './entity/trail.entity';
import { TrailService } from './trail.service';
import { TrailController } from './trail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TrailEntity])],
  controllers: [TrailController],
  providers: [TrailService],
  exports: [TrailService],
})
export class TrailModule {}
