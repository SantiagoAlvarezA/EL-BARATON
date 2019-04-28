import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: any = null;
  constructor(private productsService: ProductsService) {
    this.items = productsService.getProducts();
  }

  ngOnInit() {
  }

  search() {
  }
}
