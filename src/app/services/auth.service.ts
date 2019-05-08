import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import Swal from 'sweetalert2';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 2000
  });
  user;
  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {

  }

  public isAuthenticated() {
    return this.angularFireAuth.authState;
  }

  public signIn = (email = '', password = '') => {

    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.Toast.fire({
          type: 'success',
          title: 'Bienvenido'
        })
        this.router.navigate(['/']);

      })
      .catch((error) => {
        this.Toast.fire({
          type: 'error',
          title: 'Usuario y/o contraseña incorrectos'
        });
      });
  }

  public signOut() {
    this.angularFireAuth.auth.signOut();
    this.Toast.fire({
      type: 'success',
      title: 'A closed session with success'
    });
    this.router.navigate(['/']);
  }

  public register = (email, password, user) => {

    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        user.uid = response.user.uid;
        user.password = '';
        this.db.database.ref('users/' + user.uid).set(user);
        this.Toast.fire({
          type: 'success',
          title: 'The user has successfully registered'
        })
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.Toast.fire({
          type: 'error',
          title: 'An error was presented when registering the user'
        })
      });
  }


  getUser(uid: string = '') {
    return Observable.create(observer => {
      setInterval(() => {
        this.db.database.ref('users').orderByChild('uid').equalTo(uid).on('child_added', snap => {
          observer.next(snap.val().name);
        });
      });
    });

  }

}
