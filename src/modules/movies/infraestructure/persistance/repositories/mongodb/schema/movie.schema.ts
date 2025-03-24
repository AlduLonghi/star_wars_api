import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  episode_id: number;

  @Prop()
  opening_crawl: string;

  @Prop()
  director: string;

  @Prop()
  producer: string;

  @Prop({ required: true })
  release_date: string;

  @Prop([String])
  characters: string[];

  @Prop([String])
  planets: string[];

  @Prop([String])
  starships: string[];

  @Prop([String])
  vehicles: string[];

  @Prop([String])
  species: string[];

  @Prop()
  created: string;

  @Prop()
  edited: string;

  @Prop()
  url: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
