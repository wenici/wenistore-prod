import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFunComponent } from './top-fun.component';

describe('TopFunComponent', () => {
  let component: TopFunComponent;
  let fixture: ComponentFixture<TopFunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopFunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
