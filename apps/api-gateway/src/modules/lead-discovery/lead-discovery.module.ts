import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LeadDiscoveryController } from './lead-discovery.controller';
import { LeadDiscoveryService } from './lead-discovery.service';
import { ApolloService } from './services/apollo.service';
import { ClearbitService } from './services/clearbit.service';
import { NeverBounceService } from './services/neverbounce.service';
import { LeadScoringService } from './services/lead-scoring.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [LeadDiscoveryController],
  providers: [
    LeadDiscoveryService,
    ApolloService,
    ClearbitService,
    NeverBounceService,
    LeadScoringService,
  ],
})
export class LeadDiscoveryModule {}
