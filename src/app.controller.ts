import { Controller, Get, Param, Redirect, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ShortLink } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  @Render('index')
  getIndex(): string {
    return;
  }

  @Get('link')
  @Redirect('/', 301)
  async redirectAll() {
    return {};
  }

  @Get('link/:short')
  @Redirect('/', 302)
  async redirect(@Param('short') short: string) {
    const res: ShortLink | null = await this.prisma.shortLink.update({
      where: {
        short: short,
        expiresAt: {
          gte: new Date(),
        },
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });
    if (res) {
      return { url: res.original };
    }
    return { url: '/' };
  }
}
