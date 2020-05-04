import {
  Directive,
  ComponentFactoryResolver,
  ViewContainerRef,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { OverlayComponent } from './overlay.component';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appOverlay]',
})
export class OverlayDirective implements OnInit {
  constructor(
    private cfResolver: ComponentFactoryResolver,
    public vcRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.appendComponent();
  }

  public appendComponent() {
    const factory = this.cfResolver.resolveComponentFactory(OverlayComponent);
    const componentRef = this.vcRef.createComponent(factory);
    this.renderer.appendChild(
      this.vcRef.element.nativeElement.parentNode,
      componentRef.injector.get(OverlayComponent).elRef.nativeElement
    );
  }
}
