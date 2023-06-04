import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Sanction } from 'src/app/models/sanction';
import { oug97List } from 'src/app/static-data/oug97-constants';

@Component({
  selector: 'app-sanction-details',
  templateUrl: './sanction-details.component.html',
  styleUrls: ['./sanction-details.component.scss']
})
export class SanctionDetailsComponent implements OnInit {
  contentId = 1;
  readonly oug97Sanctions = oug97List;
  selectedSanction: Sanction = {
    contentId: 0,
    title: '',
    text: ''
  };

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.contentId = +params['contentId'];
      const element = oug97List.find(oug => oug.contentId === this.contentId);
      this.selectedSanction = this.oug97Sanctions.find(oug => oug.contentId === this.contentId)!;
    })
  }
}
