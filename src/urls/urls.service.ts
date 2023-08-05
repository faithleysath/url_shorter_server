import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ShortLink, Prisma } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class UrlsService {
  constructor(private readonly prisma: PrismaService) {}

  async getTitle(url: string): Promise<string> {
    const res = await axios.get(url, { timeout: 1000 });
    const title = res.data.match(/<title[^>]*>([^<]+)<\/title>/)[1];
    return title;
  }

  async create(data: Prisma.ShortLinkCreateInput): Promise<ShortLink> {
    if (!data.title) {
      data.title = await this.getTitle(data.original);
    }
    return this.prisma.shortLink.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ShortLinkWhereUniqueInput;
    where?: Prisma.ShortLinkWhereInput;
    orderBy?: Prisma.ShortLinkOrderByWithRelationInput;
  }): Promise<ShortLink[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.shortLink.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    ShortLinkWhereUniqueInput: Prisma.ShortLinkWhereUniqueInput,
  ): Promise<ShortLink | null> {
    return this.prisma.shortLink.findUnique({
      where: ShortLinkWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.ShortLinkWhereUniqueInput;
    data: Prisma.ShortLinkUpdateInput;
  }): Promise<ShortLink> {
    const { where, data } = params;
    return this.prisma.shortLink.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.ShortLinkWhereUniqueInput): Promise<ShortLink> {
    return this.prisma.shortLink.delete({
      where,
    });
  }

  async exists(where: Prisma.ShortLinkWhereUniqueInput): Promise<boolean> {
    const link = await this.prisma.shortLink.findUnique({
      where,
    });
    return !!link;
  }
}
