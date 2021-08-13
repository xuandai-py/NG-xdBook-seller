import { Component } from '@angular/core';
import {User} from "./models/user.models";
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";
import {Role} from "./models/role.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-book-seller';

  currentUser: User = new User();

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  isAdmin(){
    return this.currentUser?.role === Role.ADMIN;
  }

  logOut(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
