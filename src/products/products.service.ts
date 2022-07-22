import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Invoice, ObjectDto } from './invoice.model';
import { InvoiceDocument } from './invoice.model';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
  ) {}
  async create(product: Product): Promise<Product> {
    return this.productModel.create(product);
  }

  findAll() {
    console.log(this.productModel.find());

    return this.productModel.find();
  }

  findOne(name: string) {
    return this.productModel.findOne({ name: name });
  }

  update(invoice: Invoice) {
    invoice.order.forEach((element) => {
      return this.productModel.findOneAndUpdate(
        { name: element.name },
        { $inc: { quantity: -element.amount } },
      );
    });
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
  ) {}

  async sell(invoice: Invoice): Promise<Invoice> {
    invoice.order.forEach(async (element) => {
      await this.productModel.findOneAndUpdate(
        { name: element.name },
        { $inc: { quantity: -element.amount } },
      );
    });

    return await this.invoiceModel.create(invoice);
  }
}
