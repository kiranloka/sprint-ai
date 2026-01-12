import { Module } from '@nestjs/common';
import { BeefreeService } from './beefree.service';
import { BeefreeController } from './beefree.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [BeefreeController],
  providers: [BeefreeService],
})
export class BeefreeModule {}
