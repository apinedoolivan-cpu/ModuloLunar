import { Injectable } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScrollService {

  constructor(private scroller: ViewportScroller) {}

  scrollToElement(el: HTMLElement) {
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToAnchor(id: string) {
    if (!id) return;
    setTimeout(() => this.scroller.scrollToAnchor(id), 0);
  }
}
