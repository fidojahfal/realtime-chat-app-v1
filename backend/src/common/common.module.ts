import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ValidationService } from './validation/validation.service';

@Global()
@Module({
  providers: [PrismaService, ValidationService],
  controllers: [],
  exports: [PrismaService, ValidationService],
})
export class CommonModule {}
