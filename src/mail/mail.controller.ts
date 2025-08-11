import { Controller, Post, Get, Body, HttpCode, InternalServerErrorException } from '@nestjs/common';

@Controller('mail')
export class MailController {
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
  async getMail() {
    try {
      return { message: 'OK' };
    } catch (error) {
      throw new InternalServerErrorException('Une erreur est survenue');
    }
  }
}

