import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApolloService {
  private readonly logger = new Logger(ApolloService.name);
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.apollo.io/v1';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('APOLLO_API_KEY') || '';
  }

  async searchLeads(query: any): Promise<any> {
    const url = `${this.baseUrl}/mixed_people/search`;
    try {
      this.logger.log(`Searching leads with query: ${JSON.stringify(query)}`);
      const response = await firstValueFrom(
        this.httpService.post(
          url,
          { ...query, api_key: this.apiKey },
          { headers: { 'Content-Type': 'application/json' } },
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error searching leads in Apollo.io', error);
      throw error;
    }
  }
}
