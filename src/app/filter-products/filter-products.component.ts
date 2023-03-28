import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BreadcrumbService, Breadcrumb } from 'angular-crumbs';

@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.css']
})
export class FilterProductsComponent implements OnInit {

  constructor(private title: Title, private breadcrumb: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumb.breadcrumbChanged.subscribe( crumbs => {
      this.title.setTitle(this.createTitle(crumbs));
    })    
  }

  private createTitle(routesCollection: Breadcrumb[])  {
    const title = 'Filtrage de produits';
    const titles = routesCollection.filter((route) => route.displayName)
    if(!titles.length) { return title }
    const routeTitle = this.titlesRoutes(titles);
    return `${routeTitle} ${title}`
  }

  private titlesRoutes(titles: any[]) {
    return titles.reduce((prev, curr) => {
      return `${curr.displayName} - ${prev}`;
    }, '');
  }

}