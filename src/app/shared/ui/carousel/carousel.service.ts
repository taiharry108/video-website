import { Injectable, Injector, Type } from '@angular/core';
import { CarouselRef } from './carousel-ref';
import {
  PortalInjector,
  ComponentPortal,
  ComponentType,
  Portal,
} from '@angular/cdk/portal';
import { CarouselComponent } from './carousel.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  constructor(
    private injector: Injector,
  ) {}

  createInjector<T>(ref: T, injector: Injector, type: Type<T>): PortalInjector {
    const injectorTokens = new WeakMap([[type, ref]]);
    return new PortalInjector(injector, injectorTokens);
  }

  getPortal<T1, T2, T3>(
    content: T1[],
    componentType: ComponentType<T2>,
    type: Type<T3>,
    imgs: string[]
  ): ComponentPortal<CarouselComponent> {
    const portals = content.map((data) => {
      const ref = new type(data);
      const childPortal = new ComponentPortal(
        componentType,
        null,
        this.createInjector<T3>(ref, this.injector, type)
      );
      return childPortal;
    });

    const carouselRef = new CarouselRef(portals, imgs);
    const portal = new ComponentPortal(
      CarouselComponent,
      null,
      this.createInjector<CarouselRef>(carouselRef, this.injector, CarouselRef)
    );
    return portal;
  }
}
