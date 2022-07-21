import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type AmountDocument = Amount & Document;

@Schema()
@ApiTags('amount')
export class Amount {
  @Prop()
  @ApiProperty()
  amount: number;
}

export const AmountSchema = SchemaFactory.createForClass(Amount);
