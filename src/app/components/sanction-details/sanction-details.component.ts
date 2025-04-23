import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { LawDetails } from 'src/app/models/sanction';
import { hg1061List } from 'src/app/static-data/hg1061-constants';
import { law248List } from 'src/app/static-data/law248-constants';
import { law61List } from 'src/app/static-data/law61-constants';
import { oug105List } from 'src/app/static-data/oug105-constants';
import { oug194List } from 'src/app/static-data/oug194-constants';
import { oug23List } from 'src/app/static-data/oug23-constants';
import { oug97List } from 'src/app/static-data/oug97-constants';
import { tabacoList } from 'src/app/static-data/tabaco-constants';
import { l176List } from 'src/app/static-data/l176-constants';

@Component({
  selector: 'app-sanction-details',
  templateUrl: './sanction-details.component.html',
  styleUrls: ['./sanction-details.component.scss']
})
export class SanctionDetailsComponent implements OnInit {
  contentId = 1;
  parentId = 1;
  detailLists: { [id: string] : LawDetails[] } = {};
  readonly oug97Sanctions = oug97List;
  readonly law248Sanctions = law248List;
  readonly law61Sanctions = law61List;
  readonly hg1061Sanctions = hg1061List;
  readonly oug23Sanctions = oug23List;
  readonly oug105Sanctions = oug105List;
  readonly oug194Sanctions = oug194List;
  readonly tabacoSanctions = tabacoList;
  readonly l176Sanctions = l176List;
  
  selectedLaw: LawDetails = {
    parentId: 0,
    contentId: 0,
    title: '',
    text: ''
  };

  constructor(public activatedRoute: ActivatedRoute) { 
    this.detailLists["1"] = oug97List;
    this.detailLists["2"] = law248List;
    this.detailLists["3"] = oug105List;
    this.detailLists["4"] = oug194List;
    this.detailLists["5"] = law61List;
    this.detailLists["6"] = oug23List;
    this.detailLists["7"] = hg1061List;
    this.detailLists["8"] = tabacoList;
    this.detailLists["10"] = l176List;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.parentId = +params['contentId'].split(".")[0]
      this.contentId = +params['contentId'].split(".")[1];

      this.selectedLaw = this.detailLists[this.parentId].find(oug => oug.contentId === this.contentId)!
    })
  }
}
