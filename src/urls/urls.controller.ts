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
import { PrismaRequestExceptionFilter } from '../prisma/prisma-exception.filter';
import { AxiosExceptionFilter } from './exception/axios-exception.filters';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('create')
  @UseFilters(AxiosExceptionFilter)
  async create(
    @Body()
    Data: CreateUrlDto,
  ): Promise<ShortLinkModel> {
    const { title, expiresAt, original, short } = Data;
    return this.urlsService.create({
      title,
      expiresAt,
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

  @Get('exists/:short')
  async exists(@Param('short') short: string): Promise<boolean> {
    return this.urlsService.exists({
      short: short,
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
