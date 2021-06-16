import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCompoundComponent } from './new-compound.component';

describe('NewCompoundComponent', () => {
  let component: NewCompoundComponent;
  let fixture: ComponentFixture<NewCompoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCompoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
