import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NeverBounceService {
  private readonly logger = new Logger(NeverBounceService.name);
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.neverbounce.com/v4';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('NEVERBOUNCE_API_KEY') || '';
  }

  async verifyEmail(email: string): Promise<any> {
    const url = `${this.baseUrl}/single/check?key=${this.apiKey}&email=${email}`;
    try {
      this.logger.log(`Verifying email: ${email}`);
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error(`Error verifying email ${email} in NeverBounce`, error);
      throw error;
    }
  }
}
