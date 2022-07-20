import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Amount } from './amount.model';
import { Invoice, InvoiceDocument } from './invoice.model';
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

  findOne(id: string) {
    return this.productModel.findById(id);
  }

  async update(name: string, amount: Amount) {
    const currentAmount = this.productModel.findOne({ name: name });
    return this.productModel.updateOne(
      { name: name },
      { $inc: { quantity: -amount.amount } },
    );
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }

  sell(invoice: Invoice): Promise<Invoice> {
    return this.invoiceModel.create(invoice);
  }
}
