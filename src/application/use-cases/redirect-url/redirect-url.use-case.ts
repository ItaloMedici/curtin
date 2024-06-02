import { UrlRepository } from '@domain/repository/url.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RedirectUrlDto } from './redirect-url.dto';

@Injectable()
export class RedirectUrlUseCase {
  private readonly logger = new Logger(RedirectUrlUseCase.name);

  constructor(private readonly urlRepository: UrlRepository) {}

  async execute({ shortUrl }: RedirectUrlDto): Promise<string> {
    // Add cache
    const url = await this.urlRepository.get(shortUrl);

    if (!url) {
      this.logger.error(`Url not found for ${shortUrl}`);
      throw new NotFoundException(`Url not found for ${shortUrl}`);
    }

    this.logger.log(`Redirecting to ${url.longUrl} from database`);

    return url.longUrl;
  }
}
