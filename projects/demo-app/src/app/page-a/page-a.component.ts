import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-a',
  templateUrl: './page-a.component.html',
  styleUrls: ['./page-a.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageAComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
