import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  title = 'Weni Store - Acceuil';

  constructor(private titleService:Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

}
