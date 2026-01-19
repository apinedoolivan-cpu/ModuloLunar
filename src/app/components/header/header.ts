import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  currentLang: 'es' | 'en' = 'es';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const pathParts = this.document.location.pathname
        .split('/')
        .filter(Boolean);

      const langIndex = pathParts.findIndex(p => p === 'es' || p === 'en');

      this.currentLang =
        langIndex !== -1 && pathParts[langIndex] === 'en'
          ? 'en'
          : 'es';
    }
  }

  get targetLang(): 'es' | 'en' {
    return this.currentLang === 'es' ? 'en' : 'es';
  }

  switchLanguage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const pathParts = this.document.location.pathname
      .split('/')
      .filter(Boolean);

    const langIndex = pathParts.findIndex(p => p === 'es' || p === 'en');

    let newParts = [...pathParts];

    if (langIndex !== -1) {
      
      newParts[langIndex] = this.targetLang;
    } else {
    
      newParts.push(this.targetLang);
    }

    const newPath = '/' + newParts.join('/');

    this.document.location.href = newPath.endsWith('/')
      ? newPath
      : newPath + '/';
  }
}
