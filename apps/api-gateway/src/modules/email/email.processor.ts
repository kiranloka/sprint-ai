import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailService } from './email.service';
import { Logger } from '@nestjs/common';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(private readonly emailService: EmailService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.debug(`Processing email job ${job.id}`);
    const { to, subject, html } = job.data;

    try {
      await this.emailService.sendEmail(to, subject, html);
      this.logger.log(`Email sent for job ${job.id}`);
    } catch (error) {
      this.logger.error(`Failed to send email for job ${job.id}`, error);
      throw error;
    }
  }
}
