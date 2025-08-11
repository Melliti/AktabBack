import { Controller, Post, Get, Body, Param, Res, HttpCode, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { MailHistoryService } from './mailHistory.service';

@Controller('mail/history')
export class MailHistoryController {
  constructor(private readonly mailHistoryService: MailHistoryService) {}
  
  @Get(':id')
  @HttpCode(200)
  async getMail(@Param('id') id: string) {

    try {
      const mails = await this.mailHistoryService.getMailsHistory(id)
      
      return mails || [];
    } catch (error) {
      throw new InternalServerErrorException('Une erreur est survenue');
    }
  }
}

