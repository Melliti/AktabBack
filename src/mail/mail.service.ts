import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { MailEntity } from './entities/mail.entity';

@Injectable()
export class MailService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getMails(userId?: string) {
    const supabase = this.supabaseService.getClient();
    
    if (userId) {
      const { data, error } = await supabase
        .from('mails')
        .select('*')
        .eq('userid', userId) as { data: MailEntity[] | null, error: any };
        
        console.log("Data: ", data);
      if (error) {
        throw new Error(`Erreur lors de la récupération des mails: ${error.message}`);
      }
      
      return data;
    } else {
        throw new Error(`Erreur lors de la récupération des mails.`);
    }
  }
}