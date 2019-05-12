# ELBARATON

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.



## STEPS FOR COMPILER THIS PROJECT 

### 1
clone this repository from `https://github.com/SantiagoAlvarezA/EL-BARATON.git` or Download 

### 2
Run command `npm install`

### 3 Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.  The app will automatically reload if you change any of the source files.

### This project is alojated in firebase host

Available on the firebase host. Navegate to [EL Bataton](https://tiendaselbaraton.firebaseapp.com/#/) 


## JSON Schemas

### Categories schema
"Category":{
  "id": number;
  "name": string;
  "sublevels"?: [{
        "id": number;
        "name": string;
        "sublevels"?: Sublevel2[{
                "id": number;
                "name": string;
                "sublevels"?: Sublevel[{
                        "id": number;
                        "name": string;
                    }

                ];
            }
        ];
    }

  ];
}


### Products schema
"Product"  {
  "available": boolean;
  "id": string;
  "name": string;
  "price": string;
  "quantity": number;
  "sublevel_id": number;
  "url": string;
}

### Car schema
"Car": {
    "uid": string;
    "product_id": string;
    "name": string;
    "quantity": number;
    "url":string;
}





## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
