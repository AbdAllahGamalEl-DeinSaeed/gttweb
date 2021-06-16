import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCompoundComponent } from './update-compound.component';

describe('UpdateCompoundComponent', () => {
  let component: UpdateCompoundComponent;
  let fixture: ComponentFixture<UpdateCompoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCompoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCompoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
