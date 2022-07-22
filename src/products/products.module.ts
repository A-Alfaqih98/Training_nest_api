import { Module } from '@nestjs/common';
import { InvoicesService, ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './product.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceSchema } from './invoice.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Invoice.name, schema: InvoiceSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, InvoicesService],
})
export class ProductsModule {}
