import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

export interface ObjectDto {
  amount: number;
  name: string;
  price: number;
}

@Schema()
@ApiTags('invoice')
export class Invoice {
  @Prop()
  @ApiProperty({ type: [Object] })
  order: ObjectDto[];
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
