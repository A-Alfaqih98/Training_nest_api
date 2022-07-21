import { ParseUUIDPipe } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

@Schema()
@ApiTags('invoices')
export class Invoice {
  @Prop()
  @ApiProperty()
  id: ParseUUIDPipe;

  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  date: Date;

  @Prop()
  @ApiProperty()
  price: number;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
