import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlsModule } from './urls/urls.module';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';

const DEFAULT_ADMIN = {
  email: 'admin',
  password: 'admin',
};
const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    // AdminJS version 7 is ESM-only. In order to import it, you have to use dynamic imports.
    import('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: async () => {
          await import('adminjs').then(async ({ AdminJS }) => {
            const AdminJSPrisma = await import('@adminjs/prisma');
            AdminJS.registerAdapter({
              Resource: AdminJSPrisma.Resource,
              Database: AdminJSPrisma.Database,
            });
          });
          const { getModelByName } = await import('@adminjs/prisma');
          // Note: Feel free to contribute to this documentation if you find a Nest-way of
          // injecting PrismaService into AdminJS module
          const prisma = new PrismaClient();
          // `_baseDmmf` contains necessary Model metadata but it is a private method
          // so it isn't included in PrismaClient type
          return {
            adminJsOptions: {
              rootPath: '/admin',
              resources: [
                {
                  resource: {
                    model: getModelByName('ShortLink'),
                    client: prisma,
                  },
                  options: {},
                },
              ],
            },
            auth: {
              authenticate,
              cookieName: 'adminjs',
              cookiePassword: 'secret',
            },
            sessionOptions: {
              resave: true,
              saveUninitialized: true,
              secret: 'secret',
            },
          };
        },
      }),
    ),
    UrlsModule,
    PrismaModule,
    ScheduleModule.forRoot(),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
