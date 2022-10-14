import { Injectable, NgZone } from '@angular/core';
import { Categories } from 'src/app/models/categories.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable()
export class CategoriesService {

  constructor(private afs: AngularFirestore) { }

}
