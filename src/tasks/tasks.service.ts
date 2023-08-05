import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly prisma: PrismaService) {}
  // 每分钟执行一次，删除ShortLink表中过期的数据，判断依据是expiresAt<now()
  @Cron('0 * * * * *')
  async handleCron() {
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
}
