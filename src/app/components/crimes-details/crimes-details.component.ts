import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LawDetails } from 'src/app/models/sanction';
import { FileReadingService } from 'src/app/services/file-reading.service';

@Component({
  selector: 'app-crimes-details',
  templateUrl: './crimes-details.component.html',
  styleUrls: ['./crimes-details.component.scss']
})
export class CrimesDetailsComponent implements OnInit{
  contentId = 1;
  parentId = 1;
  detailLists: { [id: string] : string } = {};
  
  selectedLaw: LawDetails = {
    parentId: 0,
    contentId: 0,
    title: '',
    text: ''
  };

  constructor(public activatedRoute: ActivatedRoute, private fileReadingService: FileReadingService) { 

    this.detailLists["1"] = "1 Vehicul neînmatriculat  neînregistrat";
    this.detailLists["2"] = "2 Vehicul cu număr fals de înmatriculare  înregistrare";
    this.detailLists["3"] = "3 Remorcă neînmatriculată ori cu număr fals";
    this.detailLists["4"] = "4 Plăcuțe retrasefără drept de circulație în RO";
    this.detailLists["5"] = "5 Conducerea unui vehicul fără permis de conducere";
    this.detailLists["6"] = "6 P.c. necorespunzătorretrasanulatfără drept în RO";
    this.detailLists["7"] = "7 Încredințarea unui vehicul";
    this.detailLists["8"] = "8 Trecerea frauduloasă a frontierei de stat";
    this.detailLists["9"] = "9 Traficul de migranți";
    this.detailLists["10"] = "10 Facilitarea șederii ilegale în România";
    this.detailLists["11"] = "11 Sustragerea de la măsurile de îndepărtare din RO";
    this.detailLists["12"] = "12 Falsul material în înscrisuri oficiale";
    this.detailLists["13"] = "13 Falsul intelectual";
    this.detailLists["14"] = "14 Falsul în înscrisuri sub semnătură privată";
    this.detailLists["15"] = "15 Uzul de fals";
    this.detailLists["16"] = "16 Falsul în declarații";
    this.detailLists["17"] = "17 Falsul privind identitatea";
    this.detailLists["18"] = "18 Traficul de persoane";
    this.detailLists["19"] = "19 Traficul de minori";
    this.detailLists["20"] = "20 Infracţiunea de contrabandă";
    this.detailLists["21"] = "21 Infracţiunea de contrabandă calificată";
    this.detailLists["22"] = "22 Deținerecomercializare produse accizabile";
    this.detailLists["23"] = "23 Cantitate cumulată de produse accizabile";
    
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.parentId = +params['contentId'].split(".")[0]
      this.contentId = +params['contentId'].split(".")[1];

      this.fileReadingService.getDataFromFile("assets/content/crimes/" + this.contentId +".txt")
      .subscribe( result =>
        {
          this.selectedLaw = {
            parentId: this.parentId,
            contentId: this.contentId,
            title: this.detailLists[this.contentId],
            text: result
          }
          console.log(this.selectedLaw.text);
      }
      )
    })
  }
}
