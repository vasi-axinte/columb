import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {

  selectedLanguageCode = 'ro';

  constructor(private translocoService: TranslocoService) {}
  public languagesList: 
    Array<Record<'countryCode' | 'code' | 'name' | 'shorthand', string>> = [
    {
      countryCode: 'gb',
      code: 'en',
      name: 'English',
      shorthand: 'ENG',
    },
    {
      countryCode: 'ro',
      code: 'ro',
      name: 'Română',
      shorthand: 'RO',
    },
  ];
  public changeLanguage(languageCode: string): void {
    this.selectedLanguageCode = languageCode;
    this.translocoService.setActiveLang(languageCode);
    languageCode === 'fa'
      ? (document.body.style.direction = 'rtl')
      : (document.body.style.direction = 'ltr');
  }
}
