import { Injectable } from '@nestjs/common';

@Injectable()
export class LeadScoringService {
  calculateScore(lead: any): number {
    let score = 0;

    // Rules
    if (
      lead.title &&
      (lead.title.toLowerCase().includes('cto') ||
        lead.title.toLowerCase().includes('vp') ||
        lead.title.toLowerCase().includes('director'))
    ) {
      score += 20;
    }

    if (lead.companySize) {
      // Assume companySize is a string or number, adding simple logic
      score += 10;
    }

    if (
      lead.industry &&
      (lead.industry.toLowerCase().includes('tech') ||
        lead.industry.toLowerCase().includes('saas'))
    ) {
      score += 15;
    }

    if (lead.verificationStatus === 'valid') {
      score += 30;
    } else if (lead.verificationStatus === 'invalid') {
      score -= 50;
    }

    // Cap score at 100
    return Math.min(score, 100);
  }
}
