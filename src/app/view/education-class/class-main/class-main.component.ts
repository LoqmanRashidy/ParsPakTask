import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-class-main',
  templateUrl: './class-main.component.html',
  styleUrls: ['./class-main.component.scss']
})
export class ClassMainComponent implements OnInit {

  public id:number=0;
  constructor(public router: Router,
    public activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      // if( this.id  != undefined &&  this.id>0)
      // {
      //   this.getData();
      
      // }
    });

  }

}
