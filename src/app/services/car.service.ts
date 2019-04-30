import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Car } from '../interfaces/car.interface';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  car: Car = {};
  auth = false;
  uid = '';

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.authService.isAuthenticated().subscribe(auth => {
      if (auth && auth.uid) {
        this.auth = true;
        this.uid = auth.uid;
      } else {
        this.auth = false;
        this.uid = '';
      }
    })
  }

  getTotal() {
    var num: number;
    if (this.auth) {
      this.db.database.ref('car')
        .orderByChild('uid')
        .equalTo(this.uid)
        .once('value', snap => {
          snap.numChildren();
        }).then(snap => {
          num = snap.numChildren();

        });
    }
    return new Observable(observer => {
      setInterval(() => observer.next(num));
    });
  }

  setCar(car: Car) {
    this.db.database.ref('car/' + car.product_id).set(car);
  }

  async getCar(uid) {

    var car: Array<any> = [];

    this.db.database.ref('car')
      .orderByChild('uid')
      .equalTo(uid)
      .on('child_added', snap => {
        car.push(snap.val());
      });

    return await new Observable(observer => {
      setInterval(() => observer.next(car));
    });
  }



}
