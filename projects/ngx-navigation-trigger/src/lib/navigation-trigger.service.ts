import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { NavigationTrigger } from './navigation-trigger';

/**
 * To goal here (in this branch) is to be able to handle right-click on back and forward button and then click on any previous navigation entity.
 * But this does not work currently.
 * Reasons:
 * - Browser creates navigation item with new id on popstate.
 */

/**
 * The `NavigationTriggerService` allows you to know if the current page was trigged by either an `'imperative'`, `'backward'` or `'forward'` navigation.
 */
@Injectable()
export class NavigationTriggerService {

  /**
   * Emit the `NavigationTrigger` of the the current page.
   */
  eventUrlChanged: Observable<NavigationTrigger>;

  private navigationHistory: NavigationItem[] = [];
  private currentPageNavigationItemIndex!: number;

  private navigationTriggerSubject: Subject<NavigationTrigger> = new Subject();
  private currentHighestNavigationId: number = 0;
  private previousNavigationItem!: NavigationItem;

  constructor(locationService: Location) {
    this.eventUrlChanged = this.navigationTriggerSubject.asObservable();

    locationService.subscribe(({ url, state, type }) => {
      if (type !== 'popstate') {
        return;
      }
      this.onEventPopState(url!, state);
    });

    locationService.onUrlChange((url, state: any) => this.onEventUrlChanged(url, state));
  }

  private onEventPopState(url: string, state: { navigationId: number }) {
    // Back or forward navigation
    const { navigationId } = state as { navigationId: number };
    let backward: boolean;
    const forwardOrBackwardItem: NavigationItem = {
      url: url!,
      navigationId
    };
    const index = this.navigationHistory.findIndex((item) => this.compareNavigationItem(item, forwardOrBackwardItem));
    console.log('navigationHistory\n', forwardOrBackwardItem, index, JSON.parse(JSON.stringify(this.navigationHistory)));
    if (index < this.currentPageNavigationItemIndex) {
      backward = true;
      this.currentPageNavigationItemIndex = index;


    } else if (index > this.currentPageNavigationItemIndex) {
      backward = false;
      this.currentPageNavigationItemIndex = index;
    }
    else {
      throw new Error("Should not happend");
    }
    this.navigationTriggerSubject.next(backward ? NavigationTrigger.BACKWARD : NavigationTrigger.FORWARD);
  }

  private onEventUrlChanged(url: string, state: { navigationId: number }): void {
    const { navigationId } = state as { navigationId: number };
    const currentNavigationItem: NavigationItem = {
      url,
      navigationId
    };
    // Imperative navigation
    if (typeof this.currentHighestNavigationId === 'undefined'
      || (this.currentHighestNavigationId < navigationId && url !== this.previousNavigationItem?.url)) {
      this.navigationHistory.push(currentNavigationItem);
      this.currentPageNavigationItemIndex = this.navigationHistory.length - 1;
      this.navigationTriggerSubject.next(NavigationTrigger.IMPERATIVE);
    }

    this.currentHighestNavigationId = typeof this.currentHighestNavigationId === 'undefined' ? navigationId : Math.max(this.currentHighestNavigationId, navigationId);

    this.previousNavigationItem = currentNavigationItem;
  }

  /**
   * Return `true` if `navigationItemA` and `navigationItemB` are equals.
   */
  private compareNavigationItem(navigationItemA: NavigationItem, navigationItemB: NavigationItem): boolean {
    return (navigationItemA.url === navigationItemB.url) && (navigationItemA.navigationId === navigationItemB.navigationId);
  }
}

interface NavigationItem {
  url: string;
  navigationId: number;
}
