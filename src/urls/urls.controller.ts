import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { ShortLink as ShortLinkModel } from '@prisma/client';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  async create(
    @Body()
    Data: {
      expiresAt: Date;
      title?: string;
      original: string;
      short: string;
    },
  ): Promise<ShortLinkModel> {
    const { expiresAt, title, original, short } = Data;
    return this.urlsService.create({
      expiresAt,
      title,
      original,
      short,
    });
  }

  @Get()
  async findAll(): Promise<ShortLinkModel[]> {
    return this.urlsService.findAll({
      where: { expiresAt: { gte: new Date() } },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ShortLinkModel> {
    return this.urlsService.findOne({ id: Number(id) });
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() ) {
  //   return this.urlsService.update(+id, updateUrlDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ShortLinkModel> {
    return this.urlsService.delete({ id: Number(id) });
  }
}
