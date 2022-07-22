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

  @Post('sell')
  async sell(@Body() createInvoiceDto: Invoice) {
    return await (this.productsService.update(createInvoiceDto),
    this.invoicesService.sell(createInvoiceDto));
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
