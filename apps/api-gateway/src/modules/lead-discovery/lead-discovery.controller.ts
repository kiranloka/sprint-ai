import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { LeadDiscoveryService } from './lead-discovery.service';

@Controller('leads')
export class LeadDiscoveryController {
  constructor(private readonly leadDiscoveryService: LeadDiscoveryService) {}

  @Post('search')
  async searchLeads(@Body() query: any) {
    return this.leadDiscoveryService.searchLeads(query);
  }

  @Post('enrich')
  async enrichLead(@Body('email') email: string) {
    return this.leadDiscoveryService.enrichLead(email);
  }

  @Post('verify')
  async verifyEmail(@Body('email') email: string) {
    return this.leadDiscoveryService.verifyEmail(email);
  }

  @Post('score')
  async scoreLead(@Body('leadId') leadId: string) {
    return this.leadDiscoveryService.scoreLead(leadId);
  }
}
