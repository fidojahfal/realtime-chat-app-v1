import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ZodService } from './zod/zod.service';
import { ValidationService } from './validation/validation.service';

@Module({
  providers: [PrismaService, ZodService, ValidationService],
  controllers: [],
})
export class CommonModule {}
