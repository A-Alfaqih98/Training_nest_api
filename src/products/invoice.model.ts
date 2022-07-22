import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

export interface ObjectDto {
  name: string;
  invoice: number;
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
