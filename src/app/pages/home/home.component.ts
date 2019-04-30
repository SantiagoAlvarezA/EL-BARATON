import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { AuthService } from '../../services/auth.service';
import { CarService } from '../../services/car.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Car } from '../../interfaces/car.interface';
import { Product } from '../../interfaces/products.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 2000
  });

  items: any = null;
  prod: Product = {};
  modalProd = false;
  quantity = 1;
  car: Car = {};
  uid = '';
  isAuthenticated = false;

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute, private authService: AuthService, private carService: CarService, private router: Router) {
    this.items = this.productsService.getProducts();
    this.authService.isAuthenticated().subscribe(auth => {
      if (auth && auth.uid) {
        this.isAuthenticated = true;
        this.uid = auth.uid;
      } else {
        this.isAuthenticated = false;
      }
    });


  }

  ngOnInit() {
  }

  search() {
  }



  showModalProd(item: Product) {

    if (this.isAuthenticated && item.available) {
      this.prod = item;
      this.quantity = 1;
      this.modalProd = !this.modalProd;
    } else {
      this.noAuth();
    }

  }

  quantityAdd() {
    if (this.quantity < this.prod.quantity) {
      this.quantity++;
    } else {
      this.quantity = this.prod.quantity
    }

  }
  quantitySubtract() {
    if (this.quantity > 0) {
      this.quantity--;
    } else {
      this.quantity = 0;
    }

  }
  closeModal() {
    this.modalProd = false;
  }

  addCar() {
    if (this.isAuthenticated) {
      this.car.product_id = this.prod.id;
      this.car.quantity = this.quantity;
      this.car.uid = this.uid;
      this.car.name = this.prod.name;

      this.carService.setCar(this.car);
      this.prod = {};
      this.quantity = 0;
      this.router.navigate(['/car']);
    } else {
      this.noAuth();

    }
  }

  noAuth() {
    if (!this.isAuthenticated) {
      this.Toast.fire({
        type: 'error',
        title: 'Unauthenticated user'
      });
    } else {
      this.Toast.fire({
        type: 'warning',
        title: 'Tis product not available'
      });
    }
    this.router.navigate(['/']);
  }
}
