import { Url } from '@domain/entity/url.entity';

export abstract class UrlRepository {
  abstract create(url: Url): Promise<void>;
  abstract get(shortUrl: string): Promise<Url>;
}
