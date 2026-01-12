import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClearbitService {
  private readonly logger = new Logger(ClearbitService.name);
  private readonly apiKey: string;
  private readonly baseUrl = 'https://person.clearbit.com/v2';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('CLEARBIT_API_KEY') || '';
  }

  async enrichLead(email: string): Promise<any> {
    const url = `${this.baseUrl}/combined/find?email=${email}`;
    try {
      this.logger.log(`Enriching lead: ${email}`);
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: `Bearer ${this.apiKey}` },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error enriching lead ${email} in Clearbit`, error);
      // Return null or partial data instead of throwing if not found?
      // For now, let's return null if 404, throw otherwise.
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw error;
    }
  }
}
