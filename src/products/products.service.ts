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

  findOne(name: string) {
    return this.productModel.findOne({ name: name });
  }

  async update(name: string, amount: Amount) {
    const product = await this.productModel.findOne({ name: name });
    /*
    if ((await product).quantity - amount.amount < 0) {
      const newInvoice = [
        ...product.invoices,
        { amount: amount, date: new Date() },
      ];
      return 'The amount you ordered is not available';
    }
    
    this.productModel.updateOne(
      { name: name },
      { $set: { invoices: newInvoice } },
    ); */

    return this.productModel.updateOne(
      { name: name },
      {
        $set: { quantity: product.quantity - amount.amount },
        invoices: [
          ...product.invoices,
          { amount: amount.amount, date: new Date() },
        ],
      },
    );
  }

  findInvoice(invoice: string) {
    return this.productModel.find({ name: invoice }, { invoices: 0, name: 0 });
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }

  sell(invoice: Invoice): Promise<Invoice> {
    return this.invoiceModel.create(invoice);
  }
}
