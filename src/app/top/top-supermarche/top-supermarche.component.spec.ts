import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSupermarcheComponent } from './top-supermarche.component';

describe('TopSupermarcheComponent', () => {
  let component: TopSupermarcheComponent;
  let fixture: ComponentFixture<TopSupermarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSupermarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSupermarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
