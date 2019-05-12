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
  load: boolean = false;
  products = [];
  allProducts = [];
  producFilter = [];
  btnText = '';
  btnAvailables = '';
  lowToHight = true;
  avialables = true;

  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute, private authService: AuthService, private carService: CarService, private router: Router) {

    this.btnText = (this.lowToHight) ? 'HIGHT TO LOW' : 'LOW TO HIGHT';
    this.btnAvailables = (this.lowToHight) ? 'AVAILABLES' : 'UNAVAILABLES';
    this.loadProducts();
    this.authService.isAuthenticated().subscribe(auth => {
      if (auth && auth.uid) {
        this.isAuthenticated = true;
        this.uid = auth.uid;
      } else {
        this.isAuthenticated = false;
      }
    });


  }

  loadProducts() {
    this.items = this.productsService.getProducts().subscribe(products => {
      this.products = products;
      this.allProducts = products;
      this.producFilter = products;
      this.load = true;
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
        title: 'Tis product not available'
      });
    }
    this.router.navigate(['/']);
  }



  search(termino: string) {
    var productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.allProducts.forEach(prod => {
      const tituloLower = prod.name.toLocaleLowerCase();

      if (prod.name.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        productosFiltrado.push(prod);
      }
    });

    this.products = productosFiltrado;
  }

  productsAvaibles() {
    var productosFiltrado = [];
    this.allProducts = this.producFilter;
    this.allProducts.forEach(prod => {
      if (prod.available) {
        productosFiltrado.push(prod);
      }
    });

    this.products = productosFiltrado;
    this.allProducts = this.products;
  }

  productsUnavaibles() {
    var productosFiltrado = [];
    this.allProducts = this.producFilter;
    this.allProducts.forEach(prod => {
      if (!prod.available) {
        productosFiltrado.push(prod);
      }
    });

    this.products = productosFiltrado;
    this.allProducts = this.products;

  }

  available() {
    this.avialables ? this.productsAvaibles() : this.productsUnavaibles();
    this.avialables = !this.avialables;
    this.btnAvailables = (this.avialables) ? 'AVAILABLES' : 'UNAVAILABLES';
    this.lowToHight = true;
    this.btnText = (this.lowToHight) ? 'HIGHT TO LOW' : 'LOW TO HIGHT';

  }

  productsAll() {
    this.allProducts = this.producFilter;
    this.products = this.producFilter;
    this.avialables = true;
    this.btnAvailables = (this.avialables) ? 'AVAILABLES' : 'UNAVAILABLES';
  }


  // hightToLow() {
   
  // }
  // LowTohight() {
    
  // }

  // orderByPrice() {
  //   this.lowToHight ? this.hightToLow() : this.LowTohight();
  //   this.lowToHight = !this.lowToHight;
  //   this.btnText = (this.lowToHight) ? 'HIGHT TO LOW' : 'LOW TO HIGHT';
  // }


}
