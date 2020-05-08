import { Portal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

export class CarouselRef<T = any> {
    constructor(public portals: Portal<any>[], public imgs: string[]) {}
}