export interface IUrl {
  shortUrl: string;
  longUrl: string;
}

export class Url implements IUrl {
  shortUrl: string;
  longUrl: string;

  private readonly MAX_SHORT_URL_LENGTH = 7;

  constructor(longUrl: string) {
    this.longUrl = longUrl;
    this.shortUrl = this.encondeLongUrl();
  }

  private encondeLongUrl() {
    const buffer = Buffer.from(this.longUrl);
    const shortUrl = buffer
      .toString('base64')
      .slice(0, this.MAX_SHORT_URL_LENGTH);
    return shortUrl;
  }

  buildUrlWithDomain(domain: string) {
    return `${domain}/${this.shortUrl}`;
  }
}
