import { Url } from '@domain/entity/url.entity';
import { UrlMongoose } from '@infrastructure/schemas/url-mongoose.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UrlRepository } from 'src/domain/repository/url.repository';

@Injectable()
export class UrlMongooseRepository implements UrlRepository {
  @InjectModel(UrlMongoose.name)
  private urlModel: Model<UrlMongoose>;

  async create(url: Url): Promise<void> {
    await this.urlModel.create(url);
  }

  async get(shortUrl: string): Promise<Url> {
    return this.urlModel.findOne({ shortUrl });
  }
}
