import { Component, Input, OnInit } from '@angular/core';
import { NavigationCountry } from 'src/app/models/navigation-country';
import { CountryNavigationReadingService } from 'src/app/services/country-navigation-reading.service';

@Component({
  selector: 'app-country-navigation',
  templateUrl: './country-navigation.component.html',
  styleUrls: ['./country-navigation.component.scss']
})
export class CountryNavigationComponent implements OnInit {

  @Input()
  contentFileName: string = '';

  navigationCountries: NavigationCountry[] = [];

  constructor(private countryNavigationReadingService: CountryNavigationReadingService) {

  }

  ngOnInit() {
    this.countryNavigationReadingService.getCountryNavigationFromFile(this.contentFileName)
      .subscribe(result =>
        this.navigationCountries = result
      )
  }
}
