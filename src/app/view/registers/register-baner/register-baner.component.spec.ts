import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBanerComponent } from './register-baner.component';

describe('RegisterBanerComponent', () => {
  let component: RegisterBanerComponent;
  let fixture: ComponentFixture<RegisterBanerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBanerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
