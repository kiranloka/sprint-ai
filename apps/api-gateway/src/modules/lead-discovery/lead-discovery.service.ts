import { Injectable, Logger } from '@nestjs/common';
import { prisma } from '@repo/db';
import { ApolloService } from './services/apollo.service';
import { ClearbitService } from './services/clearbit.service';
import { NeverBounceService } from './services/neverbounce.service';
import { LeadScoringService } from './services/lead-scoring.service';

@Injectable()
export class LeadDiscoveryService {
  private readonly logger = new Logger(LeadDiscoveryService.name);

  constructor(
    private readonly apolloService: ApolloService,
    private readonly clearbitService: ClearbitService,
    private readonly neverBounceService: NeverBounceService,
    private readonly leadScoringService: LeadScoringService,
  ) {}

  async searchLeads(query: any) {
    this.logger.log('Searching leads...');
    // TODO: Map query to Apollo DTO
    const results = await this.apolloService.searchLeads(query);

    // Process and save leads? Or just return?
    // For now, let's just return.
    return results;
  }

  async enrichLead(email: string) {
    this.logger.log(`Enriching lead: ${email}`);
    const enrichmentData = await this.clearbitService.enrichLead(email);

    if (enrichmentData) {
      // Update lead in DB
      // const lead = await prisma.lead.upsert(...)
    }

    return enrichmentData;
  }

  async verifyEmail(email: string) {
    this.logger.log(`Verifying email: ${email}`);
    const verificationResult = await this.neverBounceService.verifyEmail(email);
    return verificationResult;
  }

  async scoreLead(leadId: string) {
    this.logger.log(`Scoring lead: ${leadId}`);
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) {
      throw new Error('Lead not found');
    }

    const score = this.leadScoringService.calculateScore(lead);

    return prisma.lead.update({
      where: { id: leadId },
      data: { leadScore: score },
    });
  }

  async createLead(data: any) {
    return prisma.lead.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.company,
        title: data.title,
        industry: data.industry,
        // status, etc.
      },
    });
  }
}
