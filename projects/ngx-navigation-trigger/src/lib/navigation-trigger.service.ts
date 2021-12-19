import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { NavigationTrigger } from './navigation-trigger';

/**
 * The `NavigationTriggerService` allows you to know if the current page was trigged by either an `'imperative'`, `'backward'` or `'forward'` navigation.
 */
@Injectable()
export class NavigationTriggerService {

  /**
   * Emit the `NavigationTrigger` of the the current page.
   */
  eventUrlChanged: Observable<NavigationTrigger>;

  private forwardNavigationHistory: NavigationItem[] = [];
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
    const { navigationId } = state;
    let backward: boolean;
    const mostRecentForwardNavigationItem = this.forwardNavigationHistory[0];
    const forwardOrBackwardItem: NavigationItem = {
      url: url!,
      navigationId
    };
    if (!mostRecentForwardNavigationItem || !this.compareNavigationItem(mostRecentForwardNavigationItem, forwardOrBackwardItem)) {
      backward = true;
      const currentNavigationItemBeforeBackorForwardNavigation = this.previousNavigationItem;
      this.forwardNavigationHistory.unshift(currentNavigationItemBeforeBackorForwardNavigation);
    }
    else {
      backward = false;
      this.forwardNavigationHistory.shift();
    }
    this.navigationTriggerSubject.next(backward ? NavigationTrigger.BACKWARD : NavigationTrigger.FORWARD);
  }

  private onEventUrlChanged(url: string, state: { navigationId: number }): void {
    const { navigationId } = state;

    const isImperativeNavigation =
      typeof this.currentHighestNavigationId === 'undefined'
      || (this.currentHighestNavigationId < navigationId && url !== this.previousNavigationItem?.url);

    if (isImperativeNavigation) {
      this.forwardNavigationHistory = [];
      this.navigationTriggerSubject.next(NavigationTrigger.IMPERATIVE);
    }

    this.currentHighestNavigationId = typeof this.currentHighestNavigationId === 'undefined' ? navigationId : Math.max(this.currentHighestNavigationId, navigationId);

    this.previousNavigationItem = {
      url,
      navigationId
    };
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
