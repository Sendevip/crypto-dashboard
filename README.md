# CryptoDashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Features

- Fetches cryptocurrency data from the CoinGecko API
- Displays data in a table format with filtering, sorting, search, and pagination
- Visualizes data in a chart using Highcharts
- Tooltips display detailed information on hover
- Uses NgRx for state management
- Uses RxJS for data transportation and manipulation
- Responsive and user-friendly interface

## Setup

1. Clone the repository
2. Navigate to the project directory
3. Install the dependencies (npm install)
4. Start the development server (ng serve)
5. Open your browser and visit `http://localhost:4200` to see the application running.

## Dependencies

"@angular/animations": "^18.2.0",
"@angular/cdk": "^18.2.3",
"@angular/common": "^18.2.0",
"@angular/compiler": "^18.2.0",
"@angular/core": "^18.2.0",
"@angular/forms": "^18.2.0",
"@angular/material": "^18.2.4",
"@angular/platform-browser": "^18.2.0",
"@angular/platform-browser-dynamic": "^18.2.0",
"@angular/router": "^18.2.0",
"@ngrx/effects": "^18.0.2",
"@ngrx/store": "^18.0.2",
"@ngrx/store-devtools": "^18.0.2",
"highcharts-angular": "^4.0.1",
"rxjs": "~7.8.0",
"tslib": "^2.3.0",
"zone.js": "~0.14.10"

## DevDependencies

"@angular-devkit/build-angular": "^18.2.3",
"@angular/cli": "^18.2.3",
"@angular/compiler-cli": "^18.2.0",
"@types/jasmine": "~5.1.0",
"jasmine-core": "~5.2.0",
"karma": "~6.4.0",
"karma-chrome-launcher": "~3.2.0",
"karma-coverage": "~2.2.0",
"karma-jasmine": "~5.1.0",
"karma-jasmine-html-reporter": "~2.1.0",
"typescript": "~5.5.2"



## Project Structure Tree

├─ src
│  ├─ app
│  │  ├─ app.component.spec.ts
│  │  ├─ app.component.ts
│  │  ├─ app.config.ts
│  │  ├─ app.routes.ts
│  │  ├─ core
│  │  │  ├─ interceptors
│  │  │  │  ├─ error-handling-interceptor.interceptor.spec.ts
│  │  │  │  └─ error-handling-interceptor.interceptor.ts
│  │  │  ├─ models
│  │  │  │  └─ cryptocurrency.model.ts
│  │  │  └─ services
│  │  │     ├─ crypto-api
│  │  │     │  ├─ crypto-api.service.spec.ts
│  │  │     │  └─ crypto-api.service.ts
│  │  │     ├─ menus
│  │  │     │  ├─ menu.service.spec.ts
│  │  │     │  └─ menu.service.ts
│  │  │     ├─ snackbar
│  │  │     │  ├─ snackbar.service.spec.ts
│  │  │     │  └─ snackbar.service.ts
│  │  │     └─ theme
│  │  │        ├─ theme.service.spec.ts
│  │  │        └─ theme.service.ts
│  │  ├─ features
│  │  │  └─ dashboard
│  │  │     ├─ components
│  │  │     │  ├─ crypto-data-table
│  │  │     │  │  ├─ crypto-data-table.component.html
│  │  │     │  │  ├─ crypto-data-table.component.scss
│  │  │     │  │  ├─ crypto-data-table.component.spec.ts
│  │  │     │  │  └─ crypto-data-table.component.ts
│  │  │     │  └─ top-cryptos-chart
│  │  │     │     ├─ top-cryptos-chart.component.html
│  │  │     │     ├─ top-cryptos-chart.component.scss
│  │  │     │     ├─ top-cryptos-chart.component.spec.ts
│  │  │     │     └─ top-cryptos-chart.component.ts
│  │  │     ├─ dashboard.component.ts
│  │  │     ├─ dashboard.module.ts
│  │  │     ├─ dashboard.routes.ts
│  │  │     ├─ services
│  │  │     │  └─ crypto-table-config
│  │  │     │     ├─ crypto-table-config.service.spec.ts
│  │  │     │     └─ crypto-table-config.service.ts
│  │  │     └─ store
│  │  │        ├─ dashboard.actions.ts
│  │  │        ├─ dashboard.effects.ts
│  │  │        ├─ dashboard.reducer.ts
│  │  │        └─ dashboard.selectors.ts
│  │  ├─ shared
│  │  │  ├─ components
│  │  │  │  ├─ button
│  │  │  │  │  ├─ button.component.html
│  │  │  │  │  ├─ button.component.scss
│  │  │  │  │  ├─ button.component.spec.ts
│  │  │  │  │  └─ button.component.ts
│  │  │  │  ├─ data-table
│  │  │  │  │  ├─ data-table.component.html
│  │  │  │  │  ├─ data-table.component.scss
│  │  │  │  │  ├─ data-table.component.spec.ts
│  │  │  │  │  └─ data-table.component.ts
│  │  │  │  ├─ highcharts
│  │  │  │  │  ├─ highcharts.component.html
│  │  │  │  │  ├─ highcharts.component.scss
│  │  │  │  │  ├─ highcharts.component.spec.ts
│  │  │  │  │  └─ highcharts.component.ts
│  │  │  │  ├─ navbar
│  │  │  │  │  ├─ navbar.component.html
│  │  │  │  │  ├─ navbar.component.scss
│  │  │  │  │  ├─ navbar.component.spec.ts
│  │  │  │  │  └─ navbar.component.ts
│  │  │  │  ├─ not-found
│  │  │  │  │  ├─ not-found.component.html
│  │  │  │  │  ├─ not-found.component.scss
│  │  │  │  │  ├─ not-found.component.spec.ts
│  │  │  │  │  └─ not-found.component.ts
│  │  │  │  └─ theme-switch-button
│  │  │  │     ├─ theme-switch-button.component.scss
│  │  │  │     ├─ theme-switch-button.component.spec.ts
│  │  │  │     └─ theme-switch-button.component.ts
│  │  │  └─ models
│  │  │     └─ menu-item.model.ts
│  │  └─ store
│  │     ├─ app.reducer.ts
│  │     └─ app.state.ts
│  ├─ environments
│  │  ├─ environment.prod.ts
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  ├─ styles.scss
│  └─ theme
│     ├─ m3-theme.scss
│     └─ _variables.scss
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json