import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-c',
  templateUrl: './page-c.component.html',
  styleUrls: ['./page-c.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageCComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
