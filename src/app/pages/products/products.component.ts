import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  sublevel_id: number;
  items = null;

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) {


    this.activatedRoute.url
      .subscribe(url => {
        this.productsService.getProductsBySublevelid(parseInt(url[1].path)).then(items => {
          this.items = items;
          console.log(this.items);
        })
      });
  }

  ngOnInit() {


  }

  load() {



  }


}
