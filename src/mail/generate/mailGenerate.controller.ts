import { Controller, Post, Get, Body, HttpCode, InternalServerErrorException, Param, HttpStatus } from '@nestjs/common';
import { GenerateMailDto } from './dto/generate-mail.dto';
import { MailGenerateService } from './mailGenerate.service';

@Controller('mail/generate')
export class MailGenerateController {
  constructor(private readonly mailGenerateService: MailGenerateService) {}

  @Post(':id')
  @HttpCode(201)
  async receiveMail(@Body() body: GenerateMailDto, @Param('id') id: string) {
    
    try {
      const reply = await this.mailGenerateService.generateMail(body, id);
      console.log("Reply: ", reply);
      return { status: HttpStatus.CREATED, mail: reply };
    } catch (error) {
      return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'An error occurred.'};
    }
  }

  @Get()
  @HttpCode(200)
  async getMail() {
    try {
      return { message: 'OK' };
    } catch (error) {
      throw new InternalServerErrorException('Une erreur est survenue');
    }
  }
}

