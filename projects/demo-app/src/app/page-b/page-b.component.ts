import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-b',
  templateUrl: './page-b.component.html',
  styleUrls: ['./page-b.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageBComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
