import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'workshop-menu',
  templateUrl: './workshop-menu.component.html',
  styleUrls: ['./workshop-menu.component.scss']
})
export class WorkshopMenuComponent implements OnInit {

  @Input() categories!: any[] | null;
  @Input() section!: string | null;

  constructor() { }

  ngOnInit(): void { }
}
