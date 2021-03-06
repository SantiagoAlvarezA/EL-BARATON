import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { Product } from '../../interfaces/products.interface';
import { Car } from 'src/app/interfaces/car.interface';
import { AuthService } from '../../services/auth.service';
import { CarService } from '../../services/car.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 2000
  });




  sublevel_id: number;
  items = null;
  prod: Product = {};
  modalProd = false;
  quantity = 1;
  car: Car = {};
  uid = '';
  load = false;
  isAuthenticated = false;

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute, private authService: AuthService, private carService: CarService, private router: Router) {


    this.authService.isAuthenticated().subscribe(auth => {
      if (auth && auth.uid) {
        this.isAuthenticated = true;
        this.uid = auth.uid;
      } else {
        this.isAuthenticated = false;
      }
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.items = this.productsService.getProductsBySublevelid(parseInt(params.sublevel_id));
    });

  }

  ngOnInit() {


  }
  keyInput(value, maxValue) {



    try {
      let number = parseInt(value);
      if (number > maxValue) {
        this.quantity = maxValue;
        this.Toast.fire({
          type: 'warning',
          title: 'The quantity requested exceeds the available quantity in stock'
        });
      }

      if (Number.isNaN(number) || number <= 0) {
        this.quantity = 1;
        this.Toast.fire({
          type: 'error',
          title: 'you can only enter amounts greater than one'
        });
      }
    } catch (error) {
      this.quantity = 1;
    }



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

  closeModal() {
    this.modalProd = false;
  }

  addCar() {
    this.car = {};
    if (this.isAuthenticated) {
      this.car.product_id = this.prod.id;
      this.car.quantity = this.quantity;
      this.car.uid = this.uid;
      this.car.name = this.prod.name;
      this.car.url = this.prod.url;

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
        title: 'This product not available'
      });
    }
    this.prod = {};
    this.car = {};
    this.quantity = 1;
  }

}
