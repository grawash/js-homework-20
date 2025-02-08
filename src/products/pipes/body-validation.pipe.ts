import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class BodyValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (typeof value.name !== 'string') {
            throw new BadRequestException('name must be a string');
        }
        if (typeof value.price !== 'number') {
            throw new BadRequestException('price must be a number');
        }
        if (typeof value.category !== 'string') {
            throw new BadRequestException('category must be a string');
        }
        
        return value;
    }
}
