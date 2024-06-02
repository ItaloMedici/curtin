import {
  RedirectUrlDto,
  RedirectUrlUseCase,
} from '@application/use-cases/redirect-url';
import { Url } from '@domain/entity/url.entity';
import { UrlRepository } from '@domain/repository/url.repository';

describe('Redirect Url Use Case', () => {
  it('should execute and return the long url succefully', async () => {
    const longUrl = 'https://www.google.com';
    const shortUrl = 'enconded';

    const redirectUrlDto: RedirectUrlDto = { shortUrl };

    const urlCreated = new Url(longUrl);

    const urlRepository: UrlRepository = {
      create: jest.fn(),
      get: jest.fn().mockResolvedValue(urlCreated),
    };

    const redirectUrlUseCase = new RedirectUrlUseCase(urlRepository);

    const redirectUrl = await redirectUrlUseCase.execute(redirectUrlDto);

    expect(urlRepository.get).toHaveBeenCalledWith(shortUrl);
    expect(redirectUrl).toBe(longUrl);
  });

  it('should execute and throw an 404 error if the url is not found', async () => {
    const shortUrl = 'enconded';

    const redirectUrlDto: RedirectUrlDto = { shortUrl };

    const urlRepository: UrlRepository = {
      create: jest.fn(),
      get: jest.fn().mockResolvedValue(null),
    };

    const redirectUrlUseCase = new RedirectUrlUseCase(urlRepository);

    try {
      await redirectUrlUseCase.execute(redirectUrlDto);
    } catch (error) {
      expect(error.message).toBe('Url not found');
      expect(error.status).toBe(404);
    }
  });
});
