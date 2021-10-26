import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Globals } from '../../shared/helper/globals';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  navFixed: boolean = false;
  private scrollOffset: number = 70;
  
  @HostListener('window:scroll')
  
  onWindowScroll() {
    this.navFixed = (window.pageYOffset 
      || document.documentElement.scrollTop 
      || document.body.scrollTop || 0
    ) > this.scrollOffset;
  }
  
  constructor(@Inject(Globals) public global: Globals,
    public authService: AuthService,) { }

  ngOnInit(): void {
  }
  logout() {
    this.authService.logout(true);

  }
}
