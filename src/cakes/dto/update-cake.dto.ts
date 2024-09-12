import { PartialType } from '@nestjs/mapped-types';
import { CreateCakeDto } from './create-cake.dto';

export class UpdateCakeDto extends PartialType(CreateCakeDto) {}
