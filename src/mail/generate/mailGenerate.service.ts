import { Injectable } from '@nestjs/common';
import { GenerateMailDto } from './dto/generate-mail.dto';
import { OpenaiService } from '../../openai/openai.service';
import { MailEntity } from './entities/mailGenerate.entity';
import { randomUUID } from 'crypto';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class MailGenerateService {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly supabaseService: SupabaseService
  ) {}

  async saveMailGenerated(input: GenerateMailDto, output: string) {
    const query: MailEntity = {
      id: randomUUID(),
      userid: randomUUID(),
      tone: input.tone,
      core: input.mail,
      context: input.context,
      generated: output,
      created: new Date().toISOString()
    };
    try {
      const supabase = this.supabaseService.getClient();
      const { data, error } = await supabase.from('mails').insert([query]);
      
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error saving mail:', error);
      throw new Error('Failed to save generated mail');
    }
    
  }

  async generateMail(req: GenerateMailDto, id: string): Promise<string> {
    const prompt = `Write a mail with Tone: ${req.tone}\n
    Reply to this mail using the same language: ${req.mail}\n
    Here, more context to help you: ${req.context}`;

    try {
      const generatedText = await this.openaiService.generateText(prompt);
      await this.saveMailGenerated(req, generatedText);
      return generatedText;
    } catch (error) {
      console.error('Error generating mail:', error);
      throw new Error('Failed to generate mail');
    }
  }
}