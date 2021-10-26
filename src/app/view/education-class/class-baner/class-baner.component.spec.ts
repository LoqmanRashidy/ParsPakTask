import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassBanerComponent } from './class-baner.component';

describe('ClassBanerComponent', () => {
  let component: ClassBanerComponent;
  let fixture: ComponentFixture<ClassBanerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassBanerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassBanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
