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

  links = [
    {
      name: 'Page A',
      url: '/page-a'
    },
    {
      name: 'Page B',
      url: '/page-b'
    },
    {
      name: 'Page C',
      url: '/page-c'
    }
  ];

  constructor(
    private navigationTriggerService: NavigationTriggerService,
    private titleService: Title,
    private locationService: Location
  ) { }

  ngOnInit(): void {

    this.navigationTriggerService.eventUrlChanged.subscribe(value => {
      this.currentPageNavigationTrigger = value;
    });

    this.locationService.onUrlChange((url) => {
      this.titleService.setTitle(`${url} - NgxNavigationTrigger`);
      this.currentPageUrl = url;
    });
  }
}
