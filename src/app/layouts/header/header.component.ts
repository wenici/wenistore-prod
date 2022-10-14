import { Component, NgZone, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/database/user.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  

  userID = '';
  currentUserData?: User | undefined;
  userData!: User;
  constructor( private authService: AuthService ) { }

  ngOnInit() {}
  logout = () => this.authService.logout();

  isAuthenticated = () => this.authService.isLoggedin();
}