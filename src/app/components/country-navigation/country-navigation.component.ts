import { Component, Input, OnInit } from '@angular/core';
import { NavigationCountry } from 'src/app/models/navigation-country';
import { CountryNavigationReadingService } from 'src/app/services/country-navigation-reading.service';
import { RoleEnum } from 'src/app/models/role.enum';

@Component({
  selector: 'app-country-navigation',
  templateUrl: './country-navigation.component.html',
  styleUrls: ['./country-navigation.component.scss']
})
export class CountryNavigationComponent implements OnInit {

  @Input()
  contentFileName: string = '';

  testData: any;

  navigationCountries: NavigationCountry[] = [];

  constructor(private countryNavigationReadingService: CountryNavigationReadingService) {

  }

  ngOnInit() {
    this.countryNavigationReadingService.getDataFromFile(this.contentFileName)
      .subscribe(result =>
        this.navigationCountries = result
      )
  }

  isLimitedUser(){
    const user = localStorage.getItem("user");

    if(!user){
      return false;
    }

    let userData = JSON.parse(user);

    return userData.roles == RoleEnum.LimitedUser;
  }
}
