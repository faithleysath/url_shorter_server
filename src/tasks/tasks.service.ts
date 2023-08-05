import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly prisma: PrismaService) {}
  // 每分钟执行一次，删除ShortLink表中过期的数据，判断依据是expiresAt<now()
  @Cron('0 * * * * *')
  async cleanExpireData() {
    this.logger.log('执行定时任务：删除过期的短链接');
    const res = await this.prisma.shortLink.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
    this.logger.log(res.count + '条数据被删除');
  }

  // 每天凌晨执行一次，删除有效期在一年后，但updatedAt在三个月前的数据
  @Cron('1 0 0 * * *')
  async cleanNoUseData() {
    this.logger.log('执行定时任务：删除无用的短链接');
    const res = await this.prisma.shortLink.deleteMany({
      where: {
        expiresAt: {
          gt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        },
        updatedAt: {
          lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        },
      },
    });
    this.logger.log(res.count + '条数据被删除');
  }
}
