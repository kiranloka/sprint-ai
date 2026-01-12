import { Controller, Get, Param, Res, Logger } from '@nestjs/common';
import type { Response } from 'express';
import { prisma } from '@repo/db';

@Controller('track')
export class TrackingController {
  private readonly logger = new Logger(TrackingController.name);

  @Get(':id/open')
  async trackOpen(@Param('id') id: string, @Res() res: Response) {
    try {
      await prisma.campaignCommunication.update({
        where: { id },
        data: { openedAt: new Date(), status: 'SENT' },
      });
      this.logger.log(`Tracked open for communication ${id}`);
    } catch (e) {
      this.logger.warn(`Tracking failed for ${id}: ${e.message}`);
    }

    const img = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64',
    );
    res.writeHead(200, {
      'Content-Type': 'image/gif',
      'Content-Length': img.length,
    });
    res.end(img);
  }
}
