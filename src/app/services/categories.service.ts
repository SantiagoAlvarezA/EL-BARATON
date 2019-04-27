import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private db: AngularFireDatabase, ) {

  }


  searchCat(id) {
    this.db.database.ref('categories').on('child_added', snap => {
      console.log(snap.child('sublevels').val());
    });
  }
}
