import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MovieOutput {
  @Field(() => ID)
  _id: string;

  @Field()
  title: string;

  @Field()
  episode_id: number;

  @Field()
  opening_crawl: string;

  @Field()
  director: string;

  @Field()
  producer: string;

  @Field()
  release_date: string;

  @Field(() => [String])
  characters: string[];

  @Field(() => [String])
  planets: string[];

  @Field(() => [String])
  starships: string[];

  @Field(() => [String])
  vehicles: string[];

  @Field(() => [String])
  species: string[];

  @Field()
  created: string;

  @Field()
  edited: string;

  @Field()
  url: string;
}

@InputType()
export class MovieInput {
  @Field()
  title: string;

  @Field()
  episode_id: number;

  @Field()
  opening_crawl: string;

  @Field()
  director: string;

  @Field()
  producer: string;

  @Field()
  release_date: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  characters?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  planets?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  starships?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  vehicles?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  species?: string[];

  @Field()
  created: string;

  @Field()
  edited: string;

  @Field()
  url: string;
}

@InputType()
export class MovieUpdateInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  episode_id?: number;

  @Field({ nullable: true })
  opening_crawl?: string;

  @Field({ nullable: true })
  director?: string;

  @Field({ nullable: true })
  producer?: string;

  @Field({ nullable: true })
  release_date?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  characters?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  planets?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  starships?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  vehicles?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  species?: string[];

  @Field({ nullable: true })
  created?: string;

  @Field({ nullable: true })
  edited?: string;

  @Field({ nullable: true })
  url?: string;
}
