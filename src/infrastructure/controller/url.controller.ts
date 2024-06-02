import {
  CreateShortUrlDto,
  CreateShortUrlUseCase,
} from '@application/use-cases/create-short-url';
import { RedirectUrlUseCase } from '@application/use-cases/redirect-url/redirect-url.use-case';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class UrlController {
  @Inject(CreateShortUrlUseCase)
  private readonly createShortUrlUseCase: CreateShortUrlUseCase;

  @Inject(RedirectUrlUseCase)
  private readonly redirectUrlUseCase: RedirectUrlUseCase;

  @Post('create-short-url')
  async createShortUrl(
    @Body() createShortUrlDto: CreateShortUrlDto,
  ): Promise<CreateShortUrlDto> {
    return this.createShortUrlUseCase.execute(createShortUrlDto);
  }

  @Get(':shortUrl')
  async redirectUrl(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
  ): Promise<void> {
    const longUrl = await this.redirectUrlUseCase.execute({ shortUrl });
    res.redirect(longUrl);
  }
}
