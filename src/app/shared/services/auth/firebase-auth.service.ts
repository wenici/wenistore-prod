import { Resolve } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

type FirebaseUser = import('firebase/app').FirebaseApp;

@Injectable({
  providedIn: 'root',
})
export class FirebaseUserService
  implements Resolve<Observable<FirebaseUser>> {
  constructor(private afAuth: AngularFireAuth) {}

  resolve(): any {
    return this.afAuth.user.pipe(
      filter((user) => user !== undefined),
      take(1)
    );
  }
}