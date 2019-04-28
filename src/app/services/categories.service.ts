import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { database } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private db: AngularFireDatabase) {

  }

  searchCat() {

    return this.db.list('categories').valueChanges();
  }
}
