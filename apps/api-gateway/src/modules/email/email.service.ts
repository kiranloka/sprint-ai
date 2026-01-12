import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');
    if (apiKey) {
      sgMail.setApiKey(apiKey);
    } else {
      this.logger.warn('SENDGRID_API_KEY not found');
    }
  }

  async sendEmail(to: string, subject: string, html: string) {
    const from =
      this.configService.get<string>('EMAIL_FROM') || 'noreply@sprint.com';
    const msg = {
      to,
      from,
      subject,
      html,
    };

    try {
      await sgMail.send(msg);
      this.logger.log(`Email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Error sending email to ${to}:`, error);
      // Log full error details for debugging
      if (error.response) {
        this.logger.error(error.response.body);
      }
      throw error;
    }
  }
}
