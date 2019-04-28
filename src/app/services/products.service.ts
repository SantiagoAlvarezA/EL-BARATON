import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFireDatabase) { }


  getProducts() {
    return this.db.list('products').valueChanges();
  }

  getProductsBySublevelid(sublevel_id) {
    this.db.database.ref('products').orderByChild('sublevel_id').equalTo(sublevel_id).once('value', snap => {
      console.log(snap.val());
    });
  }
}
