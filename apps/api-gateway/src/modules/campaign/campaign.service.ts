import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { prisma } from '@repo/db';

@Injectable()
export class CampaignService {
  private readonly logger = new Logger(CampaignService.name);

  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  async createCampaign(name: string, subject: string, templateId: string) {
    return prisma.campaign.create({
      data: {
        name,
        subject,
        templateId,
      },
    });
  }

  async sendCampaign(campaignId: string) {
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { template: true },
    });

    if (!campaign) throw new Error('Campaign not found');

    const users = await prisma.user.findMany();

    this.logger.log(`Sending campaign ${campaignId} to ${users.length} users`);

    for (const user of users) {
      const comm = await prisma.campaignCommunication.create({
        data: {
          campaignId,
          userId: user.id,
          status: 'PENDING',
        },
      });

      await this.emailQueue.add('send-email', {
        to: user.email,
        subject: campaign.subject,
        html: campaign.template.contentHtml,
        templateId: campaign.templateId,
        userId: user.id,
        communicationId: comm.id, // For tracking
      });
    }

    await prisma.campaign.update({
      where: { id: campaignId },
      data: { status: 'SENDING' },
    });

    return { count: users.length };
  }
}
