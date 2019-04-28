import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  items: any = null;
  constructor(private productsService: ProductsService) {
    this.items = productsService.getProducts();
  }

  ngOnInit() {
  }



}
