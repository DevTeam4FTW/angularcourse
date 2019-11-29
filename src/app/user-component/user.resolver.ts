import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../core/user.service';
import { User } from '../core/user.model';

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(public userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Promise<User> {

     let user = new User();
    //user:User = new User();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        user=res;
        return resolve(user);
       
      }, err => {
        this.router.navigate(['/login']);
        return reject(err);
      })
    })
  }
}
