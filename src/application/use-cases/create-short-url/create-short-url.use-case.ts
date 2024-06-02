import { Url } from '@domain/entity/url.entity';
import { UrlRepository } from '@domain/repository/url.repository';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateShortUrlDto } from './create-short-url.dto';

@Injectable()
export class CreateShortUrlUseCase {
  private readonly logger = new Logger(CreateShortUrlUseCase.name);

  constructor(
    private readonly urlRepository: UrlRepository,
    readonly configService: ConfigService,
  ) {}

  async execute({ url }: CreateShortUrlDto): Promise<CreateShortUrlDto> {
    this.logger.log(`Creating short url for ${url}`);

    try {
      const _url = new Url(url);

      const domainUrl = this.configService.get<string>('DOMAIN_URL');
      const urlWithDomain = _url.buildUrlWithDomain(domainUrl);

      const existingUrl = await this.urlRepository.get(_url.shortUrl);

      if (!existingUrl) {
        await this.urlRepository.create(_url);
      }

      return { url: urlWithDomain };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error?.message);
    }
  }
}
