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

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch('sell/:id')
  update(@Param('id') id: string, @Body() updateProductDto: Product) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}