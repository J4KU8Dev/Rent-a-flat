import { Directive, ElementRef, inject, OnDestroy, output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutside implements OnDestroy{
  clickOutside = output<void>();
  private readonly elementRef = inject(ElementRef);
  private readonly rendered = inject(Renderer2);
  private listener: (() => void) | null = null;
  private firstClick = true;

  constructor() {
    this.listener = this.rendered.listen('document', 'click',(e: Event) => {
      if(this.firstClick) {
        this.firstClick = false;
        return;
      }
      if(!this.elementRef.nativeElement.contains(e.target)) {
        this.clickOutside.emit();
      }
    })
  }
  ngOnDestroy(): void {
    this.listener?.();
  }


}
