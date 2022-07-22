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
import { Invoice } from './invoice.model';
import { Product } from './product.model';
import { ProductsService, InvoicesService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly invoicesService: InvoicesService,
  ) {}

  // First endpoint : Add product
  @Post('add')
  create(@Body() createProductDto: Product) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // Second endpoint : find product
  @Get('find/:name')
  findOne(@Param('name') name: string) {
    return this.productsService.findOne(name);
  }

  // Third endpoint: sell product
  @Post('sell')
  async sell(@Body() createInvoiceDto: Invoice) {
    return await (this.productsService.update(createInvoiceDto),
    this.invoicesService.sell(createInvoiceDto));
  }

  // Fourth endpoint: search invoice (by product name)
  @Get('search/invoice/:product')
  searchInvoice(@Param('product') product: string) {
    return this.invoicesService.searchByProduct(product);
  }
}
