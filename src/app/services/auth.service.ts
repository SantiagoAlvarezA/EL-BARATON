import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import Swal from 'sweetalert2';

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
  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {

  }

  public isAuthenticated() {
    return this.angularFireAuth.authState;
  }

  public signIn = (email='', password='') => {

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
    this.router.navigate(['']);
    this.Toast.fire({
      type: 'success',
      title: 'A cerrado sesión con exito'
    })
  }

  public register = (email, password, user) => {

    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        user.uid = response.user.uid;
        user.password = '';
        this.db.database.ref('users/' + user.uid).set(user);
        this.Toast.fire({
          type: 'success',
          title: 'El usuario se a registrado con exito'
        })
        this.router.navigate(['']);
      })
      .catch((error) => {
        this.Toast.fire({
          type: 'error',
          title: 'Se a presentado un error al momento de registrar el usuario'
        })
      });
  }

}
