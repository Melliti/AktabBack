import { Module } from '@nestjs/common';
import { MailHistoryController } from './mailHistory.controller';
import { MailHistoryService } from './mailHistory.service';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [MailHistoryController],
  providers: [MailHistoryService],
})
export class MailHistoryModule {}