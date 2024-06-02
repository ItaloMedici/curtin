import { IUrl } from '@domain/entity/url.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UrlMongoose implements IUrl {
  @Prop({ unique: true })
  shortUrl: string;

  @Prop()
  longUrl: string;
}

export const UrlMongooseSchema = SchemaFactory.createForClass(UrlMongoose);
