import { Component, Inject, OnInit } from '@angular/core';
import { Globals } from '../../shared/helper/globals';


@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(@Inject(Globals) public global: Globals) { }
  ngOnInit(): void {
    
  }

}
