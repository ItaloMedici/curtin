import { UrlRepository } from '@domain/repository/url.repository';
import { UrlMongooseRepository } from '@infrastructure/repository/url-mongoose.repository';
import { Provider } from '@nestjs/common';

export const repositoriesProvider: Provider[] = [
  {
    provide: UrlRepository,
    useClass: UrlMongooseRepository,
  },
];
