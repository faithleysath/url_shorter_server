import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { ShortLink as ShortLinkModel } from '@prisma/client';
import { CreateUrlDto } from './dto/create-url.dto';
import { PrismaExceptionFilter } from '../prisma/prisma-exception.filter';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  async create(
    @Body()
    Data: CreateUrlDto,
  ): Promise<ShortLinkModel> {
    const { expiresAt, title, original, short } = Data;
    return this.urlsService.create({
      expiresAt,
      title,
      original,
      short,
    });
  }

  // @Get()
  // async findAll(): Promise<ShortLinkModel[]> {
  //   return this.urlsService.findAll({
  //     where: { expiresAt: { gte: new Date() } },
  //   });
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<ShortLinkModel> {
  //   return this.urlsService.findOne({
  //     id: Number(id),
  //     expiresAt: { gte: new Date() },
  //   });
  // }
  @Get('short/:short')
  async findOneByShort(@Param('short') short: string): Promise<ShortLinkModel> {
    return this.urlsService.findOne({
      short: short,
      expiresAt: { gte: new Date() },
    });
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() ) {
  //   return this.urlsService.update(+id, updateUrlDto);
  // }

  // @Delete(':id')
  // @UseFilters(PrismaExceptionFilter)
  // async remove(@Param('id') id: string): Promise<ShortLinkModel> {
  //   return this.urlsService.delete({ id: Number(id) });
  // }
}
