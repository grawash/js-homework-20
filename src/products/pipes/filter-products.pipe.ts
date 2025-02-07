import { ArgumentMetadata, HttpException, HttpStatus, PipeTransform } from "@nestjs/common";
import { Iproducts } from "../DTOs/products.interface";



export class FilterProductPipe implements PipeTransform{
    transform(value: Iproducts, metadata: ArgumentMetadata) {
        const categories = ['Electronics','Accessories', 'Peripherals', 'Food']
        if(value.price){
            const parsedPrice = Number(value.price);
            if(isNaN(parsedPrice) || parsedPrice < 0) throw new HttpException('value should be positive number', HttpStatus.BAD_REQUEST)
            value.price = parsedPrice
        }
        if(value.category){
            if(!categories.includes(value.category)) throw new HttpException('category does not exist', HttpStatus.BAD_REQUEST)
        }
        return value
    }
}