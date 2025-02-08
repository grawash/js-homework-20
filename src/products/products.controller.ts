import { Body, Controller, DefaultValuePipe, Delete, Get, Headers, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilterProductPipe } from './pipes/filter-products.pipe';
import { Iproducts } from './DTOs/products.interface';
import { createProductDto } from './DTOs/create-product.dto';
import { BodyValidationPipe } from './pipes/body-validation.pipe';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Get()
    getAllExpenses(@Query(new FilterProductPipe) query: Iproducts, @Headers() headers,@Query('lang', new DefaultValuePipe('en')) lang: string){
        if(!headers.token || headers.token !== '12345') throw new HttpException('permission denied!', HttpStatus.UNAUTHORIZED)
        return this.productsService.getAllProducts(query, lang)
    }

    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number){
        return this.productsService.getProductById(id)
    }

    @Post()
    createProduct(@Body(new BodyValidationPipe) body: createProductDto){
        return this.productsService.createProduct(body)
    }

    @Put(':id')
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body(new FilterProductPipe) Body: Partial<Iproducts>){
        return this.productsService.updateProduct(id, Body)
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id: number){
        return this.productsService.deleteProduct(id)
    }
}
