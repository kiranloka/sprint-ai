import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BeefreeService } from './beefree.service';

@Controller('beefree')
export class BeefreeController {
  constructor(private readonly beefreeService: BeefreeService) {}

  @Post('auth')
  async getAuthToken() {
    return this.beefreeService.getAuthToken();
  }

  @Post('save')
  async saveTemplate(
    @Body() body: { name: string; subject: string; json: any; html: string },
  ) {
    return this.beefreeService.saveTemplate(
      body.name,
      body.subject,
      body.json,
      body.html,
    );
  }

  @Get('template/:id')
  async getTemplate(@Param('id') id: string) {
    return this.beefreeService.getTemplate(id);
  }
}
