import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilImgComponent } from './user-profil-img.component';

describe('UserProfilImgComponent', () => {
  let component: UserProfilImgComponent;
  let fixture: ComponentFixture<UserProfilImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfilImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfilImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
