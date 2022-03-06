# NgxNavigationTrigger

[![NPM](https://img.shields.io/npm/v/ngx-navigation-trigger?label=NPM&color=blue)](https://www.npmjs.com/package/ngx-navigation-trigger "View this project on NPM.") [![NPM downloads](https://img.shields.io/npm/dt/ngx-navigation-trigger?label=NPM%20downloads)](https://www.npmjs.com/package/ngx-navigation-trigger "View this project on NPM.")

NgxNavigationTrigger allows you to know if the current page was trigged by either an `'imperative'`, `'backward'` or `'forward'` navigation.

## Installation
```sh
npm install ngx-navigation-trigger --save
```

## Usage
### Step 01: Import the `NgxNavigationTriggerModule` to your module.
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// Import NgxNavigationTriggerModule
import { NgxNavigationTriggerModule } from 'ngx-navigation-trigger';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxNavigationTriggerModule // Import NgxNavigationTriggerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
### Step 02: Use the `NavigationTriggerService` in your component, directive or service file. For example:
**app.component.ts**
```ts
import { Component, OnInit } from '@angular/core';
import { NavigationTriggerService } from 'ngx-navigation-trigger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private navigationTriggerService: NavigationTriggerService) { }

  ngOnInit(): void {
    this.navigationTriggerService.eventUrlChanged.subscribe((value) => {
      const currentPageNavigationTrigger = value;
      console.log({ currentPageNavigationTrigger });
    });
  }
}
```

## Documentation
### NavigationTriggerService class
```ts
class NavigationTriggerService {
    /**
     * Emit the `NavigationTrigger` of the the current page.
     */
    eventUrlChanged: Observable<NavigationTrigger>;
}
```

### NavigationTrigger enumeration
```ts
enum NavigationTrigger {
  IMPERATIVE = 'imperative',
  BACKWARD = 'backward',
  FORWARD = 'forward'
}
```

## Known issue:
- Does not support/work (to differenciate `'backward'` or `'forward'`) when user right-clicks on browser back- or forward button and then clicks on an item.
  - PS: Pull requests to fix it are welcome.

## License
MIT