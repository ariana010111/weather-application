import { Injectable } from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";
import {SourceStorageService} from "./source-storage.service";
import {LanguageModel} from "../models/language.model";
export const LANG_STORE_KEY = 'lang';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languageList = [
    { code: 'en', label: LanguageModel.English },
    { code: 'fr', label: LanguageModel.French }
  ];


  constructor( private storage: SourceStorageService,
    public translate: TranslocoService,) { }

  getCurrentLang() {
    return this.translate.getActiveLang();
  }

  onLangChange(lang: string) {
    // 'en' | 'nl'
    // this.accountService
    //   .updateLang(this.languageList.find((l) => l.code === lang)!.label)
    //   .subscribe(async (res) => {
    //     const loading = await this.loadingCtrl.create({
    //       spinner: 'circles'
    //     });
    //     loading.present();
        this.changeAppLanguage(lang);
      // await this.authService.renewToken();
        // loading.dismiss();
       // this.configService.reloadApp();
      // });
  }
  changeAppLanguage(lang: string): void {
    this.translate.setActiveLang(lang);
    const currentLanguage = this.translate.getActiveLang();
    this.storage.setItem(LANG_STORE_KEY, lang);
    console.log('currentLanguage', currentLanguage);
  }
}
