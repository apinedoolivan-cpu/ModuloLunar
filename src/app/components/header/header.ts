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
      // Solo se ejecuta en navegador
      const lang = this.document.location.pathname.split('/')[1];
      this.currentLang = lang === 'en' ? 'en' : 'es';
    }
  }

  get targetLang(): 'es' | 'en' {
    return this.currentLang === 'es' ? 'en' : 'es';
  }

  switchLanguage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const pathParts = this.document.location.pathname.split('/').filter(Boolean);
      pathParts.shift(); // quitar idioma actual
      const newPath = `/${this.targetLang}/${pathParts.join('/')}`;
      this.document.location.href = newPath || `/${this.targetLang}/`;
    }
  }
}
