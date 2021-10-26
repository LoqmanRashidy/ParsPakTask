import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IndividualConfig } from 'ngx-toastr';
import { Subscription, Observer, Observable } from 'rxjs';
import { Person } from '../../core/models/entity/basesystem/Person';
import { Setting } from '../../core/models/entity/basesystem/Settings';
import { User } from '../../core/models/entity/users/user';

@Injectable()
export class Globals {
    constructor() {

    }
  
    /* set global variable for user data ad person data */
   user(_userAuth: any = null): User {
    if(_userAuth == null)
    {
      if (localStorage.getItem('UserData') == null)
        return Object.create(null);
      else
      {
        const user = JSON.parse(localStorage.getItem('UserData') as any);
        return user as User;
      }
    } 
    return _userAuth;
  
  }
  person(_userAuth: any = null): Person {
    if(_userAuth == null)
    {
      if (localStorage.getItem('Person') == null)
        return Object.create(null);
      else
      {
        const person = JSON.parse(localStorage.getItem('Person') as any);
        return person as Person;
      }
    } 
    return _userAuth;
  
  }

  
  sessionUser =JSON.parse(localStorage.getItem("UserData") as any);
  sessionPerson = JSON.parse(localStorage.getItem("Person") as any) ;
   setting: any = null;
  
}
