import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars = null;
  isAuthenticated = false;
  uid: string = '';

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated().subscribe((auth) => {
      if (auth && auth.uid) {
        this.isAuthenticated = true;
        this.uid = auth.uid;
        this.cars = this.carService.getCar(this.uid);
      } else {
        this.router.navigate(['/login']);
        this.isAuthenticated = false;

      }
    });

  }

  ngOnInit() {


  }
  buy(product_id: string) {
    Swal.fire({
      title: 'you are sure to buy this product?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, buy it!'
    }).then((result) => {
      if (result.value) {
        this.carService.setBuyCar(product_id);
        this.cars = this.carService.getCar(this.uid);
      }
    })
  }

}
