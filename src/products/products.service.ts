import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import e from 'express';
import { Iproducts } from './DTOs/products.interface';
import { createProductDto } from './DTOs/create-product.dto';

@Injectable()
export class ProductsService {
    private products: Record<string, Iproducts[]> = {
        en: [
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
        ],
        ka: [
            {
                id: 1,
                name: "უსადენო ყურსასმენები",
                price: 99.99,
                category: "ელექტრონიკა",
                createdAt: new Date("2024-02-01T10:00:00Z"),
            },
            {
                id: 2,
                name: "გეიმინგ მაუსი",
                price: 49.99,
                category: "აქსესუარები",
                createdAt: new Date("2024-02-03T12:30:00Z"),
            },
            {
                id: 3,
                name: "მექანიკური კლავიატურა",
                price: 129.99,
                category: "პერიფერიული მოწყობილობები",
                createdAt: new Date("2024-02-05T15:45:00Z"),
            },
        ],
    };

      
    getAllProducts(query: Iproducts, lang: string){
        const sanitizedQuery = Object.keys(query)
        .filter(key => key !== 'lang')
        .reduce((acc, key) => {
            acc[key] = query[key];
            return acc;
        }, {} as Partial<Iproducts>);

        return this.products[`${lang}`].filter(product => {
            return Object.entries(sanitizedQuery).every(([key, value]) => {
                if(key !== 'price'){
                    return product[key] === value
                } else if (sanitizedQuery.price) {
                    return product.price >= sanitizedQuery.price
                }
            });
        });
    }

    getProductById(id: number){
        const product = this.products['en'].find(el => el.id === id)
        if(!product){
            throw new HttpException('product not found', HttpStatus.NOT_FOUND)
        }
        return product
    }

    createProduct(body: createProductDto){
        const lastId = this.products['en'][this.products['en'].length-1]?.id || 0;
        const newProduct = {
            id: lastId+1,
            name: body.name,
            price: body.price,
            category: body.category,
            createdAt: new Date()
        }
        this.products['en'].push(newProduct)
        console.log(newProduct)
        return newProduct
    }

    updateProduct(id: number, body: Partial<Iproducts>){
        const productIndex = this.products['en'].findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new HttpException(`Product with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        this.products['en'][productIndex] = {
            ...this.products['en'][productIndex],
            name: body.name || this.products['en'][productIndex].name,
            price: body.price || this.products['en'][productIndex].price,
            category: body.category || this.products['en'][productIndex].category,
        }
        return this.products['en'][productIndex]
    }

    deleteProduct(id: number) {
        const productIndex = this.products['en'].findIndex(product => product.id === id);

        if (productIndex === -1) {
            throw new HttpException(`Product with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const deletedProduct = this.products['en'].splice(productIndex, 1);
        return deletedProduct[0];
    }
}
