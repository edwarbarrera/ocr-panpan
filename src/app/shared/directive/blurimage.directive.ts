import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2, ViewChild } from "@angular/core";

@Directive({
  selector:'[blurImage]'
})
export class BlurImageDirective implements AfterViewInit{

 @Input() blur :string = 'blur(1.5rem)'



 constructor(private el : ElementRef,
 private renderer: Renderer2){}

  ngAfterViewInit(){
this.setBackdropFilter(this.blur)


  }


setBackdropFilter(blur:string){


this.renderer.setStyle(this.el.nativeElement, 'filter', blur)

}


@HostListener('mouseenter') onMouseEnter(){
  this.setBackdropFilter('blur(0)')

}

@HostListener('mouseleave') onMouseLeave(){
  this.setBackdropFilter('blur(1.5rem)');

}

}
