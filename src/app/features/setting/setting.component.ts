import {Component, OnInit} from '@angular/core';
import {LanguageService} from "../../core/services/language.service";
import {Language} from "../../core/models/language.model";
import {TranslocoService} from "@ngneat/transloco";



@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  languages: Language[] = [];
  label?: string;
  selectedLanguage: Language = { label: '', value: '' };
  constructor(private langService: LanguageService,
             ) {
  }

  ngOnInit(): void {

    this.languages = [
      {label: 'English', value: 'en'},
      {label: 'French', value: 'fr'},
    ]

  }

  onLangChange(event: any) {
    this.selectedLanguage = event.value;
    this.label = event.value.label;
    this.langService.onLangChange(event.value.value);
  }

}
