import { IsArray, IsNotEmpty } from 'class-validator';
export class CreateItemDto {

  @IsNotEmpty()
  readonly username: String;

  @IsArray()
  readonly to: [String];

  @IsArray()
  readonly copy: [String];

  @IsNotEmpty()
  readonly title: String;

  @IsNotEmpty()
  readonly content: String;
}

export class EditItemDto {

  @IsNotEmpty()
  readonly id: String;

  @IsNotEmpty()
  readonly title: String;

  @IsNotEmpty()
  readonly content: String;
}
