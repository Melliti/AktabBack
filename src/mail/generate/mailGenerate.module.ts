import { Module } from '@nestjs/common';
import { MailGenerateController } from './mailGenerate.controller';
import { MailGenerateService } from './mailGenerate.service';
import { OpenaiModule } from '../../openai/openai.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [OpenaiModule, SupabaseModule],
  controllers: [MailGenerateController],
  providers: [MailGenerateService],
})
export class MailGenerateModule {}