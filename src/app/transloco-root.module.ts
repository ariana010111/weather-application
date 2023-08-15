import {
  TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig, TranslocoLoader,
  TranslocoModule,
  Translation
} from '@ngneat/transloco';
import {Injectable, NgModule} from '@angular/core';
import {environment} from "../environments/environment";
import {SourceStorageService} from "./core/services/source-storage.service";
@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {

  constructor( private storage: SourceStorageService) {

  }
  getTranslation(lang: string) {
    lang = this.storage.getItem('lang');
    return import(`../assets/i18n/${lang}.json`).then(
      (res: any) => res.default
    );
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'fr'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: environment.production
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
  ]
})
export class TranslocoRootModule {}

