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
      const pathParts = this.document.location.pathname.split('/').filter(Boolean);
      this.currentLang = pathParts[1] === 'en' ? 'en' : 'es';
    }
  }

  get targetLang(): 'es' | 'en' {
    return this.currentLang === 'es' ? 'en' : 'es';
  }

  switchLanguage(): void {
  if (!isPlatformBrowser(this.platformId)) {
    return;
  }

  const pathParts = this.document.location.pathname.split('/').filter(Boolean);

  const base = pathParts[0]; 
  const rest = pathParts.slice(2);

  const newPath = `/${base}/${this.targetLang}/${rest.join('/')}`;

  this.document.location.href = rest.length
    ? newPath
    : `/${base}/${this.targetLang}/`;
}
}
