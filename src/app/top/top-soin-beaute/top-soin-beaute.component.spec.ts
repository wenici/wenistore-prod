import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSoinBeauteComponent } from './top-soin-beaute.component';

describe('TopSoinBeauteComponent', () => {
  let component: TopSoinBeauteComponent;
  let fixture: ComponentFixture<TopSoinBeauteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSoinBeauteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSoinBeauteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
