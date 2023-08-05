<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">基于<a herf="https://nestjs.com/" target="_blank">Nest.js</a>框架的短链接生成器</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Demo

<http://link.laysath.cn/>

## 描述

![截图](/img/case.jpg)

短链接项目的后端+简易前端，基于以下框架

1. TypeScript
2. Nest.js
3. Admin.js
4. Prisma
5. Swagger

### 功能

1. 基础的短链接转换
2. 完整的异常处理、异步响应
3. 定期清理无效链接（每分钟清理过期链接，每天清理三个月未使用链接）
4. 简单易用的后台管理

### TODO

1. 密码访问（用户认证）

## 安装

1. 克隆本仓库

```bash
$ pnpm install
$ npx prisma migrate dev --name init
$ npx prisma generate
```

## 运行

```bash
# 开发
$ pnpm run start

# 开发环境
$ pnpm run start:dev

# 生产环境
$ pnpm build
$ pnpm run start:prod
```

## 使用说明

### Swagger 文档

访问路径：`your_domain/api`

### 后台管理

访问路径：`your_domain/admin`

账号、密码默认都是`admin`，修改可在`src/app.module.ts`改

### 首页

访问路径：`your_domain`

## License

[MIT licensed](LICENSE).
