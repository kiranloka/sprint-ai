import { Controller, Post, Body, Param } from '@nestjs/common';
import { CampaignService } from './campaign.service';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  async createCampaign(
    @Body() body: { name: string; subject: string; templateId: string },
  ) {
    return this.campaignService.createCampaign(
      body.name,
      body.subject,
      body.templateId,
    );
  }

  @Post(':id/send')
  async sendCampaign(@Param('id') id: string) {
    return this.campaignService.sendCampaign(id);
  }
}
