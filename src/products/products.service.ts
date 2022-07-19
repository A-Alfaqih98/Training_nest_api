import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
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

  update(id: string, product: Product) {
    return this.productModel.findByIdAndUpdate(id);
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
