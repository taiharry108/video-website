import { Portal } from '@angular/cdk/portal';

export class CarouselRef<T = any> {
    constructor(public portals: Portal<any>[]) {}
}