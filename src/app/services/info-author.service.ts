import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoAuthor } from '../interfaces/info-author.intreface';

@Injectable({
  providedIn: 'root'
})
export class InfoAuthorService {
  infoAuthor: InfoAuthor;
  load: boolean = false;

  constructor(private http: HttpClient) {
    this.loadInfoAuthor();

  }

  loadInfoAuthor() {
    this.http.get('assets/data/info-author.json')
      .subscribe((resp: InfoAuthor) => {
        this.load = true;
        this.infoAuthor = resp;

      });
  }
}
