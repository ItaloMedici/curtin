import { Url } from '@domain/entity/url.entity';

describe('Url Entity', () => {
  const longUrl = 'https://www.google.com';

  it('should create a new Url', () => {
    const url = new Url(longUrl);

    expect(url.longUrl).toBe(longUrl);
    expect(url.shortUrl).toBeDefined();
  });

  it('should create an base 64 short url', () => {
    const url = new Url(longUrl);

    const enconded = Buffer.from(longUrl).toString('base64').slice(0, 7);

    console.log(url.shortUrl);

    expect(url.shortUrl).toBe(enconded);
    expect(url.shortUrl.length).toBe(7);
  });

  it('should build url with domain', () => {
    const url = new Url(longUrl);
    const domain = 'http://localhost:3000';

    const urlWithDomain = url.buildUrlWithDomain(domain);

    expect(urlWithDomain).toBe(`${domain}/${url.shortUrl}`);
  });
});
