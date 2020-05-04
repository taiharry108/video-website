import { Injectable, Injector, Type } from '@angular/core';
import { CarouselRef } from './carousel-ref';
import {
  PortalInjector,
  ComponentPortal,
  ComponentType,
  Portal,
} from '@angular/cdk/portal';
import { CarouselComponent } from './carousel.component';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  constructor(private injector: Injector) {}

  // createInjector(carouselRef: CarouselRef, injector: Injector): PortalInjector {
  //   const injectorTokens = new WeakMap([[CarouselRef, carouselRef]]);
  //   return new PortalInjector(injector, injectorTokens);
  // }

  createInjector<T>(ref: T, injector: Injector, type: Type<T>): PortalInjector {
    const injectorTokens = new WeakMap([[type, ref]]);
    return new PortalInjector(injector, injectorTokens);
  }

  getPortal<T1, T2, T3>(
    content: T1[],
    componentType: ComponentType<T2>,
    type: Type<T3>,
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

    const carouselRef = new CarouselRef(portals);
    const portal = new ComponentPortal(
      CarouselComponent,
      null,
      this.createInjector<CarouselRef>(carouselRef, this.injector, CarouselRef)
    );
    return portal;
  }

  // getPortal(portals: Portal<any>[]): ComponentPortal<CarouselComponent> {
  //   // const portals = this.content.map((data) => {
  //   //   const insideRef = new InsideCarouselRef(data);
  //   //   const portal = new ComponentPortal(
  //   //     InsideCarouselComponent,
  //   //     null,
  //   //     this.createInjector(insideRef, this.injector)
  //   //   );
  //   //   return portal;
  //   // });

  //   const carouselRef = new CarouselRef(portals);
  //   const portal = new ComponentPortal(
  //     CarouselComponent,
  //     null,
  //     this.createInjector<CarouselRef>(carouselRef, this.injector, CarouselRef)
  //   );
  //   return portal;
  // }
}
