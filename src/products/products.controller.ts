import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilterProductPipe } from './pipes/filter-products.pipe';
import { Iproducts } from './DTOs/products.interface';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Get()
    getAllExpenses(@Query(new FilterProductPipe) query: Iproducts){
        return this.productsService.getAllProducts(query)
    }

    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number){
        return this.productsService.getProductById(id)
    }
}
