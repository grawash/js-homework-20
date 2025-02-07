import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import e from 'express';
import { Iproducts } from './DTOs/products.interface';

@Injectable()
export class ProductsService {
    private products = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 99.99,
            category: "Electronics",
            createdAt: new Date("2024-02-01T10:00:00Z"),
        },
        {
            id: 2,
            name: "Gaming Mouse",
            price: 49.99,
            category: "Accessories",
            createdAt: new Date("2024-02-03T12:30:00Z"),
        },
        {
            id: 3,
            name: "Mechanical Keyboard",
            price: 129.99,
            category: "Peripherals",
            createdAt: new Date("2024-02-05T15:45:00Z"),
        },
        ];
      
    getAllProducts(query: Iproducts){
        return this.products.filter(product => {
            return Object.entries(query).every(([key, value]) => {
                if(key !== 'price'){
                    return product[key] === value
                } else {
                    return product.price >= query.price
                }
            });
        });
    }

    getProductById(id: number){
        const product = this.products.find(el => el.id === id)
        if(!product){
            throw new HttpException('product not found', HttpStatus.NOT_FOUND)
        }
        return product
    }
}
