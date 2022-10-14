import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/shared/services/database/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userID = '';
  currentUserData?: Observable<User | undefined>;
  userData: User;
  constructor(
    private userService: UserService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {}

}
