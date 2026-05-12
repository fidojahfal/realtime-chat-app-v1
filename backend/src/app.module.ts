import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonService } from './common/common.service';
import { CommonModule } from './common/common.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [CommonModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
