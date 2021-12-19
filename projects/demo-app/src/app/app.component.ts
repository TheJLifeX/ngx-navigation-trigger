import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationTrigger, NavigationTriggerService } from 'ngx-navigation-trigger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentPageNavigationTrigger!: NavigationTrigger;
  currentPageUrl!: string;

  links: string[] = [
    '/page-a',
    '/page-b',
    '/page-c'
  ];

  constructor(
    private navigationTriggerService: NavigationTriggerService,
    private titleService: Title,
    private locationService: Location) { }

  ngOnInit(): void {

    this.navigationTriggerService.eventUrlChanged.subscribe(value => {
      this.currentPageNavigationTrigger = value;
    });

    this.locationService.onUrlChange((url) => {
      this.titleService.setTitle(`${url} - Demo app`);
      this.currentPageUrl = url;
    });
  }
}
