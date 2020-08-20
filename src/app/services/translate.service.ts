import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {prop} from 'ramda';

// services
import {Storage} from '@services/storage.service';

// config
import {LANGUAGES} from '@config/languages';

@Injectable({
  providedIn: 'root'
})
export class Translate extends TranslateService {
  storage: Storage = new Storage(); // manually assign to avoid extend constructor

  init(): void {
    // languages available
    this.addLangs(LANGUAGES);

    // language to use if language isn't available
    this.setDefaultLang(prop(0, LANGUAGES));

    // set language
    this.use(this.detectDefaultLanguage());
  }

  detectDefaultLanguage(): string {
    const currentLanguage = this.storage.get('currentLanguage');

    return currentLanguage || this.detectBrowserLanguage();
  }

  detectBrowserLanguage(): string {
    const browserLanguage = this.getBrowserLang();

    // if browser language is available
    return this.getLangs().includes(browserLanguage)
      ? browserLanguage
      : this.defaultLang;
  }

  use(language: string) {
    this.storage.set('currentLanguage', language);
    return super.use(language);
  }

  hasTranslation(key: string): boolean {
    return this.instant(key) !== key;
  }
}
