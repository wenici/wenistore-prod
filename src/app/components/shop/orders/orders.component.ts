import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ShoppingCardService } from '../../../shared/services/shopping-card.service'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private shopping: ShoppingCardService,) {}

  ngOnInit(): void {
  }


}
