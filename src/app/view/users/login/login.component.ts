import { NgForm, FormGroup, FormControlName } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxPermissionsService } from 'ngx-permissions';
import { Credentials } from '../../../core/models/interfaces/auth-types';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Resources } from '../../../shared/helper/resource';
import { User } from '../../../core/models/entity/users/user';
import { Globals } from '../../../shared/helper/globals';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {


  model: Credentials = { username: '', password: '', rememberMe: false, RecaptchaToken: '' };
  form: FormGroup;
  isLoginError: boolean;
  error = '';
  returnUrl: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(Globals) public global: Globals,
    private permissionsService: NgxPermissionsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    
    ) { }

  ngOnInit() {
    this.authService.logout(false);

  }

  onSubmit(form: FormGroup, model: Credentials): void {
    Object.keys(form.controls).forEach(field => {
      const control:any = form.get(field);
      control.markAsTouched({ onlySelf: false });
    });
    if (form.valid) {
      this.authService.login(model).subscribe((data: any) => {
        if (data) {
  
          this.toastr.success(Resources.successTitle, data.access_token);
     

          this.permissionsService.loadPermissions([this.global?.sessionUser?.Id.toString()]); //(user.UserRoles.map(x => x.Role.EnTitle));          
          this.global.sessionPerson = JSON.parse(localStorage.getItem("Person") as any);
          this.router.navigateByUrl('/classlist/1');

        
        }
        else {
          this.toastr.error(Resources.errorLogin, Resources.errorTitle);
        }
      },
        (err: HttpErrorResponse) => { this.isLoginError = true; }
      );
    }
    else {
      this.toastr.error(Resources.errorDataEntry, Resources.errorTitle);
    }
  }

  cancel()
  {
    this.model= ({ username: '', password: '', rememberMe: false, RecaptchaToken: '' } as Credentials);
  }
}
