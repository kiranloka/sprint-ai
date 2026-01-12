import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { prisma } from '@repo/db';
import axios from 'axios';

@Injectable()
export class BeefreeService {
  private readonly logger = new Logger(BeefreeService.name);

  constructor(private readonly configService: ConfigService) {}

  async getAuthToken() {
    const clientId = this.configService.get<string>('BEEFREE_CLIENT_ID');
    const clientSecret = this.configService.get<string>(
      'BEEFREE_CLIENT_SECRET',
    );

    if (!clientId || !clientSecret) {
      throw new Error('BeeFree credentials not configured');
    }

    try {
      // Standard BeeFree auth endpoint
      const response = await axios.post('https://auth.getbee.io/maketoken', {
        client_id: clientId,
        client_secret: clientSecret,
      });
      return response.data;
    } catch (error) {
      this.logger.error('Failed to get BeeFree auth token', error);
      throw error;
    }
  }

  async saveTemplate(name: string, subject: string, json: any, html: string) {
    return prisma.emailTemplate.create({
      data: {
        name,
        subject,
        contentJson: json, // Prisma Json type accepts any JSON-serializable value
        contentHtml: html,
      },
    });
  }

  async getTemplate(id: string) {
    return prisma.emailTemplate.findUnique({
      where: { id },
    });
  }
}
