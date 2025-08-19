import { Controller, Post, Get, Body, Query, HttpCode, InternalServerErrorException } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @HttpCode(201)
  async receiveMail(@Body() body: any) {
    try {
      // Ta logique ici
      return { message: 'OK', data: body };
    } catch (error) {
      throw new InternalServerErrorException('Une erreur est survenue');
    }
  }

  @Get()
  @HttpCode(200)
  async getMail(@Query('user_id') userId?: string) {
    try {
      if (userId) {
        console.log("User ID: ", userId);
        
        const mails = await this.mailService.getMails(userId);
        return { message: 'OK', user_id: userId, mails: mails };
      } else {
        // Logique pour récupérer tous les mails
        return { message: 'OK', mails: [] };
      }
    } catch (error) {
      throw new InternalServerErrorException('Une erreur est survenue');
    }
  }
}

