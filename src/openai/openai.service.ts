import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateText(prompt: string): Promise<string> {
    try {
        const response = await this.openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                role: 'system',
                content: `Tu es un assistant qui génère des emails professionnels. 
                    Ta réponse doit être uniquement le texte du mail, sans aucune explication, sans texte entre crochets, sans champs à remplir, sans mention de [Votre Nom], [Votre Position], [Votre Entreprise], etc. 
                    Termine le mail directement par une formule de politesse adaptée, sans rien ajouter après. 
                    N’ajoute jamais de texte ou d’exemple entre crochets, même à la fin du mail. 
                    La réponse doit être prête à être envoyée telle quelle.`
                },
                {
                role: 'user',
                content: prompt
                }
            ],
            max_tokens: 300,
        });
        if (!response.choices || response.choices.length === 0) {
            throw new Error('No response from OpenAI');
        }
        if (response.choices[0].message.content == null) {
            throw new Error('Empty response from OpenAI');
        }
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error generating text with OpenAI:', error);
        throw new Error('Failed to generate text with OpenAI');
    }
  }

  // Ajoute d'autres méthodes selon tes besoins
}