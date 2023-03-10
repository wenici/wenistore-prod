import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-no-found-page',
  templateUrl: './no-found-page.component.html',
  styleUrls: ['./no-found-page.component.css']
})
export class NoFoundPageComponent implements OnInit {

  constructor(private titleService:Title) { }

  title = 'Weni Store - Page Non Trouvée';

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

}
