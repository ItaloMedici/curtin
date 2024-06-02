import {
  CreateShortUrlDto,
  CreateShortUrlUseCase,
} from '@application/use-cases/create-short-url';
import { Url } from '@domain/entity/url.entity';
import { UrlRepository } from '@domain/repository/url.repository';
import { ConfigService } from '@nestjs/config';

describe('Create Short Url Use Case', () => {
  it('should execute and create a short url', async () => {
    const longUrl = 'https://www.google.com';
    const shortUrl = 'aHR0cHM';
    const domainUrl = 'http://localhost:3000';

    const createShortUrlDto: CreateShortUrlDto = { url: longUrl };
    const output: CreateShortUrlDto = { url: `${domainUrl}/${shortUrl}` };

    const urlRepository: UrlRepository = {
      create: jest.fn().mockResolvedValue(shortUrl),
      get: jest.fn(),
    };

    const configService = {
      get: jest.fn().mockReturnValue(domainUrl),
    } as unknown as ConfigService;

    const urlCreated = new Url(longUrl);

    const createShortUrlUseCase = new CreateShortUrlUseCase(
      urlRepository,
      configService,
    );

    const result = await createShortUrlUseCase.execute(createShortUrlDto);

    expect(urlRepository.create).toHaveBeenCalledWith(urlCreated);
    expect(result).toEqual(output);
    expect(configService.get).toHaveBeenCalledWith('DOMAIN_URL');
  });
});
