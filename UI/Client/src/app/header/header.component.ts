import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoginButtonClicked: boolean = false;
  token!: string | null ;
  role: string = "User";
  name?: string;

  constructor(
    private router: Router,
    public utilityService: UtilityService,
    private authService: AuthService) { 
  }
  ngOnInit(): void {
    this.authService.getTokenChange().subscribe((token:string|null) =>{
      this.token = token;
      const decodedToken = this.authService.decodedToken(this.token);
      this.name = decodedToken.unique_name;
      this.role = decodedToken.role;
    })  }

  get isLoginPage() {
    return this.router.url ==='/login';
  }

  get isAddCarPage() {
    return this.router.url ==='/add-car';
  }
}
