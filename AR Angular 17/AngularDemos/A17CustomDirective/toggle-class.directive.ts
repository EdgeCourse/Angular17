import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[toggleClass]',
  standalone: true
})
export class ToggleClassDirective {
  // This input accepts the CSS class to toggle.
  @Input('toggleClass') toggleClassName: string = 'active';

  private isToggled = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Toggle the class on click.
  @HostListener('click') onClick() {
    this.isToggled = !this.isToggled;
    if (this.isToggled) {
      this.renderer.addClass(this.el.nativeElement, this.toggleClassName);
    } else {
      this.renderer.removeClass(this.el.nativeElement, this.toggleClassName);
    }
  }
}
