import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
  async onModuleInit() {
    await this.$connect();
  }
}
