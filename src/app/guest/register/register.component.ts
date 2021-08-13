import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { User } from 'src/app/models/user.models';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  faUser = faUserCircle;
  errorMessage: string = "";

  constructor(private authenticationService: AuthenticationService, private router: Router) { 
     
  }

  // (undefined - escape the control flow before the natural end of a function)
  ngOnInit(): void {
    if(this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/profile']);
      return;
    }
  }

  // ()
  register(){
    this.authenticationService.register(this.user).subscribe((data) => {
      this.router.navigate(['/login']);
    }, error => {
      if(error?.status === 409){
        this.errorMessage = 'Username already exist';
      } else {
        this.errorMessage = 'Unexpected error occurred. Error is: ' + error?.errorMessage;
        console.log(error);
        
      }
    })
  }







}
