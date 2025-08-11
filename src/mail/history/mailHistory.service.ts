import { Injectable } from '@nestjs/common';
import { MailEntity } from '../entities/mail.entity';
import { randomUUID } from 'crypto';
import { SupabaseService } from 'src/supabase/supabase.service';


@Injectable()
export class MailHistoryService {
  constructor(private readonly supabaseService: SupabaseService) {}
  // Ajoute ici tes méthodes pour gérer les mails
  async getMailsHistory(userId: string) {
      try {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase.from('mails').select('tone, context, core, generated, created').eq('userid', userId);
        
        if (error) {
          throw error;
        }
        return data;
      } catch (error) {
        console.error('Error saving mail:', error);
        throw new Error('Failed to save generated mail');
      }
    }
}