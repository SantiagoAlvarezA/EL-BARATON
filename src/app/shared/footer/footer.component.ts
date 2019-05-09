import { Component, OnInit } from '@angular/core';
import { InfoAuthorService } from '../../services/info-author.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  load:boolean = false;
   constructor(public _infoAuthor: InfoAuthorService) {
    this.load = _infoAuthor.load;
    
  }

  ngOnInit() {
  }

}
