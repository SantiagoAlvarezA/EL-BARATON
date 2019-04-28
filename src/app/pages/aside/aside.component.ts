import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  items: any = null;
  constructor(private cat: CategoriesService) {
    this.items = this.cat.searchCat();
  }

  ngOnInit() {
  }

}
