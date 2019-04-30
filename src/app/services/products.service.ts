import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../interfaces/products.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFireDatabase) {

  }


  getProducts() {
    return this.db.list('products').valueChanges();
  }

  async getProductsBySublevelid(sublevel_id) {
    var products: Array<any> = [];
    this.db.database.ref('products').orderByChild('sublevel_id').equalTo(sublevel_id).on('child_added', snap => {
      products.push(snap.val())
    });

    return await new Observable(observer => {
      setInterval(() => observer.next(products))
    });
  }


  getProduct(id) {

    var product: Array<any> = [];
    this.db.database.ref('products').orderByChild('id').equalTo(id).once('value', snap => snap)
      .then(snap => {
        product.push(snap.val());
      });
    return new Observable(observer => {
      setInterval(() => observer.next(product));
    });
  }


}
