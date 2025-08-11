import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { MailGenerateModule } from './mail/generate/mailGenerate.module';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { MailHistoryModule } from './mail/history/mailHistory.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MailModule,
    MailGenerateModule,
    MailHistoryModule,
    SupabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
