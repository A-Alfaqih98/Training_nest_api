import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

interface invoiceInterface {
  amount: number;
  date: Date;
}

@Schema()
@ApiTags('products')
export class Product {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  price: number;

  @Prop()
  @ApiProperty()
  quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
