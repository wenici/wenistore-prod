import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProductsService } from 'src/app/shared/services/products.service';
import {
  AngularFireStorage,
} from '@angular/fire/compat/storage';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  ID: string;
  isValidForm = false;
  imagesUrl: string[] = [];
  quantity: number = 1;
  isMyProduct: boolean = false;
  isInvalidForm = true;

  constructor(
    public router: Router,
    private auth: AngularFireAuth,
    public dbstore: AngularFirestore,
    private storage: AngularFireStorage,
    public productService: ProductsService,
    private formBuilder: FormBuilder,
  ) { }

  addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
    description: [''],
    price_solde: [''],
    fichetech: [''],
    couleur: [''],
    taille: [''],
    marque: [''],
    numero: [''],
  });



  ngOnInit(): void {}

  get name(): AbstractControl | null {
    return this.addProductForm.get('name');
  }
  get price(): AbstractControl | null {
    return this.addProductForm.get('price');
  }
  get price_solde(): AbstractControl | null {
    return this.addProductForm.get('price_solde');
  }
  get description(): AbstractControl | null {
    return this.addProductForm.get('description');
  }
  get fichetech(): AbstractControl | null {
    return this.addProductForm.get('fichetech');
  }
  get category(): AbstractControl | null {
    return this.addProductForm.get('category');
  }
  get marque(): AbstractControl | null {
    return this.addProductForm.get('marque');
  }
  get taille(): AbstractControl | null {
    return this.addProductForm.get('taille');
  }
  get couleur(): AbstractControl | null {
    return this.addProductForm.get('couleur');
  }
  get numero(): AbstractControl | null {
    return this.addProductForm.get('numero');
  }

  async onSubmit(): Promise<void> {
    if(this.addProductForm.valid) {
      this.auth.currentUser.then( user => {
        this.ID = user.uid
      })
      const product: Product = {
        userID: this.ID,
        id: this.dbstore.createId(),
        name: this.addProductForm.get('name')?.value,
        price: this.addProductForm.get('price')?.value,
        price_solde: this.addProductForm.get('price_solde')?.value,
        description: this.addProductForm.get('description')?.value,
        fichetech: this.addProductForm.get('fichetech')?.value,
        category: this.addProductForm.get('category')?.value,
        marque: this.addProductForm.get('marque')?.value,
        taille: this.addProductForm.get('taille')?.value,
        couleur: this.addProductForm.get('couleur')?.value,
        numero: this.addProductForm.get('numero')?.value,
        imageURL: this.imagesUrl,
        quantity: this.quantity,
        isMyProduct: this.isMyProduct,
        date: new Date()
      };
      try {
       this.productService.addProduct(product);
       this.addProductForm.reset();
       const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
      Toast.fire({
        icon: 'success',
        title: 'Produit enregistré avec succès',
      });
      } catch (error) {
        console.log(error);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'error',
          title: 'Erreur d\'enregistrement',
        });
      }
    }

  }
  async selectFiles(event: any): Promise<void> {
    if (event.target.files) {
      for (let i = 0; i < File.length; i++) {
        const file = event.target.files[i];
        const filePath = `images_wenistore/${Date.now()}_${file.name}`;
        const task = this.storage.upload(filePath, file, { contentType: '.png,.jpg,.jpeg'});
        const uploadTaskSnapshot = await task;
        const url = await uploadTaskSnapshot.ref.getDownloadURL();
        this.imagesUrl.push(url);
        this.imagesUrl.length >= 0
          ? (this.isInvalidForm = false)
          : (this.isInvalidForm = true);
      }
    }
  }
  removeSelectedImage(imageToRemove: string): void {
    const resteImages = this.imagesUrl.filter((image) => {
      return imageToRemove !== image;
    });
    this.storage.storage.refFromURL(imageToRemove).delete()
    this.imagesUrl = resteImages;
    this.imagesUrl.length > 0
      ? (this.isInvalidForm = false)
      : (this.isInvalidForm = true);
  }
}
