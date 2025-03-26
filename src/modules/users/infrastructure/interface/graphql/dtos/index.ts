import { InputType, Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../../../domain/entities/user';

registerEnumType(Role, { name: 'Role' });

@InputType()
export class RegisterDto {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => Role)
  role: Role;
}


@ObjectType()
export class UserDto {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field(() => Role)
  role: Role;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
