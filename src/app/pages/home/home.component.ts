import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private cat:CategoriesService) { }

  ngOnInit() {
  }

  search(){
    this.cat.searchCat(1);
  }
}
