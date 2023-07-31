import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ShortLink, Prisma } from '@prisma/client';

@Injectable()
export class UrlsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ShortLinkCreateInput): Promise<ShortLink> {
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
}
