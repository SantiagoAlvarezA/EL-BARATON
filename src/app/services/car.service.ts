import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Car } from '../interfaces/car.interface';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  car: Car = {};
  auth = false;
  uid = '';
  Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 2000
  });

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

  getTotal(): Observable<any> {
    if (this.auth) {
      return Observable.create((num) => {
        setInterval(() => {
          this.db.database.ref('car')
            .orderByChild('uid')
            .equalTo(this.uid)
            .once('value', snap => {
              snap.numChildren();
            }).then(snap => {
              num.next(snap.numChildren());
            });
        })
      })
    }
  }

  setCar(car: Car) {
    this.db.database.ref('car/' + car.product_id).set(car);
  }

  getCar(uid) {

    var car: Array<any> = [];
    this.db.database.ref('car')
      .orderByChild('uid')
      .equalTo(uid)
      .on('child_added', snap => {
        car.push(snap.val());
      });

    return Observable.create((observer) => {
      setInterval(() => {
        observer.next(car);
      })
    })
  }

  setBuyCar(product_id: string) {
    this.db.object('car/' + product_id).remove();
    this.Toast.fire({
      type: 'success',
      title: 'Successfully completed buy'
    })
  }
}
