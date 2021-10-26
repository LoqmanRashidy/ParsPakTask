import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';
import { RefreshTokenService } from './core/services/auth/refresh-token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BUGLOOSTESTTASK';
  private state$: Observable<object>;
  constructor(private refreshTokenService: RefreshTokenService,private router: Router) { }
  ngOnInit() {
   
    this.state$ =  this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      map(() => this.router.getCurrentNavigation().extras.state)
    )

  }
}
