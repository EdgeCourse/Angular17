// src/app/book-inventory/hover-highlight.directive.ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]',
  standalone: true
})
export class HoverHighlightDirective {
  @Input('appHoverHighlight') highlightColor: string = '';
  private defaultColor: string = '';

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.transition = 'background-color 0.3s ease';
  }
  
  @HostListener('mouseenter')
  onMouseEnter(): void {
    // Store current background color and apply the highlight color
    this.defaultColor = this.el.nativeElement.style.backgroundColor;
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    // Revert to the original background color
    this.highlight(this.defaultColor);
  }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
