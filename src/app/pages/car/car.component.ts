import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars = null;
  isAuthenticated = false;

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated().subscribe((auth) => {
      if (auth && auth.uid) {
        this.isAuthenticated = true;
        this.carService.getCar(auth.uid).then(cars => {
          this.cars = cars;
          console.log(cars,' front');
          
        });

      } else {
        this.router.navigate(['/login']);
        this.isAuthenticated = false;

      }
    });

  }

  ngOnInit() {


  }

}
