import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { Amount } from './amount.model';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('add')
  create(@Body() createProductDto: Product) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('find/:name')
  findOne(@Param('name') name: string) {
    return this.productsService.findOne(name);
  }

  @Get('find/invoice/:invoice')
  findInvoice(@Param('invoice') invoice: string) {
    return this.productsService.findOne(invoice);
  }

  @Patch('sell/:name')
  update(@Param('name') name: string, @Body() updateAmountDto: Amount) {
    return this.productsService.update(name, updateAmountDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
